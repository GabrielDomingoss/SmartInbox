export interface IAnalysisResult {
  category: "Productive" | "Unproductive";
  reason: string;
  suggested_response: string;
}

export interface IExampleEmail {
  title: string;
  description: string;
  content: string;
}

export interface IAnalysisHistoryItem {
  id: string;
  sourceType: "text" | "file";
  sourceLabel: string;
  createdAt: string;
  result: IAnalysisResult;
}
