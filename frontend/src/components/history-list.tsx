import type { IAnalysisHistoryItem } from "../types/analysis";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface IHistoryListProps {
  items: IAnalysisHistoryItem[];
  onSelectItem: (item: IAnalysisHistoryItem) => void;
}

export const HistoryList = ({ items, onSelectItem }: IHistoryListProps) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Histórico de análises recentes
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma análise realizada ainda.
          </p>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item)}
              className="w-full cursor-pointer rounded-xl border bg-background p-4 text-left transition hover:-translate-y-0.5 hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium">{item.sourceLabel}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <StatusBadge category={item.result.category} />
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {item.result.reason}
              </p>
            </button>
          ))
        )}
      </CardContent>
    </Card>
  );
};
