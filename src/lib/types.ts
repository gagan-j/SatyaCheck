export type AnalysisResult = {
  id: string;
  verdict: string;
  explanation: string;
  sources?: string[];
  claim: string;
};
