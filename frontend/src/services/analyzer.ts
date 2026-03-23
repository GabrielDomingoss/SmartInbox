import type { AxiosError } from "axios";
import type { IAnalysisResult } from "../types/analysis";
import { api } from "./api";

export async function analyzeEmail(content: string): Promise<IAnalysisResult> {
  try {
    const { data } = await api.post("/api/analyze", { content });
    return data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;
    const detail = err?.response?.data?.detail;

    if (err?.response?.status === 429) {
      throw new Error(
        detail ||
          "O limite de uso da IA foi atingido no momento. Tente novamente amanhã.",
      );
    }

    throw new Error(detail || "Falha ao analisar e-mail.");
  }
}

export async function analyzeEmailFile(file: File): Promise<IAnalysisResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/api/analyze-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<{ detail?: string }>;
    const detail = err?.response?.data?.detail;

    if (err?.response?.status === 429) {
      throw new Error(
        detail ||
          "O limite de uso da IA foi atingido no momento. Tente novamente amanhã.",
      );
    }

    throw new Error(detail || "Falha ao analisar arquivo.");
  }
}
