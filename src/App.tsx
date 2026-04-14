/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  User, 
  Info, 
  Plus, 
  Clock, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Trash2,
  Settings,
  Menu,
  X,
  CheckCircle2,
  Award,
  Timer,
  Play,
  Square,
  MessageSquare,
  Send,
  Calendar as CalendarIcon,
  Hammer,
  Package,
  ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { cn } from './lib/utils';
import { useTranslation } from 'react-i18next';
import { Theme, Trade, LogEntry, UserProfile } from './types';
import { TRADES_WITH_ICONS, THEMES, BADGES, TRADE_KNOWLEDGE, DEVELOPER_INFO } from './constants';
import { getAISuggestions, askPlatformAssistant, suggestTask } from './services/geminiService';

import { 
  onAuthStateChanged, 
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy, 
  addDoc,
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, auth, storage, googleProvider, signInWithPopup, signOut } from './firebase';

// Connection Test
async function testConnection() {
  try {
    const { getDocFromServer } = await import('firebase/firestore');
    // Try to force a fresh fetch from server
    await getDocFromServer(doc(db, 'config', 'branding'));
    console.log("Firestore connected successfully.");
  } catch (error: any) {
    console.error("Firestore Connection Error:", error.message);
    if (error.message?.includes('the client is offline')) {
      console.warn("Firestore is in offline mode. It will sync when connection is restored.");
    }
  }
}
testConnection();

// --- Components ---

const AdminSignInModal = ({ isOpen, onClose, onLogin, customDevName }: { isOpen: boolean; onClose: () => void; onLogin: () => void; customDevName?: string }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

  const logFault = async (attemptedEmail: string, reason: string) => {
    try {
      await addDoc(collection(db, 'login_faults'), {
        email: attemptedEmail,
        reason,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        type: 'admin_login_fault'
      });
    } catch (e) {
      console.error("Failed to log fault:", e);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Strict verification for professional security
    const isValidEmail = email.trim() === '1to3to7@gmail.com';
    const isValidPassword = password === '*# 1to3to7*#@@';
    const isValidName = name.trim() === 'Bizimana Member Billionailler';

    if (isValidEmail && isValidPassword && isValidName) {
      onLogin();
      onClose();
    } else {
      const faultReason = !isValidEmail ? 'Invalid Email' : !isValidPassword ? 'Invalid Password' : 'Invalid Name';
      setError(`ACCESS DENIED: ${faultReason.toUpperCase()}`);
      await logFault(email, faultReason);
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email === '1to3to7@gmail.com') {
        setEmail(result.user.email);
        setName(result.user.displayName || '');
        setIsGoogleAuthenticated(true);
        setError('GOOGLE AUTH SUCCESS: Please enter your Security Password to finalize.');
      } else {
        const reason = 'Unauthorized Google Account';
        setError(`UNAUTHORIZED: ${reason.toUpperCase()}`);
        await logFault(result.user.email || 'unknown', reason);
        await signOut(auth);
      }
    } catch (err: any) {
      setError('Sign-in failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
            className="bead-card bg-white w-full max-w-md p-8 relative shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-4 shadow-lg">BMB</div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-primary">Admin Gateway</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Authorized Personnel Only</p>
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5" /></button>
            
            <div className="space-y-6">
              {!isGoogleAuthenticated && (
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-current py-4 rounded-xl font-black uppercase text-xs hover:bg-muted transition-all disabled:opacity-50"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                  {isLoading ? 'Authenticating...' : 'Professional Google Sign-In'}
                </button>
              )}

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-current/10"></div>
                <span className="flex-shrink mx-4 text-[10px] font-black uppercase opacity-40">
                  {isGoogleAuthenticated ? 'SECURITY FINALIZATION' : 'OR SECURE KEY'}
                </span>
                <div className="flex-grow border-t border-current/10"></div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Full Name (BMB)</label>
                  <input 
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    disabled={isGoogleAuthenticated}
                    className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary transition-all disabled:opacity-50"
                    placeholder="Bizimana Member Billionailler" required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Admin Email</label>
                  <input 
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    disabled={isGoogleAuthenticated}
                    className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary transition-all disabled:opacity-50"
                    placeholder="1to3to7@gmail.com" required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Security Password</label>
                  <input 
                    type="password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary transition-all"
                    placeholder="••••••••" required autoFocus={isGoogleAuthenticated}
                  />
                </div>
                {error && (
                  <motion.p 
                    initial={{ x: -10 }} animate={{ x: 0 }}
                    className={cn(
                      "text-[10px] font-black uppercase text-center py-2 rounded-lg border",
                      error.includes('SUCCESS') ? "text-green-600 bg-green-50 border-green-200" : "text-red-600 bg-red-50 border-red-200"
                    )}
                  >
                    {error}
                  </motion.p>
                )}
                <button type="submit" disabled={isLoading} className="bead-button bead-button-primary w-full py-5 text-lg shadow-xl disabled:opacity-50">
                  {isLoading ? 'Verifying...' : 'Verify Admin Key'}
                </button>
              </form>
            </div>
            <p className="mt-8 text-[10px] text-center font-bold opacity-40">
              System developed by <span className="text-primary">{customDevName || DEVELOPER_INFO.name}</span>
            </p>
            <CornerBeads />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdminControlEngine = ({ isOpen, onClose, user, setUser }: { isOpen: boolean; onClose: () => void; user: UserProfile; setUser: React.Dispatch<React.SetStateAction<UserProfile>> }) => {
  const [logo, setLogo] = useState(user.customLogo || '');
  const [devImg, setDevImg] = useState(user.customDevImage || '');
  const [devName, setDevName] = useState(user.customDevName || DEVELOPER_INFO.name);
  const [color, setColor] = useState(user.customPrimaryColor || '#9a3412');
  const [appName, setAppName] = useState(user.appName || 'RWANDA TVET');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'dev') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(prev => ({ ...prev, [type]: true }));
    try {
      const storageRef = ref(storage, `branding/${type}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      if (type === 'logo') setLogo(url);
      else setDevImg(url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check your connection.");
    } finally {
      setUploadProgress(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const configRef = doc(db, 'config', 'branding');
      await setDoc(configRef, {
        appName,
        customLogo: logo,
        customDevImage: devImg,
        customDevName: devName,
        customPrimaryColor: color
      });
      setUser(prev => ({
        ...prev,
        customLogo: logo,
        customDevImage: devImg,
        customDevName: devName,
        customPrimaryColor: color,
        appName: appName
      }));
      onClose();
    } catch (error) {
      console.error("Error saving branding:", error);
      alert("Failed to save branding. Check permissions.");
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm("Reset all visual branding to system defaults?")) {
      setLogo('');
      setDevImg('');
      setDevName(DEVELOPER_INFO.name);
      setColor('#9a3412');
      setAppName('RWANDA TVET');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="bead-card bg-white w-full max-w-md p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg"><Settings className="w-6 h-6" /></div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-primary leading-none">Control Engine</h2>
                <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Visual Identity Management</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Application Name</label>
                <input 
                  type="text" value={appName} onChange={e => setAppName(e.target.value)}
                  className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none text-sm"
                  placeholder="RWANDA TVET"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-60 tracking-widest flex justify-between">
                  <span>Custom Web Logo</span>
                  {uploadProgress['logo'] && <span className="text-primary animate-pulse">Uploading...</span>}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" value={logo} onChange={e => setLogo(e.target.value)}
                    className="flex-1 bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none text-sm"
                    placeholder="https://..."
                  />
                  <label className="bead-button bead-button-primary px-4 flex items-center justify-center cursor-pointer">
                    <Plus className="w-5 h-5" />
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'logo')} />
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Developer Name</label>
                <input 
                  type="text" value={devName} onChange={e => setDevName(e.target.value)}
                  className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none text-sm"
                  placeholder="Bizimana Member Billionailler"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-60 tracking-widest flex justify-between">
                  <span>Custom Dev Image</span>
                  {uploadProgress['dev'] && <span className="text-primary animate-pulse">Uploading...</span>}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" value={devImg} onChange={e => setDevImg(e.target.value)}
                    className="flex-1 bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none text-sm"
                    placeholder="https://..."
                  />
                  <label className="bead-button bead-button-primary px-4 flex items-center justify-center cursor-pointer">
                    <Plus className="w-5 h-5" />
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'dev')} />
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">Primary Brand Color</label>
                <div className="flex gap-4 items-center">
                  <input 
                    type="color" value={color} onChange={e => setColor(e.target.value)}
                    className="w-14 h-14 rounded-xl cursor-pointer border-2 border-current shadow-sm"
                  />
                  <input 
                    type="text" value={color} onChange={e => setColor(e.target.value)}
                    className="flex-1 bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none text-sm"
                  />
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                <button onClick={handleSave} className="bead-button bead-button-primary w-full py-4 shadow-lg">
                  Apply Branding Forever
                </button>
                <button onClick={resetToDefaults} className="w-full py-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                  Reset to System Defaults
                </button>
              </div>
            </div>
            <CornerBeads />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeveloperModal = ({ isOpen, onClose, customImage, customName }: { isOpen: boolean; onClose: () => void; customImage?: string; customName?: string }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bead-card bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-56 h-72 rounded-2xl border-4 border-current overflow-hidden bg-muted shadow-2xl shrink-0 relative group">
                <img 
                  src={customImage || "https://picsum.photos/seed/bizimana/400/600"} 
                  alt={customName || DEVELOPER_INFO.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-primary">{customName || DEVELOPER_INFO.name}</h2>
                  <p className="text-current font-black uppercase tracking-[0.3em] text-[10px] mt-3 opacity-60">Lead Developer & UI/UX Designer</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Date of Birth</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.dob}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Gender</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Nationality</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.nationality}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Marital Status</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.maritalStatus}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Phone</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Email</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.email}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Address</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.address}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Education</p>
                    <p className="font-bold text-lg leading-tight">{DEVELOPER_INFO.education}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="font-black uppercase opacity-40 text-[10px] tracking-widest">Field of Study</p>
                    <p className="font-bold text-lg">{DEVELOPER_INFO.field}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-black uppercase opacity-40 text-[10px]">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {DEVELOPER_INFO.skills.map(s => (
                      <span key={s} className="bg-muted px-2 py-1 rounded-lg font-bold text-xs border border-current/10">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <CornerBeads />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CornerBeads = () => (
  <>
    <div className="corner-bead top-2 left-2" />
    <div className="corner-bead top-2 right-2" />
    <div className="corner-bead bottom-2 left-2" />
    <div className="corner-bead bottom-2 right-2" />
  </>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 relative">
    <h2 className="text-3xl font-black uppercase tracking-tighter">{title}</h2>
    {subtitle && <p className="text-muted-foreground font-medium">{subtitle}</p>}
    <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
  </div>
);

// --- Main App ---

export default function App() {
  const { t, i18n } = useTranslation();
  const [view, setView] = useState<'home' | 'logbook' | 'progress' | 'profile' | 'about'>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isAdminSignInOpen, setIsAdminSignInOpen] = useState(false);
  const [isAdminSettingsOpen, setIsAdminSettingsOpen] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);

  const [user, setUser] = useState<UserProfile>({
    name: 'Student',
    trade: 'Automobile',
    theme: 'earth',
    totalHours: 0,
    badges: ['beginner'],
    school: '',
    level: 'A2',
    idNumber: '',
    phone: '',
    email: '',
    year: '2026',
    isAdmin: false
  });

  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFbUser(u);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // 2. Load Global Branding
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'branding'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUser(prev => ({
          ...prev,
          appName: data.appName,
          customLogo: data.customLogo,
          customDevImage: data.customDevImage,
          customDevName: data.customDevName,
          customPrimaryColor: data.customPrimaryColor
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. Load User Profile & Entries
  useEffect(() => {
    if (!fbUser) {
      // Reset to default student if not logged in
      setEntries([]);
      return;
    }

    // Profile listener
    const profileUnsub = onSnapshot(doc(db, 'users', fbUser.uid), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as UserProfile;
        setUser(prev => ({ ...prev, ...data }));
      } else {
        // Create initial profile if it doesn't exist
        const initialProfile: UserProfile = {
          name: fbUser.displayName || 'Student',
          email: fbUser.email || '',
          trade: 'Automobile',
          theme: 'earth',
          totalHours: 0,
          badges: ['beginner'],
          school: '',
          level: 'A2',
          idNumber: '',
          phone: '',
          year: '2026',
          isAdmin: fbUser.email === '1to3to7@gmail.com'
        };
        setDoc(doc(db, 'users', fbUser.uid), initialProfile);
      }
    });

    // Entries listener
    const entriesQuery = query(
      collection(db, 'users', fbUser.uid, 'entries'),
      orderBy('date', 'desc')
    );
    const entriesUnsub = onSnapshot(entriesQuery, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as LogEntry));
      setEntries(docs);
    });

    return () => {
      profileUnsub();
      entriesUnsub();
    };
  }, [fbUser]);

  // Apply custom primary color
  useEffect(() => {
    if (user.customPrimaryColor) {
      document.documentElement.style.setProperty('--primary', user.customPrimaryColor);
    } else {
      document.documentElement.style.removeProperty('--primary');
    }
  }, [user.customPrimaryColor]);

  // Handle Auto Theme
  useEffect(() => {
    if (user.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        const isDark = e.matches;
        // Map auto to specific themes for now
        const targetTheme = isDark ? 'agaseke' : 'earth';
        document.body.className = cn("min-h-screen imigongo-pattern pb-24", `theme-${targetTheme}`);
      };
      updateTheme(mediaQuery);
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      document.body.className = cn("min-h-screen imigongo-pattern pb-24", `theme-${user.theme}`);
    }
  }, [user.theme]);

  // Sync Profile Changes (Theme, Trade, etc.)
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!fbUser) return;
    try {
      await setDoc(doc(db, 'users', fbUser.uid), { ...user, ...updates }, { merge: true });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Entry Handling
  const addEntry = async (entry: Omit<LogEntry, 'id'>) => {
    if (!fbUser) {
      alert("Please sign in to save your entries.");
      return;
    }
    try {
      await addDoc(collection(db, 'users', fbUser.uid, 'entries'), entry);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!fbUser) return;
    try {
      await deleteDoc(doc(db, 'users', fbUser.uid, 'entries', entryId));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setElapsedTime(Date.now() - (startTime || Date.now()));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, startTime]);

  const toggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsTimerRunning(true);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Badge Logic
  useEffect(() => {
    const total = entries.reduce((acc, curr) => acc + curr.hours, 0);
    const earnedBadges = BADGES.filter(b => total >= b.minHours).map(b => b.id);
    if (total !== user.totalHours || JSON.stringify(earnedBadges) !== JSON.stringify(user.badges)) {
      updateProfile({ totalHours: total, badges: earnedBadges });
    }
  }, [entries]);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF() as any;
    
    // Header
    doc.setFillColor(154, 52, 18); // Primary color
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("RWANDA TVET LOGBOOK FORM", 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text("Building Skills, Skilled Hands, Recording Progress. Rwandan Pride.", 105, 30, { align: 'center' });
    
    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Student: ${user.name}`, 14, 50);
    doc.setFontSize(10);
    doc.text(`Trade: ${user.trade}`, 14, 58);
    doc.text(`School: ${user.school || 'N/A'}`, 14, 64);
    doc.text(`Level: ${user.level || 'N/A'} | Year: ${user.year || 'N/A'}`, 14, 70);
    doc.text(`ID: ${user.idNumber || 'N/A'}`, 14, 76);
    doc.text(`Total Hours: ${user.totalHours.toFixed(1)}h`, 160, 50);

    const tableData = entries.map(e => [
      e.date,
      e.task,
      e.hours,
      `${e.tools.join(', ')}\n\nMaterials:\n${e.materials?.join(', ') || 'N/A'}`,
      e.steps.join('\n')
    ]);

    autoTable(doc, {
      startY: 85,
      head: [['Date', 'Task', 'Hours', 'Tools', 'Steps']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [154, 52, 18] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        4: { cellWidth: 60 }
      }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Generated by ${user.appName || 'RWANDA TVET LOGBOOK FORM'} - Developer: ${user.customDevName || DEVELOPER_INFO.name}`, 105, 285, { align: 'center' });
    }

    doc.save(`TVET_Logbook_${user.name}.pdf`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-current px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-sm overflow-hidden">
            <img 
              src={user.customLogo || "https://picsum.photos/seed/tvetlogo/100/100"} 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-lg leading-none uppercase tracking-tighter">{user.appName || "RWANDA TVET"}</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Logbook Form</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {user.isAdmin ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setIsAdminSettingsOpen(true)}
                className="bead-button bead-button-primary py-1.5 px-2 sm:px-3 text-[9px] sm:text-[10px] flex items-center gap-1 sm:gap-2"
              >
                <Settings className="w-3 h-3" /> <span className="hidden xs:inline">ADMIN</span>
              </button>
              <button 
                onClick={() => signOut(auth)}
                className="bead-button bg-red-500 text-white py-1.5 px-2 sm:px-3 text-[9px] sm:text-[10px] border-2 border-current"
                title="Logout Admin"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAdminSignInOpen(true)}
              className="bead-button bg-muted text-current py-1.5 px-2 sm:px-3 text-[9px] sm:text-[10px] border-2 border-current hover:bg-primary hover:text-white transition-all whitespace-nowrap"
            >
              <span className="hidden xs:inline">BIZIMANA FILS</span> ADMIN
            </button>
          )}
          <div className="bg-secondary/30 px-2 sm:px-3 py-1 rounded-full border border-current flex items-center gap-1 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 h-4" />
            <span className="font-mono font-bold text-xs sm:text-sm">{user.totalHours.toFixed(1)}h</span>
          </div>
          <button 
            onClick={() => setIsDevModalOpen(true)}
            className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-muted hover:scale-110 transition-transform shadow-md"
            title="Developer Information"
          >
            <img 
              src={user.customDevImage || "https://picsum.photos/seed/bizimana/100/100"} 
              alt="Developer" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
          <button 
            onClick={() => setView('profile')}
            className="w-10 h-10 rounded-full border-2 border-current overflow-hidden bg-muted hover:scale-110 transition-transform"
          >
            {user.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-6 h-6 m-auto mt-1" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bead-card p-8 relative overflow-hidden bg-primary text-white">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg overflow-hidden">
                      <img 
                        src={user.customLogo || "https://picsum.photos/seed/tvetlogo/200/200"} 
                        alt="Logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{user.appName || "RWANDA TVET"}</h2>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Logbook Form</p>
                    </div>
                  </div>
                  <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter">Murakaza neza!</h3>
                  <p className="text-lg opacity-90 mb-6 font-medium">Welcome back, {user.name}. Ready to log your progress today?</p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setView('logbook')}
                      className="bead-button bead-button-primary flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" /> New Entry
                    </button>
                    <button 
                      onClick={exportPDF}
                      className="bead-button bead-button-secondary flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" /> Export PDF
                    </button>
                    <button 
                      onClick={() => setView('about')}
                      className="bead-button bg-white text-primary flex items-center gap-2"
                    >
                      <BookOpen className="w-5 h-5" /> Research Courses
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                  <Award className="w-full h-full" />
                </div>
                <CornerBeads />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bead-card p-6 relative">
                  <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5" /> Session Timer
                  </h3>
                  <div className="text-center py-4">
                    <div className="text-5xl font-mono font-black mb-6 tracking-tighter">
                      {formatTime(elapsedTime)}
                    </div>
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={toggleTimer}
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md",
                          isTimerRunning ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        )}
                      >
                        {isTimerRunning ? <Square className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </button>
                      <button 
                        onClick={resetTimer}
                        className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-current shadow-md"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <CornerBeads />
                </div>

                <div className="bead-card p-6 relative">
                  <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" /> Current Status
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-secondary/20 border-4 border-secondary flex items-center justify-center text-4xl shadow-inner">
                      {BADGES.find(b => b.id === user.badges[user.badges.length - 1])?.icon || '🌱'}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tight">
                        {BADGES.find(b => b.id === user.badges[user.badges.length - 1])?.name || 'Beginner'}
                      </h4>
                      <p className="text-muted-foreground font-medium">
                        {user.totalHours.toFixed(1)} / {BADGES[user.badges.length]?.minHours || 'Max'} hours to next level
                      </p>
                      <div className="w-full bg-muted h-3 rounded-full mt-2 overflow-hidden border border-current">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${Math.min(100, (user.totalHours / (BADGES[user.badges.length]?.minHours || user.totalHours)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <CornerBeads />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-black uppercase flex items-center gap-2 px-2">
                  <BookOpen className="w-5 h-5" /> Recent Entries
                </h3>
                {entries.slice(0, 3).map(entry => (
                  <div key={entry.id} className="bead-card p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted border-2 border-current flex flex-col items-center justify-center font-black leading-tight">
                        <span className="text-xs opacity-60">{entry.date.split('-')[1]}</span>
                        <span>{entry.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{entry.task}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{entry.hours} hours logged</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                {entries.length === 0 && (
                  <div className="text-center py-12 bg-muted/50 rounded-2xl border-2 border-dashed border-current/20">
                    <p className="font-bold text-muted-foreground">No entries yet. Start your journey today!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'logbook' && (
            <motion.div
              key="logbook"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <SectionHeader title="Daily Logbook" subtitle="Document your practical training sessions" />
              
              <LogForm 
                trade={user.trade} 
                onSubmit={(entry) => {
                  addEntry(entry);
                  setView('home');
                }} 
                initialHours={parseFloat((elapsedTime / (1000 * 60 * 60)).toFixed(1))}
              />

              <div className="space-y-4">
                <h3 className="font-black uppercase px-2">All Entries ({entries.length})</h3>
                <div className="grid gap-4">
                  {entries.map(entry => (
                    <div key={entry.id} className="bead-card p-6 relative">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest bg-muted px-2 py-1 rounded border border-current mb-2 inline-block">
                            {entry.date}
                          </span>
                          <h4 className="text-xl font-black">{entry.task}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black">{entry.hours}</span>
                          <span className="text-xs font-bold uppercase block opacity-60">Hours</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-black uppercase opacity-60 mb-1">Tools Used</p>
                          <div className="flex flex-wrap gap-1">
                            {entry.tools.map((t, i) => (
                              <span key={i} className="text-xs font-bold bg-secondary/20 px-2 py-0.5 rounded border border-secondary/50">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase opacity-60 mb-1">Key Steps</p>
                          <ul className="text-xs font-medium list-disc list-inside space-y-0.5">
                            {entry.steps.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteEntry(entry.id)}
                        className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <CornerBeads />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <SectionHeader title="Your Progress" subtitle="Celebrate your growth and achievements" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bead-card p-6 text-center">
                  <h4 className="text-xs font-black uppercase opacity-60 mb-2">Total Hours</h4>
                  <p className="text-5xl font-black tracking-tighter">{user.totalHours.toFixed(1)}</p>
                  <CornerBeads />
                </div>
                <div className="bead-card p-6 text-center">
                  <h4 className="text-xs font-black uppercase opacity-60 mb-2">Total Entries</h4>
                  <p className="text-5xl font-black tracking-tighter">{entries.length}</p>
                  <CornerBeads />
                </div>
                <div className="bead-card p-6 text-center">
                  <h4 className="text-xs font-black uppercase opacity-60 mb-2">Badges Earned</h4>
                  <p className="text-5xl font-black tracking-tighter">{user.badges.length}</p>
                  <CornerBeads />
                </div>
              </div>

              <div className="bead-card p-8">
                <h3 className="font-black uppercase mb-8 text-center">Achievement Path</h3>
                <div className="relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2" />
                  <div className="relative flex justify-between items-center">
                    {BADGES.map((badge, idx) => {
                      const isEarned = user.totalHours >= badge.minHours;
                      return (
                        <div key={badge.id} className="flex flex-col items-center gap-2 relative z-10">
                          <div className={cn(
                            "w-12 h-12 rounded-full border-2 border-current flex items-center justify-center text-xl transition-all",
                            isEarned ? "bg-secondary shadow-lg scale-110" : "bg-muted opacity-40"
                          )}>
                            {badge.icon}
                          </div>
                          <span className={cn("text-[10px] font-black uppercase tracking-tighter", isEarned ? "opacity-100" : "opacity-40")}>
                            {badge.name}
                          </span>
                          <span className="text-[8px] font-bold opacity-40">{badge.minHours}h</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bead-card p-8">
                <h3 className="font-black uppercase mb-6">Activity Overview</h3>
                <div className="h-48 flex items-end gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const day = new Date();
                    day.setDate(day.getDate() - (6 - i));
                    const dateStr = day.toISOString().split('T')[0];
                    const dayEntries = entries.filter(e => e.date === dateStr);
                    const totalHours = dayEntries.reduce((acc, curr) => acc + curr.hours, 0);
                    const height = Math.min(100, (totalHours / 8) * 100);
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="relative w-full flex-1 flex items-end">
                          <div 
                            className="w-full bg-primary rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                            style={{ height: `${height}%` }}
                          />
                          {totalHours > 0 && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-current text-white text-[10px] px-1.5 py-0.5 rounded font-black opacity-0 group-hover:opacity-100 transition-opacity">
                              {totalHours}h
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-black uppercase opacity-40">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <SectionHeader title={t('profile')} subtitle="Customize your experience" />
              
              <div className="bead-card p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-current overflow-hidden bg-muted shadow-xl">
                    {user.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-20 h-20 m-auto mt-4 opacity-20" />}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Plus className="w-6 h-6" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setUser(prev => ({ ...prev, avatar: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase opacity-40">Full Name</label>
                      <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-black uppercase tracking-tighter bg-transparent border-b-2 border-transparent hover:border-current focus:border-primary focus:outline-none w-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase opacity-40">{t('school')}</label>
                      <input 
                        type="text" 
                        value={user.school}
                        onChange={(e) => setUser(prev => ({ ...prev, school: e.target.value }))}
                        className="text-lg font-bold bg-transparent border-b-2 border-transparent hover:border-current focus:border-primary focus:outline-none w-full"
                        placeholder="Enter School Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase opacity-40">{t('id_number')}</label>
                      <input 
                        type="text" 
                        value={user.idNumber}
                        onChange={(e) => setUser(prev => ({ ...prev, idNumber: e.target.value }))}
                        className="text-sm font-bold bg-transparent border-b-2 border-transparent hover:border-current focus:border-primary focus:outline-none w-full"
                        placeholder="National ID"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase opacity-40">{t('level')} & {t('year')}</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={user.level}
                          onChange={(e) => setUser(prev => ({ ...prev, level: e.target.value }))}
                          className="text-sm font-bold bg-transparent border-b-2 border-transparent hover:border-current focus:border-primary focus:outline-none w-20"
                        />
                        <input 
                          type="text" 
                          value={user.year}
                          onChange={(e) => setUser(prev => ({ ...prev, year: e.target.value }))}
                          className="text-sm font-bold bg-transparent border-b-2 border-transparent hover:border-current focus:border-primary focus:outline-none w-20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    {user.badges.map(b => (
                      <span key={b} className="bg-secondary/30 border border-current px-3 py-1 rounded-full text-xs font-black uppercase">
                        {BADGES.find(badge => badge.id === b)?.icon} {BADGES.find(badge => badge.id === b)?.name}
                      </span>
                    ))}
                  </div>
                </div>
                <CornerBeads />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-black uppercase px-2 flex items-center justify-between">
                    {t('trade')}
                    <span className="text-[10px] opacity-40">Choose your specialty</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRADES_WITH_ICONS.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setUser(prev => ({ ...prev, trade: t.id }))}
                        className={cn(
                          "bead-card p-4 text-left font-bold transition-all flex items-center gap-3 group",
                          user.trade === t.id ? "bg-primary text-white border-primary shadow-lg" : "hover:bg-muted"
                        )}
                      >
                        <span className="text-2xl group-hover:scale-125 transition-transform">{t.icon}</span>
                        <span className="text-xs uppercase tracking-tight">{t.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                  <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-black uppercase px-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> User Settings
                    </h3>
                    <div className="bead-card p-6 space-y-6">
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Language / Ururimi
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'en', label: 'English' },
                            { id: 'rw', label: 'Kinyarwanda' },
                            { id: 'fr', label: 'Français' }
                          ].map(lang => (
                            <button
                              key={lang.id}
                              onClick={() => i18n.changeLanguage(lang.id)}
                              className={cn(
                                "bead-button text-[10px] py-2",
                                i18n.language === lang.id ? "bead-button-primary" : "bg-muted text-current"
                              )}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
                          <Settings className="w-3 h-3" /> Visual Theme
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {THEMES.map(t => (
                            <button 
                              key={t.id}
                              onClick={() => updateProfile({ theme: t.id })}
                              className={cn(
                                "bead-card p-4 flex flex-col items-center gap-2 transition-all",
                                user.theme === t.id ? "ring-4 ring-primary ring-offset-2" : "hover:scale-105"
                              )}
                            >
                              <div className={cn("w-12 h-12 rounded-full border-2 border-black", t.colors)} />
                              <span className="text-xs font-black uppercase">{t.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black uppercase px-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Account
                    </h3>
                    <div className="bead-card p-6">
                      {fbUser ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold">{fbUser.displayName}</p>
                            <p className="text-xs opacity-60">{fbUser.email}</p>
                          </div>
                          <button 
                            onClick={() => signOut(auth)}
                            className="bead-button bg-muted text-red-500 py-2 px-4 text-xs font-black uppercase"
                          >
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => signInWithPopup(auth, googleProvider)}
                          className="bead-button bead-button-primary w-full py-4 flex items-center justify-center gap-2"
                        >
                          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                          Sign In with Google
                        </button>
                      )}
                    </div>
                  </div>

                  {user.isAdmin && (
                    <div className="bead-card p-6 bg-primary/5 border-dashed border-2 border-primary/20">
                      <div className="flex items-center gap-2 mb-4 text-primary">
                        <Settings className="w-5 h-5 animate-spin-slow" />
                        <h4 className="font-black uppercase text-sm tracking-tighter">Admin Control Engine</h4>
                      </div>
                      <p className="text-[10px] font-bold opacity-60 mb-4 uppercase tracking-widest leading-relaxed">
                        Authorized access detected. You can now override system-wide branding, logos, and identification.
                      </p>
                      <button 
                        onClick={() => setIsAdminSettingsOpen(true)}
                        className="bead-button bead-button-primary w-full py-4 text-xs shadow-lg"
                      >
                        Launch Control Engine
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <SectionHeader title="About RWANDA TVET" subtitle="Skilled Hands, Rwandan Heart" />
              
              <div className="bead-card p-8 space-y-6 relative">
                <p className="text-lg font-medium leading-relaxed">
                  The <span className="font-black uppercase text-primary">Imigongo TVET Logbook</span> is a digital platform designed to empower Rwandan vocational students. 
                  By blending traditional heritage with modern technology, we celebrate the craftsmanship that builds our nation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-black uppercase text-sm opacity-60">Cultural Identity</h4>
                    <p className="text-sm font-medium">Our interface is inspired by Imigongo geometric patterns and traditional jewelry, making digital documentation feel like a handcrafted art.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black uppercase text-sm opacity-60">AI Assistance</h4>
                    <p className="text-sm font-medium">Powered by Gemini AI, the logbook helps you remember tools and steps for any task, ensuring your records are professional and complete.</p>
                  </div>
                </div>

                <div className="pt-8 border-t-2 border-current">
                  <h4 className="font-black uppercase mb-4">Developer</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-black">BF</div>
                    <div>
                      <p className="font-black uppercase text-xl">Bizimana Fils</p>
                      <p className="text-sm font-bold opacity-60">Rwanda • 2026</p>
                    </div>
                  </div>
                </div>
                <CornerBeads />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-current px-2 py-3 z-50">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
          <button 
            onClick={() => setIsDevModalOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:bg-primary/10 group"
          >
            <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">BMB</div>
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100">_BMB_DEV</span>
          </button>
          <NavButton active={view === 'home'} onClick={() => setView('home')} icon={<Home />} label={t('home')} />
          <NavButton active={view === 'logbook'} onClick={() => setView('logbook')} icon={<BookOpen />} label={t('logbook')} />
          <NavButton active={view === 'progress'} onClick={() => setView('progress')} icon={<BarChart3 />} label={t('stats')} />
          <NavButton active={view === 'profile'} onClick={() => setView('profile')} icon={<User />} label={t('profile')} />
          <NavButton active={view === 'about'} onClick={() => setView('about')} icon={<Info />} label={t('about')} />
        </div>
      </nav>

      <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} customImage={user.customDevImage} customName={user.customDevName} />
      <AdminSignInModal isOpen={isAdminSignInOpen} onClose={() => setIsAdminSignInOpen(false)} onLogin={() => setUser(prev => ({ ...prev, isAdmin: true }))} customDevName={user.customDevName} />
      <AdminControlEngine isOpen={isAdminSettingsOpen} onClose={() => setIsAdminSettingsOpen(false)} user={user} setUser={setUser} />

      {/* AI Assistant Floating Button */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 border-2 border-white"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        userContext={{ 
          name: user.name, 
          trade: user.trade, 
          totalHours: user.totalHours,
          school: user.school,
          level: user.level,
          year: user.year
        }}
      />
    </div>
  );
}

function AIAssistant({ isOpen, onClose, userContext }: { isOpen: boolean; onClose: () => void; userContext: any }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: t('assistant_greeting') }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askPlatformAssistant(userMsg, userContext);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div className="bead-card w-full max-w-md bg-white overflow-hidden flex flex-col max-h-[80vh]">
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-black uppercase tracking-tighter">TVET Assistant</h3>
              </div>
              <button onClick={onClose} className="hover:rotate-90 transition-transform"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-medium">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-2xl max-w-[85%] text-sm",
                  m.role === 'user' ? "bg-muted ml-auto rounded-tr-none" : "bg-secondary/20 mr-auto rounded-tl-none border border-secondary/50"
                )}>
                  {m.text}
                </div>
              ))}
              {isLoading && <div className="text-xs font-black uppercase animate-pulse text-primary">Assistant is thinking...</div>}
            </div>

            <div className="p-4 border-t-2 border-current flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ask_placeholder')}
                className="flex-1 bg-muted border-2 border-current rounded-xl px-4 py-2 font-bold focus:outline-none"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <CornerBeads />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all px-4 py-1 rounded-2xl",
        active ? "text-primary scale-110" : "text-muted-foreground opacity-60 hover:opacity-100"
      )}
    >
      <div className={cn("w-6 h-6 transition-transform", active && "scale-110")}>{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
      {active && <motion.div layoutId="nav-active" className="w-1 h-1 bg-primary rounded-full" />}
    </button>
  );
}

function LogForm({ trade, onSubmit, initialHours }: { trade: Trade; onSubmit: (entry: LogEntry) => void; initialHours: number }) {
  const { t } = useTranslation();
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState(initialHours || 0);
  const [tools, setTools] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiHelp = async () => {
    if (!task) return;
    setIsAiLoading(true);
    const suggestions = await getAISuggestions(trade, task);
    if (suggestions) {
      setTools(suggestions.tools || []);
      setMaterials(suggestions.materials || []);
      setSteps(suggestions.steps || []);
    } else {
      // Fallback
      const knowledge = TRADE_KNOWLEDGE[trade];
      setTools(knowledge.tools);
      setSteps(knowledge.steps);
      setMaterials(['Standard workshop materials']);
    }
    setIsAiLoading(false);
  };

  const handleSuggestTask = async () => {
    setIsAiLoading(true);
    const suggested = await suggestTask(trade);
    if (suggested) {
      setTask(suggested);
    }
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || hours <= 0) return;
    
    onSubmit({
      id: Date.now().toString(),
      date,
      task,
      hours,
      tools,
      materials,
      steps,
      timestamp: new Date(date).getTime()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bead-card p-8 space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
            <CalendarIcon className="w-3 h-3" /> {t('date')}
          </label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
            <Clock className="w-3 h-3" /> {t('hours_spent')}
          </label>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary"
              required
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setHours(h => Math.max(0, h - 0.5))} className="w-10 h-10 rounded-lg bg-muted border-2 border-current flex items-center justify-center font-black">-</button>
              <button type="button" onClick={() => setHours(h => h + 0.5)} className="w-10 h-10 rounded-lg bg-muted border-2 border-current flex items-center justify-center font-black">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center justify-between">
          <span>{t('task_performed')}</span>
          <span className="text-[10px] opacity-40 font-bold">Scroll for RTB Examples →</span>
        </label>
        
        {/* Horizontal Task Carousel */}
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-2 px-2 snap-x">
          {TRADE_KNOWLEDGE[trade].tasks.map(t => (
            <button 
              key={t}
              type="button"
              onClick={() => setTask(t)}
              className={cn(
                "snap-start flex-shrink-0 bead-card px-6 py-4 font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap",
                task === t ? "bg-primary text-white border-primary shadow-lg scale-105" : "hover:bg-muted hover:scale-105"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. Brake Pad Replacement"
            className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary pr-40"
            required
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
             <button 
              type="button"
              onClick={handleSuggestTask}
              disabled={isAiLoading}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-1 font-black text-[10px] uppercase shadow-sm border border-current"
            >
              <Sparkles className="w-3 h-3" />
              {t('suggest')}
            </button>
             <button 
              type="button"
              onClick={handleAiHelp}
              disabled={!task || isAiLoading}
              className="px-3 py-1.5 bg-primary text-white rounded-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-1 font-black text-[10px] uppercase shadow-sm border border-current"
            >
              <Sparkles className="w-3 h-3" />
              {t('magic_fill')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
            <Hammer className="w-3 h-3" /> {t('tools')}
          </label>
          <textarea 
            value={tools.join(', ')}
            onChange={(e) => setTools(e.target.value.split(',').map(t => t.trim()))}
            placeholder="Wrench, Jack..."
            className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary h-32 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
            <Package className="w-3 h-3" /> {t('materials')}
          </label>
          <textarea 
            value={materials.join(', ')}
            onChange={(e) => setMaterials(e.target.value.split(',').map(t => t.trim()))}
            placeholder="Oil, Rags, Grease..."
            className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary h-32 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase opacity-60 px-1 flex items-center gap-2">
            <ListChecks className="w-3 h-3" /> {t('steps')}
          </label>
          <textarea 
            value={steps.join('\n')}
            onChange={(e) => setSteps(e.target.value.split('\n'))}
            placeholder="1. Lift car&#10;2. Remove wheel..."
            className="w-full bg-muted border-2 border-current rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 ring-primary h-32 text-sm"
          />
        </div>
      </div>

      <button type="submit" className="bead-button bead-button-primary w-full text-lg py-4 flex items-center justify-center gap-3">
        <CheckCircle2 className="w-6 h-6" /> {t('save_log')}
      </button>
      <CornerBeads />
    </form>
  );
}
