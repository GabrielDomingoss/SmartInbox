import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface IEmailInputCardProps {
  onAnalyze: (content: string) => Promise<void>;
  loading: boolean;
  initialContent?: string;
}

export const EmailInputCard = ({
  onAnalyze,
  loading,
  initialContent = "",
}: IEmailInputCardProps) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  async function handleSubmit() {
    if (!content.trim()) return;
    await onAnalyze(content);
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
          className="min-h-[220px] resize-none"
        />

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Insira um e-mail e deixe o SmartInbox classificá-lo e gerar uma
            resposta profissional.
          </p>

          <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              "Analisar e-mail"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
