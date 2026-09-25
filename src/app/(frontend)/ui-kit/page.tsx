import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PaginationDemo } from "./pagination-demo";

// Internal preview page: keep it out of search results.
export const metadata: Metadata = {
  title: "ui-kit",
  robots: { index: false, follow: false },
};

/**
 * UI kit preview — every component in every state, laid out like the
 * "Компоненты · состояния" section of Yo Design System.dc.html so the two
 * can be compared side by side.
 *
 * hover / focus / active can't be triggered statically, so those cells
 * apply the same token classes the real pseudo-states use (via className).
 * The live components in the same rows react to real hover / Tab / click.
 */

const XSS_IMG = '<img src=x onerror="alert(1)">';
const XSS_SCRIPT = "<script>alert('xss')</script>";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <span className="text-label text-text-muted uppercase">{title}</span>
      {children}
    </section>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2.5">
      {children}
      <span className="text-text-muted text-xs">{label}</span>
    </div>
  );
}

const grid5 = "grid grid-cols-2 gap-x-4 gap-y-6 tablet:grid-cols-5";
const grid3 = "grid grid-cols-1 gap-x-4 gap-y-6 tablet:grid-cols-3";

const animalOptions = [
  { value: "cats", label: "Кошки" },
  { value: "dogs", label: "Собаки" },
  { value: "rodents", label: "Грызуны" },
  { value: "birds", label: "Птицы (скоро)", disabled: true },
];

function ButtonRow({
  variant,
  label,
}: {
  variant: "primary" | "secondary" | "dark" | "light" | "outline" | "ghost";
  label: string;
}) {
  const hover = {
    primary: "bg-primary-hover",
    secondary: "bg-primary-tint-hover",
    dark: "bg-dark-hover",
    light: "bg-surface-hover",
    outline: "bg-surface-hover",
    ghost: "bg-surface-hover",
  }[variant];
  const active = {
    primary: "bg-primary-active",
    secondary: "bg-primary-tint-active",
    dark: "bg-dark-hover",
    light: "bg-surface-tint",
    outline: "bg-surface-tint",
    ghost: "bg-surface-tint",
  }[variant];

  return (
    <Section title={`Кнопка · ${variant}`}>
      <div className={grid5}>
        <Cell label="обычное">
          <Button variant={variant}>{label}</Button>
        </Cell>
        <Cell label="hover">
          <Button variant={variant} className={hover}>
            {label}
          </Button>
        </Cell>
        <Cell label="focus">
          <Button variant={variant} className="shadow-focus-button">
            {label}
          </Button>
        </Cell>
        <Cell label="active">
          <Button variant={variant} className={active}>
            {label}
          </Button>
        </Cell>
        <Cell label="disabled">
          <Button variant={variant} disabled>
            {label}
          </Button>
        </Cell>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant={variant} loading loadingText="Отправка…">
          {label}
        </Button>
        <span className="text-text-muted text-xs">
          loading · спиннер + затемнение, курсор wait, клик заблокирован
        </span>
      </div>
    </Section>
  );
}

export default function UiKitPage() {
  return (
    <div className="bg-bg min-h-screen">
      <div className="tablet:px-10 mx-auto flex max-w-[1320px] flex-col gap-18 px-4 py-16">
        <div className="flex flex-col gap-3">
          <span className="text-label text-text-muted font-mono uppercase">
            Йо! · ui-kit · черновик
          </span>
          <h1 className="text-h1">Компоненты · состояния</h1>
          <p className="text-body-lg text-text-muted max-w-[760px]">
            Сверяйте с секцией «Компоненты · состояния» в Yo Design
            System.dc.html. Ячейки hover / focus / active — статичный показ
            состояния теми же токенами; рядом живые компоненты реагируют на
            наведение, Tab и клик.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Кнопки</h2>
          <ButtonRow variant="primary" label="Смотреть товары" />
          <ButtonRow variant="secondary" label="Подробнее" />
          <ButtonRow variant="dark" label="Подробнее" />
          <ButtonRow variant="light" label="Где купить" />
          <ButtonRow variant="outline" label="Показать ещё" />
          <ButtonRow variant="ghost" label="Все товары" />
          <Section title="Размеры">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">sm · 44px</Button>
              <Button size="md">md · 52px</Button>
              <Button size="lg">lg · 58px</Button>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Поля</h2>
          <Section title="Input">
            <div className={grid3}>
              <Cell label="обычное">
                <Input label="Обычное" placeholder="Имя" />
              </Cell>
              <Cell label="focus">
                <Input
                  label="Focus"
                  defaultValue="Анна"
                  className="border-primary bg-surface shadow-focus-field"
                />
              </Cell>
              <Cell label="disabled">
                <Input label="Disabled" placeholder="Имя" disabled />
              </Cell>
              <Cell label="error">
                <Input
                  label="Ошибка"
                  placeholder="Телефон"
                  defaultValue="123"
                  error="Проверьте формат номера"
                />
              </Cell>
              <Cell label="filled">
                <Input label="Заполненное" defaultValue="Анна Ковалёва" />
              </Cell>
              <Cell label="hint">
                <Input
                  label="С подсказкой"
                  placeholder="+375 __ ___ __ __"
                  hint="Формат: +375 XX XXX XX XX"
                  type="tel"
                />
              </Cell>
            </div>
          </Section>

          <Section title="Textarea">
            <div className={grid3}>
              <Cell label="обычное">
                <Textarea label="Обычное" placeholder="Коротко о вопросе" />
              </Cell>
              <Cell label="focus">
                <Textarea
                  label="Focus"
                  defaultValue="Здравствуйте!"
                  className="border-primary bg-surface shadow-focus-field"
                />
              </Cell>
              <Cell label="disabled">
                <Textarea label="Disabled" placeholder="Сообщение" disabled />
              </Cell>
              <Cell label="error">
                <Textarea
                  label="Ошибка"
                  defaultValue="Привет"
                  error="Сообщение слишком короткое"
                />
              </Cell>
            </div>
          </Section>

          <Section title="Select">
            <div className={grid3}>
              <Cell label="обычное">
                <Select
                  label="Для кого"
                  placeholder="Все животные"
                  options={animalOptions}
                />
              </Cell>
              <Cell label="focus">
                <Select
                  label="Focus"
                  defaultValue="cats"
                  options={animalOptions}
                  className="border-primary bg-surface shadow-focus-field"
                />
              </Cell>
              <Cell label="disabled">
                <Select
                  label="Disabled"
                  placeholder="Все животные"
                  options={animalOptions}
                  disabled
                />
              </Cell>
              <Cell label="error">
                <Select
                  label="Ошибка"
                  placeholder="Выберите"
                  options={animalOptions}
                  error="Выберите значение"
                />
              </Cell>
            </div>
          </Section>

          <Section title="Checkbox">
            <div className="tablet:grid-cols-4 grid grid-cols-1 gap-x-4 gap-y-6">
              <Cell label="обычный">
                <Checkbox label="Обычный" />
              </Cell>
              <Cell label="отмечен">
                <Checkbox label="Отмечен" defaultChecked />
              </Cell>
              <Cell label="disabled">
                <Checkbox label="Disabled" disabled />
              </Cell>
              <Cell label="error">
                <Checkbox
                  label="Согласие"
                  error="Отметьте согласие на обработку данных"
                />
              </Cell>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Теги</h2>
          <Section title="Badge / Tag">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="peach" strong>
                Peach
              </Badge>
              <Badge tone="lavender">Lavender</Badge>
              <Badge tone="primary">Green tea</Badge>
              <Badge tone="neutral">6 л / 2,5 кг</Badge>
              <Badge tone="neutral" strong>
                Наполнители
              </Badge>
              <Badge tone="primary" strong>
                Новинка
              </Badge>
              <Badge tone="lavender" strong>
                Лаванда
              </Badge>
              <Badge disabled>Нет в наличии</Badge>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Чипы-фильтры</h2>
          <Section title="Chip">
            <div className="flex flex-wrap items-center gap-2.5">
              <Chip>Кошки</Chip>
              <Chip className="bg-surface-hover">Hover</Chip>
              <Chip active>Собаки · active</Chip>
              <Chip active className="bg-primary-hover">
                Active hover
              </Chip>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Карточка</h2>
          <Section title="Card">
            <div className={grid3}>
              <Cell label="обычная">
                <Card className="w-full">
                  <div className="bg-peach-tint h-[190px] rounded-md" />
                  <h3 className="text-h3 px-1.5 pt-4">
                    Наполнитель Йо! TOFU Peach
                  </h3>
                </Card>
              </Cell>
              <Cell label="hover (статично)">
                <Card className="shadow-hover w-full -translate-y-[3px]">
                  <div className="bg-peach-tint h-[190px] rounded-md" />
                  <h3 className="text-h3 px-1.5 pt-4">
                    Наполнитель Йо! TOFU Peach
                  </h3>
                </Card>
              </Cell>
              <Cell label="interactive · наведите курсор">
                <Card interactive className="w-full">
                  <div className="bg-lavender-tint h-[190px] rounded-md" />
                  <h3 className="text-h3 px-1.5 pt-4">
                    Наполнитель Йо! Лаванда
                  </h3>
                </Card>
              </Cell>
            </div>
            <div className={grid3}>
              {(["sm", "md", "lg"] as const).map((s) => (
                <Cell key={s} label={`shadow="${s}"`}>
                  <Card shadow={s} className="w-full">
                    <span className="text-sm">shadow-{s}</span>
                  </Card>
                </Cell>
              ))}
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">Пагинация</h2>
          <Section title="Pagination">
            <div className="flex flex-col gap-6">
              <Cell label="3 страницы · живая">
                <PaginationDemo pageCount={3} />
              </Cell>
              <Cell label="20 страниц · с многоточиями · живая">
                <PaginationDemo pageCount={20} />
              </Cell>
              <Cell label="первая страница (стрелка «назад» disabled)">
                <PaginationDemo pageCount={9} initialPage={1} />
              </Cell>
              <Cell label="последняя страница (стрелка «вперёд» disabled)">
                <PaginationDemo pageCount={9} initialPage={9} />
              </Cell>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-h2">XSS-проверка</h2>
          <Section title="Пользовательский текст рендерится как текст, не как HTML">
            <p className="text-body text-text-muted max-w-[760px]">
              Во всех полях ниже — строки с HTML/JS. Они должны отображаться
              буквально; ни одна картинка не подгружается и ни один alert не
              срабатывает.
            </p>
            <div className={grid3}>
              <Input
                label={XSS_IMG}
                defaultValue={XSS_SCRIPT}
                error={XSS_IMG}
              />
              <Textarea label={XSS_SCRIPT} defaultValue={XSS_IMG} />
              <Select
                label={XSS_IMG}
                options={[{ value: "x", label: XSS_SCRIPT }]}
              />
              <Checkbox label={XSS_IMG} error={XSS_SCRIPT} />
              <div className="flex flex-wrap items-start gap-2.5">
                <Badge tone="peach">{XSS_IMG}</Badge>
                <Badge>{XSS_SCRIPT}</Badge>
              </div>
              <Button variant="secondary" loading loadingText={XSS_IMG}>
                {XSS_SCRIPT}
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
