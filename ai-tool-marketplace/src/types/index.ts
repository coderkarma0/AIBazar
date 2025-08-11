// Core data model interfaces for the AI Tool Marketplace

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  bestPractices: string[];
  suggestedPrompts: string[];
}

export interface LeaderboardEntry {
  rank: number;
  toolId: string;
  score: number;
  achievement: string;
}

export interface Coupon {
  id: string;
  toolId: string;
  code: string;
  description: string;
  expiry: string;
}
