import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config safely
const firebaseConfig = JSON.parse(
  readFileSync(path.join(__dirname, "firebase-applet-config.json"), "utf8")
);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy headers (Cloud Run/Nginx)
  app.set('trust proxy', 1);

  // Security & Middleware
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev')); // Logging

  // Rate Limiting (Security)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // The following setting tells express-rate-limit to trust the proxy configuration from Express
    validate: false, 
    keyGenerator: (req) => req.ip as string,
  });
  app.use("/api/", limiter);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage()
    });
  });

  // Backup Endpoint (Admin only logic should be here, but for now open)
  app.get("/api/admin/backup", async (req, res, next) => {
    try {
      const configDoc = await admin.firestore().collection('config').doc('branding').get();
      const usersSnapshot = await admin.firestore().collection('users').get();
      
      const backup = {
        branding: configDoc.data(),
        users_count: usersSnapshot.size,
        timestamp: new Date().toISOString()
      };
      
      res.json(backup);
    } catch (error) {
      next(error);
    }
  });

  // Error Handling Middleware (Centralized Logging & Security)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${err.message}`);
    console.error(err.stack);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: {
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        status: statusCode,
        timestamp: new Date().toISOString()
      }
    });
  });

  // User Profile API
  app.get("/api/users/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const userDoc = await admin.firestore().collection('users').doc(uid).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(userDoc.data());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users/:uid", async (req, res) => {
    const { uid } = req.params;
    const userData = req.body;
    try {
      await admin.firestore().collection('users').doc(uid).set(userData, { merge: true });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Log Entries API
  app.get("/api/logs/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const snapshot = await admin.firestore().collection('users').doc(uid).collection('entries').orderBy('date', 'desc').get();
      const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  app.post("/api/logs/:uid", async (req, res) => {
    const { uid } = req.params;
    const entryData = req.body;
    try {
      const docRef = await admin.firestore().collection('users').doc(uid).collection('entries').add({
        ...entryData,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: docRef.id, success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add log entry" });
    }
  });

  // Admin Stats API
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const usersSnapshot = await admin.firestore().collection('users').get();
      const totalUsers = usersSnapshot.size;
      // More complex stats could be calculated here
      res.json({ totalUsers });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
