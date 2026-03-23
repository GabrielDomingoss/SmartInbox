import { useEffect, useState } from "react";
import type { IAnalysisHistoryItem, IAnalysisResult } from "./types/analysis";
import { analyzeEmail, analyzeEmailFile } from "./services/analyzer";
import { AlertCircle, Sparkles } from "lucide-react";
import { EmailInputCard } from "./components/email-input-card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AnalysisResultCard } from "./components/analysis-result-card";
import { ExampleEmails } from "./components/example-emails";
import { HistoryList } from "./components/history-list";
import { useTheme } from "./hooks/use-theme";
import { ThemeToggle } from "./components/theme-toggle";

const HISTORY_STORAGE_KEY = "smartinbox-history";
const HISTORY_LIMIT = 5;

function App() {
  const [result, setResult] = useState<IAnalysisResult | null>(null);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState("");
  const [selectedExample, setSelectedExample] = useState("");
  const [history, setHistory] = useState<IAnalysisHistoryItem[]>([]);

  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const storedHistory = sessionStorage.getItem(HISTORY_STORAGE_KEY);

    if (!storedHistory) return;

    try {
      const parsed = JSON.parse(storedHistory) as IAnalysisHistoryItem[];
      setHistory(parsed);
    } catch {
      sessionStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  function persistHistory(items: IAnalysisHistoryItem[]) {
    setHistory(items);
    sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
  }

  function addToHistory(item: IAnalysisHistoryItem) {
    const updated = [item, ...history].slice(0, HISTORY_LIMIT);
    persistHistory(updated);
  }

  async function handleAnalyze(content: string) {
    try {
      setLoadingText(true);
      setError("");

      const response = await analyzeEmail(content);
      setResult(response);

      addToHistory({
        id: crypto.randomUUID(),
        sourceType: "text",
        sourceLabel: "Texto manual",
        createdAt: new Date().toISOString(),
        result: response,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro inesperado. Por favor tente novamente mais tarde";

      setError(message);
      setResult(null);
    } finally {
      setLoadingText(false);
    }
  }

  async function handleAnalyzeFile(file: File) {
    try {
      setLoadingFile(true);
      setError("");
      setSelectedExample("");

      const response = await analyzeEmailFile(file);
      setResult(response);

      addToHistory({
        id: crypto.randomUUID(),
        sourceType: "file",
        sourceLabel: file.name,
        createdAt: new Date().toISOString(),
        result: response,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro inesperado. Por favor tente novamente mais tarde.";
      setError(message);
      setResult(null);
    } finally {
      setLoadingFile(false);
    }
  }

  function handleSelectExample(content: string) {
    setSelectedExample(content);
    setResult(null);
    setError("");
  }

  function handleSelectHistoryItem(item: IAnalysisHistoryItem) {
    setResult(item.result);
    setError("");
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">SmartInbox</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Classifique e-mails como produtivos ou improdutivos e gere
              respostas profissionais automaticamente usando IA.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
              Classificação inteligente de emails com IA
            </div>
          </div>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <EmailInputCard
              onAnalyze={handleAnalyze}
              onFileAnalyze={handleAnalyzeFile}
              loadingText={loadingText}
              loadingFile={loadingFile}
              initialContent={selectedExample}
            />
          </div>

          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Falha na análise</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result ? (
              <AnalysisResultCard result={result} />
            ) : (
              <div className="rounded-2xl border border-dashed bg-background p-8 text-sm leading-6 text-muted-foreground shadow-sm">
                O resultado da análise aparecerá aqui após o envio de um e-mail
                ou arquivo.
              </div>
            )}
          </div>
        </div>

        <ExampleEmails onSelectExample={handleSelectExample} />

        <HistoryList items={history} onSelectItem={handleSelectHistoryItem} />
      </div>
    </main>
  );
}

export default App;
