import type { IExampleEmail } from "../types/analysis";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface IExampleEmailsProps {
  onSelectExample: (content: string) => void;
}

const EXAMPLE_EMAILS: IExampleEmail[] = [
  {
    title: "Acompanhamento de chamado",
    description: "Email produtivo pedindo atualização de um problema.",
    content:
      "Olá equipe, gostaria de saber se há alguma atualização sobre o problema reportado ontem. Poderiam informar o status atual e a previsão de resolução?",
  },
  {
    title: "Solicitação de suporte",
    description: "Email produtivo solicitando ajuda para desbloquear tarefa.",
    content:
      "Olá, estou com dificuldade para acessar o painel interno e isso está bloqueando meu trabalho. Poderiam me ajudar a resolver isso o quanto antes?",
  },
  {
    title: "Agradecimento",
    description: "Email improdutivo apenas de cortesia.",
    content:
      "Muito obrigado pelo suporte e pela rapidez no atendimento. Agradeço pela ajuda!",
  },
  {
    title: "Mensagem comemorativa",
    description: "Email improdutivo sem necessidade de ação.",
    content: "Desejo a todos uma ótima semana e muito sucesso nos projetos!",
  },
];

export const ExampleEmails = ({ onSelectExample }: IExampleEmailsProps) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Exemplo de e-mails</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {EXAMPLE_EMAILS.map((example) => (
          <button
            key={example.title}
            type="button"
            onClick={() => onSelectExample(example.content)}
            className="w-full cursor-pointer rounded-xl border bg-background p-4 text-left transistion hover:-translate-y-0.5 hover:bg-muted/40"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{example.title}</p>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="pointer-events-none h-8"
                >
                  Usar
                </Button>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {example.description}
              </p>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
