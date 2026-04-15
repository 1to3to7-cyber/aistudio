export const SYSTEM_BLUEPRINT = {
  SYSTEM: "The RWANDA TVET LOGBOOK is a full-stack, AI-powered digital logbook system designed specifically for students in Rwanda's Technical and Vocational Education and Training (TVET) sector. It combines a high-performance React frontend with a robust Node.js/Express backend and a secure Firebase/Firestore database layer. The system is built to be culturally immersive, professional, and highly scalable.",
  FEATURES: [
    "Multi-Language Support: Full localization in English, Kinyarwanda, and French.",
    "AI-Assisted Entry (Magic Fill): Uses Gemini AI to suggest professional tools, materials, and steps based on the student's trade and task.",
    "Real-Time Synchronization: Instant data updates across devices using Firestore onSnapshot.",
    "Admin Control Engine: A secure chamber for administrators to manage global branding (Logo, App Name, Primary Color, Developer Info) and view aggregated stats.",
    "Logbook Management: Create, edit, delete, and sort log entries by date or hours.",
    "PDF Export: Generate professional, formatted PDF reports of logbook entries with custom branding.",
    "Nature Mode: A toggleable visual experience featuring a high-quality slideshow of Rwanda's natural landscapes.",
    "Secure RBAC: Role-Based Access Control enforced via Firestore Security Rules, protecting student PII and admin configurations.",
    "REST API Backend: A Node.js/Express server providing endpoints for user profiles, log management, and system health."
  ],
  LOGIC: "Frontend: React 19 + Vite + Tailwind CSS. State management via React hooks and Firebase Auth listeners. Backend: Node.js + Express. Integrates with firebase-admin for privileged database operations and serves the Vite SPA. AI Integration: @google/genai (Gemini 1.5 Flash) for intelligent task suggestions and a platform-wide assistant.",
  DATA_FLOW: "Auth: Firebase Auth (Google Popup). Data: Frontend calls Backend API for writes/complex logic; uses direct Firestore listeners for real-time reads. Storage: Firebase Storage for user avatars and professional certificates.",
  INPUT_HANDLING: "Validation: Frontend uses Zod-like patterns for form validation; Backend uses Express middleware; Firestore Rules enforce strict schema and type checks (e.g., isValidUser, isValidEntry). Sanitization: All user-provided strings are trimmed and validated for length and format.",
  OUTPUT_FORMAT: "UI: Responsive, 'Bead-style' design with high-contrast typography and professional animations (motion). Reports: Auto-generated PDFs using jspdf and jspdf-autotable. API: JSON responses with standard HTTP status codes.",
  RULES: [
    "Security: Default deny in Firestore rules. Only owners can read/write their own data. Rate limiting on all API endpoints.",
    "Performance: Lazy initialization of SDKs. Optimized Firestore queries with indexing. CDN-backed asset delivery.",
    "Branding: Global styles driven by CSS variables controlled via the Admin Engine.",
    "Infrastructure: Containerized via Docker, deployed to Cloud Run with automated CI/CD pipelines.",
    "Reliability: Automated daily backups and centralized logging for real-time monitoring."
  ],
  INFRASTRUCTURE: {
    FRONTEND: "React 19, Vite, Tailwind CSS, Framer Motion (UI/UX)",
    BACKEND: "Node.js, Express, Morgan (Logging), Rate-Limit (Security)",
    DATABASE: "Firebase Firestore (NoSQL), Real-time sync, RBAC Rules",
    SERVERS: "Google Cloud Run (Serverless Containers)",
    NETWORK: "HTTPS/TLS 1.3, Global Load Balancing, VPC Service Controls",
    CLOUD_INFRA: "GCP (Google Cloud Platform), Cloud Storage, Cloud Logging",
    CICD: "GitHub Actions (Automated Build/Test/Deploy)",
    SECURITY: "Helmet.js, Rate-Limiting, Firestore Security Rules, JWT/Firebase Auth",
    CONTAINER: "Docker (Multi-stage builds), Artifact Registry",
    CDN: "Google Cloud CDN (Edge Caching for static assets)",
    LOGGING: "Morgan (Dev), Google Cloud Logging (Production)",
    BACKUP: "Automated Firestore Snapshots, Admin Backup Engine"
  },
  MASTER_PROMPT: `Build a professional Full-Stack TVET Logbook System named "RWANDA TVET LOGBOOK". 
STACK: React 19, Vite, Tailwind CSS, Node.js, Express, Firebase (Auth, Firestore, Storage, Admin SDK).
UI REQUIREMENTS: 
- Solid white background by default.
- Responsive "Bead-card" design with professional animations.
- Multi-language support (EN, RW, FR) via i18next.
- Nature Mode: Background slideshow of Rwanda landscapes.
- Admin Dashboard: Manage global branding (Logo, App Name, Primary Color).
BACKEND REQUIREMENTS:
- Express server on port 3000 handling /api/users, /api/logs, and /api/admin.
- Firebase Admin SDK initialization for secure data handling.
- Vite middleware integration for SPA serving.
DATABASE REQUIREMENTS:
- Firestore collections: users (UserProfile), users/{id}/entries (LogEntry), config (GlobalConfig).
- Strict Security Rules: RBAC, PII protection, schema validation.
AI REQUIREMENTS:
- Integrate Gemini 1.5 Flash for "Magic Fill" task suggestions and a floating AI Assistant panel.
- Prompt engineering focused on TVET trades (Automotive, Electricity, ICT, etc.).
EXPORT:
- Include PDF generation for logbooks.
- Ensure all "IMIGONGO" branding is replaced with "RWANDA TVET" professional branding.`
};
