import { Badge } from "./ui/badge";

type StatusBadgeProps = {
  category: "Productive" | "Unproductive";
};

export const StatusBadge = ({ category }: StatusBadgeProps) => {
  const isProductive = category === "Productive";
  const label = isProductive ? "Produtivo" : "Improdutivo";
  return (
    <Badge
      className={
        isProductive
          ? "bg-green-100 text-green-700 hover:bg-green-100"
          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
      }
    >
      {label}
    </Badge>
  );
};
