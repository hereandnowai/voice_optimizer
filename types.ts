
import { FeatureModule } from './constants';

export interface NavItem {
  name: FeatureModule;
  path: string;
  icon?: React.ReactNode;
}

export interface AnalysisResults {
  readability: string;
  tone: string;
  structure: string;
  issues: string[];
  suggestions: string[];
}

export interface Keywords {
  informational: string[];
  navigational: string[];
  transactional: string[];
}

export interface OptimizationSuggestions {
  auditSummary: string;
  recommendations: string[];
  qnaFormattedContent?: string;
  snippetHighlights?: string[];
}

export interface SimulationResult {
  query: string;
  currentContentAnalysis: string;
  optimizedContentAnalysis: string;
}

export interface ContentBrief {
  titleSuggestion: string;
  headings: string[];
  keyQuestions: string[];
  keywordClusters: string[];
  schemaSuggestions: string[];
}

export interface DashboardData {
  optimizationPercentage: number;
  readabilityScore: number;
  snippetPotential: number;
  keywordRankingScore: number;
}

// Gemini API related types
export interface GeminiResponseError {
  message: string;
  // Add other relevant error fields from Gemini API if needed
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  // Other types of chunks if applicable
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // other grounding metadata fields
}

export interface GeminiCandidate {
  groundingMetadata?: GroundingMetadata;
  // other candidate fields
}
export interface GenerateContentResponse {
  text: string; // Simplified direct access
  candidates?: GeminiCandidate[]; // For grounding metadata
  // other response fields
}

export interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}
