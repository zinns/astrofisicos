import { Card } from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  description: string;
};

export function MetricCard({ title, description }: MetricCardProps) {
  return (
    <Card className="space-y-3">
      <p className="font-heading text-xl font-semibold text-moon-50">{title}</p>
      <p className="text-sm leading-7 text-moon-300">{description}</p>
    </Card>
  );
}

