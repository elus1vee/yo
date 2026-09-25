import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { MessengerIcon, messengerToneClass } from "./messenger-icon";
import {
  type CardImage,
  type CardTint,
  type Messenger,
  cardTintClass,
} from "./types";

const icons = { pin: PinIcon, phone: PhoneIcon, mail: MailIcon } as const;

export interface ContactDetailItem {
  icon: keyof typeof icons;
  /** Color of the icon circle. */
  tint: CardTint;
  /** Small caps label, e.g. "Адрес". */
  label: string;
  /** One line each; give `href` for tel: / mailto: links. */
  lines: { text: string; href?: string }[];
}

export interface ContactDetailsProps {
  items: ContactDetailItem[];
  /** Messenger buttons with visible names (`Messenger.text`). */
  messengers: { label: string; links: Messenger[] };
  /**
   * Map area. TODO: it is a striped placeholder, as in the mockup — connect
   * Yandex / Google Maps (or pass a static `image`).
   */
  map: { caption: string; image?: CardImage };
}

/** Left column of the contacts page: details card and map. */
export function ContactDetails({
  items,
  messengers,
  map,
}: ContactDetailsProps) {
  const label =
    "text-[11px] tracking-[0.1em] text-text-muted uppercase tablet:text-xs";

  return (
    <div className="flex flex-col gap-6 lg:gap-4">
      <Card className="tablet:gap-6 tablet:rounded-[28px] tablet:p-8 flex flex-col gap-5 rounded-[24px] p-[22px]">
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.label} className="tablet:gap-4 flex gap-3.5">
              <div
                className={cn(
                  "text-text tablet:size-11 flex size-10 shrink-0 items-center justify-center rounded-full",
                  cardTintClass[item.tint],
                )}
              >
                <Icon size={20} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className={label}>{item.label}</span>
                {item.lines.map((line) =>
                  line.href ? (
                    <SafeLink
                      key={line.text}
                      href={line.href}
                      className="font-heading text-text hover:text-primary tablet:text-lg w-fit text-base transition-colors"
                    >
                      {line.text}
                    </SafeLink>
                  ) : (
                    <span
                      key={line.text}
                      className="font-heading tablet:text-lg text-base leading-[1.4]"
                    >
                      {line.text}
                    </span>
                  ),
                )}
              </div>
            </div>
          );
        })}

        {messengers.links.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className={label}>{messengers.label}</span>
            <ul className="flex flex-wrap gap-2">
              {messengers.links.map((m) => (
                <li key={m.kind}>
                  <SafeLink
                    href={m.href}
                    aria-label={m.label}
                    className={cn(
                      "text-text focus-visible:shadow-focus-button flex h-11 items-center gap-2 rounded-full px-4 text-[13px] font-bold transition-colors focus-visible:outline-none",
                      messengerToneClass[m.kind],
                    )}
                  >
                    <MessengerIcon kind={m.kind} />
                    {m.text ?? m.label}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <div className="tablet:h-[260px] tablet:rounded-[28px] relative h-[200px] overflow-hidden rounded-[24px]">
        {map.image ? (
          <Image
            src={map.image.src}
            alt={map.image.alt}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder
            variant="tint"
            tint="neutral"
            caption={map.caption}
            align="bottom"
          />
        )}
      </div>
    </div>
  );
}
