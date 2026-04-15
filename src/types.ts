export type Theme = 'earth' | 'royal' | 'sunset' | 'agaseke' | 'kivu' | 'umushanana' | 'auto';

export type Trade = 
  | 'Automotive Mechanics'
  | 'Culinary Arts' 
  | 'Carpentry' 
  | 'Tailoring' 
  | 'Masonry' 
  | 'Plumbing'
  | 'Electrical Installation'
  | 'Welding'
  | 'Hospitality'
  | 'Tourism'
  | 'ICT - Software Development'
  | 'ICT - Computer Systems'
  | 'Hairdressing'
  | 'Graphic Design'
  | 'Food Processing'
  | 'Solar Energy'
  | 'Telecommunication'
  | 'Agriculture & Crop Production'
  | 'Animal Health'
  | 'Wood Technology'
  | 'Leather Technology'
  | 'Water and Irrigation'
  | 'Mobile Phone Repair'
  | 'Computer Application'
  | 'Entrepreneurship';

export interface LogEntry {
  id: string;
  date: string;
  task: string;
  tools: string[];
  materials: string[];
  steps: string[];
  hours: number;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  trade: Trade;
  theme: Theme;
  avatar?: string;
  totalHours: number;
  badges: string[];
  school?: string;
  level?: string;
  idNumber?: string;
  phone?: string;
  email?: string;
  year?: string;
  isAdmin?: boolean;
  appName?: string;
  customLogo?: string;
  customDevImage?: string;
  customDevName?: string;
  customPrimaryColor?: string;
  certificates?: string[];
  natureMode?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoType: 'youtube' | 'local';
  thumbnail?: string;
  trade: Trade | 'All';
  createdAt: number;
}

export interface UserProgress {
  id: string;
  courseId: string;
  userId: string;
  status: 'started' | 'completed';
  lastWatched: number;
  progress: number; // 0 to 100
}
