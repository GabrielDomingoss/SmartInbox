import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Upload } from "lucide-react";
import { cn } from "../lib/utils";

interface IEmailInputCardProps {
  onAnalyze: (content: string) => void;
  onFileAnalyze: (file: File) => void;
  loadingText: boolean;
  loadingFile: boolean;
  initialContent?: string;
}

export const EmailInputCard = ({
  onAnalyze,
  onFileAnalyze,
  loadingText,
  loadingFile,
  initialContent = "",
}: IEmailInputCardProps) => {
  const [content, setContent] = useState(initialContent);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  async function handleSubmit() {
    if (!content.trim()) return;
    await onAnalyze(content);
  }

  async function handleFile(file: File) {
    await onFileAnalyze(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Conteúdo do e-mail</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Cole o conteúdo do e-mail aqui..."
          className="min-h-[160px]"
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "rounded-xl border border-dashed p-4 text-sm transition",
            isDragging ? "bg-muted/60 border-primary" : "bg-muted/30",
          )}
        >
          <p className="mb-2 font-medium">
            Arraste um arquivo (.txt ou .pdf) aqui
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            disabled={loadingFile}
          >
            {loadingFile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Selecionar arquivo
              </>
            )}
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loadingText}
          className="w-full cursor-pointer hover:opacity-70"
        >
          {loadingText ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisando...
            </>
          ) : (
            "Analisar e-mail"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
