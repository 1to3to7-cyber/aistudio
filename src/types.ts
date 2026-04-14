export type Theme = 'earth' | 'royal' | 'sunset' | 'agaseke' | 'kivu' | 'umushanana' | 'auto';

export type Trade = 
  | 'Automobile' 
  | 'Culinary Arts' 
  | 'Carpentry' 
  | 'Tailoring' 
  | 'Masonry' 
  | 'Plumbing'
  | 'Electricity'
  | 'Welding'
  | 'Hospitality'
  | 'Tourism'
  | 'ICT - Software Development'
  | 'ICT - Networking'
  | 'Hairdressing'
  | 'Graphic Design'
  | 'Food Processing';

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
}
