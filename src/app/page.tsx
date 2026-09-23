import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { footer, header } from "@/content/site";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header {...header} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-16">
        <h1 className="font-heading text-h1">Добро пожаловать</h1>
        <p className="text-text-muted max-w-xl">
          Проект настроен: Next.js, TypeScript, Tailwind CSS, шрифты Lora и
          Manrope с поддержкой кириллицы.
        </p>
      </main>
      <Footer {...footer} />
    </div>
  );
}
