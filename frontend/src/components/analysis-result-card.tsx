import { useState } from "react";
import type { IAnalysisResult } from "../types/analysis";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

interface IAnalysisResultCardProps {
  result: IAnalysisResult;
}

export const AnalysisResultCard = ({ result }: IAnalysisResultCardProps) => {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(result.suggested_response);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Resultado da análise</CardTitle>
        <StatusBadge category={result.category} />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Motivo</p>
          <p className="text-sm leading-6 text-foreground">{result.reason}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Resposta sugerida
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <p className="rounded-xl border bg-muted/30 p-4 text-sm leading-6 text-foreground">
            {result.suggested_response}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
