import type { IAnalysisResult } from "../types/analysis";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface IAnalyzeEmailPayload {
  content: string;
}

export async function analyzeEmail(
  payload: IAnalyzeEmailPayload,
): Promise<IAnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Falha ao analisar e-mail.");
  }

  return data;
}

export async function analyzeEmailFile(file: File): Promise<IAnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/analyze-file`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Falha ao analisar e-mail.");
  }

  return data;
}
