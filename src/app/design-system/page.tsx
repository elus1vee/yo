/**
 * Token preview / QA page — not part of the site navigation.
 *
 * Renders every color, spacing step, radius, shadow and typography token
 * from src/styles/tokens.css so they can be checked against the design
 * handoff (Yo Design System.dc.html) side by side. No ui/blocks components
 * are used here on purpose — this is the theme foundation only.
 *
 * The systematic swatch grids below read tokens via inline `var(--...)`
 * rather than by building Tailwind class names dynamically (e.g.
 * `` `bg-${token}` ``) — Tailwind's compiler scans source for literal class
 * names, so a dynamically-built one never gets generated. The "Проверка
 * утилит Tailwind" section further down uses literal classNames instead,
 * to actually prove bg-primary / p-4 / rounded-md / text-h1 work as
 * Tailwind utilities.
 */

const surfaceColors = [
  { token: "bg", hex: "#F5F0E6", label: "фон страницы" },
  { token: "surface", hex: "#FBF8F2", label: "карточки, хедер" },
  { token: "surface-tint", hex: "#E6DECA", label: "секции, заглушки" },
  { token: "surface-hover", hex: "#F0EBDF", label: "hover" },
  { token: "surface-inverse", hex: "#3B362F", label: "футер", inverse: true },
];

const textColors = [
  { token: "text", hex: "#3B362F", label: "основной текст", inverse: true },
  {
    token: "text-muted",
    hex: "#6B6150",
    label: "вторичный текст",
    inverse: true,
  },
  { token: "text-inverse", hex: "#F5F0E6", label: "текст на тёмном" },
  {
    token: "text-inverse-muted",
    hex: "#B5AC9B",
    label: "подписи на тёмном",
    inverse: true,
  },
];

const primaryColors = [
  { token: "primary", hex: "#5A7050", label: "кнопки, ссылки", inverse: true },
  { token: "primary-hover", hex: "#4C5F44", label: "hover", inverse: true },
  { token: "primary-active", hex: "#3F4F38", label: "active", inverse: true },
  { token: "primary-light", hex: "#A3B194", label: "акцент на тёмном" },
  { token: "primary-tint", hex: "#E3E8DA", label: "secondary-кнопки" },
  { token: "primary-tint-hover", hex: "#D3DBC5", label: "hover" },
  {
    token: "dark-hover",
    hex: "#2E2A24",
    label: "hover dark-кнопки",
    inverse: true,
  },
];

const lineColors = [
  { token: "peach", hex: "#E0A48B", label: "TOFU Peach" },
  { token: "peach-tint", hex: "#F6E3D9", label: "" },
  { token: "peach-hover", hex: "#F1D5C7", label: "" },
  { token: "lavender", hex: "#BAA8C3", label: "Лаванда" },
  { token: "lavender-tint", hex: "#ECE5EF", label: "" },
  { token: "lavender-hover", hex: "#DED2E6", label: "" },
];

const feedbackColors = [
  { token: "danger", hex: "#B24C3E", label: "ошибки форм", inverse: true },
  { token: "danger-tint", hex: "#F4E3DE", label: "" },
  { token: "border", hex: "#D8CFB8", label: "рамки" },
  { token: "border-subtle", hex: "#E6DECA", label: "рамки полей" },
  { token: "border-strong", hex: "#C9BFA6", label: "outline-кнопка" },
  { token: "divider", hex: "#DCD3C0", label: "" },
  { token: "disabled-bg", hex: "#E6E0D2", label: "disabled фон" },
  { token: "disabled-text", hex: "#B5AC9B", label: "disabled текст" },
];

function ColorSwatch({
  token,
  hex,
  label,
  inverse,
}: {
  token: string;
  hex: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-20 items-end rounded-md border p-2"
        style={{
          background: `var(--color-${token})`,
          borderColor: "var(--color-border-subtle)",
          color: inverse ? "var(--color-text-inverse)" : "var(--color-text)",
        }}
      >
        <span className="font-mono text-xs opacity-70">{hex}</span>
      </div>
      <div>
        <code
          className="text-sm font-bold"
          style={{ color: "var(--color-text)" }}
        >
          color-{token}
        </code>
        {label && (
          <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 14, 18, 24] as const;

const radii = [
  { token: "sm", label: "10px · поля, мелкие плашки" },
  { token: "md", label: "24px · карточки" },
  { token: "lg", label: "32px · большие панели" },
  { token: "xl", label: "44px · секции-контейнеры" },
  { token: "full", label: "кнопки, чипы, пилюли" },
];

const shadows = [
  { token: "sm", label: "shadow-sm" },
  { token: "md", label: "shadow-md · плавающий хедер" },
  { token: "hover", label: "shadow-hover · hover карточек" },
  { token: "lg", label: "shadow-lg" },
];

const typeScale = [
  { token: "display", sample: "Йо! Aa 1", heading: true },
  { token: "h1", sample: "Йо! Aa 1", heading: true },
  { token: "h2", sample: "Каталог", heading: true },
  { token: "h3", sample: "Название товара", heading: true },
  {
    token: "h4",
    sample: "Название товара (черновик, нет в макете)",
    heading: true,
  },
  {
    token: "body-lg",
    sample: "Основной текст абзаца, комфортный для чтения.",
    heading: false,
  },
  {
    token: "body",
    sample: "Основной текст абзаца, комфортный для чтения.",
    heading: false,
  },
  { token: "small", sample: "Подпись, метаданные", heading: false },
  { token: "label", sample: "КАТЕГОРИЯ", heading: false },
  { token: "button", sample: "Смотреть товары", heading: false },
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h2 font-heading">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPreview() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto flex max-w-[1320px] flex-col gap-18 px-10 py-16">
        <div className="flex flex-col gap-3">
          <span
            className="text-label font-mono uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            Йо! · токены темы · черновик
          </span>
          <h1 className="text-display font-heading">Основа темы</h1>
          <p
            className="text-body-lg max-w-[760px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Цвета, отступы, радиусы, тени и типографика из design handoff.
            Сверяйте с оригиналом: Yo Design System.dc.html. Компоненты (кнопки,
            поля, карточки) сюда намеренно не включены — это только основа темы.
          </p>
        </div>

        <Section title="Цвет">
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              Поверхности
            </span>
            <div className="split:grid-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {surfaceColors.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              Текст
            </span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {textColors.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              Primary и состояния
            </span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {primaryColors.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              Линейки товаров
            </span>
            <div className="split:grid-cols-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {lineColors.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              Ошибки, рамки, disabled
            </span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {feedbackColors.map((c) => (
                <ColorSwatch key={c.token} {...c} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="text-label"
              style={{ color: "var(--color-text-muted)" }}
            >
              pH-шкала (фирменный мотив)
            </span>
            <div
              className="h-7 rounded-full"
              style={{ background: "var(--gradient-ph)" }}
            />
            <div
              className="grid grid-cols-6 text-center text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span>5,5</span>
              <span>6,0</span>
              <span>6,5</span>
              <span>7,0</span>
              <span>8,0</span>
              <span>9,0</span>
            </div>
          </div>
        </Section>

        <Section title="Типографика">
          <p className="text-body" style={{ color: "var(--color-text-muted)" }}>
            Размер шрифта — fluid через <code>clamp()</code>, интерполирует
            между мобильным (390px) и десктопным (1440px) референсом. Меняйте
            ширину окна браузера, чтобы увидеть переход.
          </p>
          <div
            className="flex flex-col divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            {typeScale.map(({ token, sample, heading }) => (
              <div
                key={token}
                className="grid grid-cols-1 items-baseline gap-2 py-4 sm:grid-cols-[140px_1fr]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <code
                  className="text-sm font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  text-{token}
                </code>
                <span
                  style={{
                    color: "var(--color-text)",
                    fontFamily: heading
                      ? "var(--font-heading)"
                      : "var(--font-body)",
                    fontSize: `var(--text-${token})`,
                    lineHeight: `var(--text-${token}--line-height)`,
                    fontWeight: `var(--text-${token}--font-weight)`,
                    letterSpacing: `var(--text-${token}--letter-spacing, normal)`,
                  }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Отступы (шаг 4px)">
          <div className="flex flex-col gap-2">
            {spacingSteps.map((step) => (
              <div key={step} className="flex items-center gap-4">
                <code
                  className="w-24 text-sm font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  space-{step}
                </code>
                <div
                  className="h-4"
                  style={{
                    width: `var(--space-${step})`,
                    background: "var(--color-primary)",
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {step * 4}px
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Радиусы">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {radii.map((r) => (
              <div key={r.token} className="flex flex-col items-center gap-2">
                <div
                  className="h-20 w-20 border"
                  style={{
                    borderRadius: `var(--radius-${r.token})`,
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border-subtle)",
                  }}
                />
                <code
                  className="text-xs font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  radius-{r.token}
                </code>
                <span
                  className="text-center text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Тени">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {shadows.map((s) => (
              <div key={s.token} className="flex flex-col items-center gap-2">
                <div
                  className="h-20 w-full rounded-md"
                  style={{
                    background: "var(--color-surface)",
                    boxShadow: `var(--shadow-${s.token})`,
                  }}
                />
                <code
                  className="text-xs font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.label}
                </code>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Проверка утилит Tailwind">
          <p className="text-body" style={{ color: "var(--color-text-muted)" }}>
            Литеральные Tailwind-классы (не собранные из переменных) —
            подтверждают, что bg-primary / p-4 / rounded-md / text-h1 и т.п.
            реально сгенерированы сборкой.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="bg-primary text-text-inverse text-button font-body rounded-full px-6 py-3">
              bg-primary + p-4-scale + rounded-full
            </div>
            <div className="bg-surface border-border rounded-md border p-4">
              <span className="text-text">bg-surface + rounded-md + p-4</span>
            </div>
            <div className="bg-peach-tint rounded-lg p-6">
              <span className="text-h3 font-heading text-text">text-h3</span>
            </div>
            <div className="bg-surface rounded-md p-4 shadow-md">
              <span className="text-text">shadow-md</span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
