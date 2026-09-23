import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
}

export function ProductCard({
  title,
  price,
  imageSrc,
  imageAlt = title,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="bg-muted relative aspect-square overflow-hidden rounded-md">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg">{title}</h3>
        <p className="text-muted-foreground">{price}</p>
      </div>
      <Button className="w-full">В корзину</Button>
    </Card>
  );
}
