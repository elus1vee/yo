import { Card } from "@/components/ui/card";

export interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
}

export function NewsCard({ title, excerpt, date }: NewsCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <time className="text-muted-foreground text-sm">{date}</time>
      <h3 className="font-heading text-lg">{title}</h3>
      <p className="text-muted-foreground">{excerpt}</p>
    </Card>
  );
}
