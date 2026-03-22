import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Loader2, Upload } from "lucide-react";
import { Button } from "./ui/button";

interface IUploadSectionProps {
  loading: boolean;
  onFileSelect: (file: File) => void;
}

export const UploadSection = ({
  loading,
  onFileSelect,
}: IUploadSectionProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    await onFileSelect(selectedFile);

    event.target.value = "";
  }
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Upload de arquivo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-dashed bg-muted/30 p-6">
          <div className="flex flex-col items-start gap-3">
            <div className="rounded-xl bg-background p-3 shadow-sm">
              <FileText className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <p className="font-medium">Envie um arquivo para análise</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Formatos aceitos: <strong>.txt</strong> e <strong>.pdf</strong>
              </p>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".txt,.pdf"
              className="hidden"
              onChange={handleChange}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Arquivo
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
