// Re-export models for use in API routes
// In a real scenario, you might want to share these from the backend
// For now, we'll define minimal interfaces for the dashboard

export interface DashboardCouple {
  _id: string;
  coupleName: string;
  status: 'pending' | 'active' | 'inactive';
  user1Name: string;
  user2Name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardAgent {
  _id: string;
  title: string;
  emoji: string;
  description: string;
  coupleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardChat {
  _id: string;
  title: string;
  agentId: string;
  lastMessage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMessage {
  _id: string;
  content: string;
  sender: 'user' | 'assistant';
  chatId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardUser {
  _id: string;
  fullName: string;
  email: string;
  coupleId?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

