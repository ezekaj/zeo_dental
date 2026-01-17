export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  longDescription: string;
  image: string;
  benefits: string[];
  process: ServiceProcessStep[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  fullBio?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}
