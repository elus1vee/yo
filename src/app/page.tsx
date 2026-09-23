import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            Добро пожаловать
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Проект настроен: Next.js, TypeScript, Tailwind CSS, шрифты Lora и
            Manrope с поддержкой кириллицы.
          </p>
        </div>
        <Card className="flex max-w-sm flex-col gap-4">
          <h2 className="font-heading text-xl">Пример формы</h2>
          <Input placeholder="Введите e-mail" type="email" />
          <Button>Отправить</Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
