"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SafeLink } from "@/components/ui/safe-link";
import { telHref } from "@/lib/safe-url";
import { cn } from "@/lib/utils";
import { MessengerIcon } from "./messenger-icon";
import {
  type ImageAsset,
  type Messenger,
  type MessengerKind,
  type NavItem,
} from "./types";

export interface HeaderProps {
  /** Logo link target and its accessible name, e.g. { href: "/", label: "На главную" }. */
  home: { href: string; label: string };
  yoLogo: ImageAsset;
  clarityLogo: ImageAsset;
  nav: NavItem[];
  /** Display form, e.g. "+375 29 657 93 71"; the tel: link is derived from it. */
  phone: string;
  messengers: Messenger[];
  labels: {
    /** aria-label of the navigation landmark. */
    nav: string;
    openMenu: string;
    closeMenu: string;
  };
}

const messengerClass: Record<MessengerKind, string> = {
  telegram: "bg-primary-tint hover:bg-primary-tint-hover",
  whatsapp: "bg-peach-tint hover:bg-peach-hover",
  viber: "bg-lavender-tint hover:bg-lavender-hover",
};

function isActive(pathname: string, href: string) {
  if (!href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const focusRing =
  "focus-visible:shadow-focus-button focus-visible:outline-none";

/**
 * Sticky floating-pill header. Below `xl` (1280px) the menu and phone move
 * into a burger panel; the messenger buttons stay visible, as in the mobile
 * mockup. The opened panel is not in the handoff — it reuses the nav pills.
 */
export function Header({
  home,
  yoLogo,
  clarityLogo,
  nav,
  phone,
  messengers,
  labels,
}: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-20 bg-[linear-gradient(var(--color-bg)_70%,transparent)] px-3.5 py-3 xl:bg-[linear-gradient(var(--color-bg)_60%,transparent)] xl:px-10 xl:py-4"
    >
      <div className="bg-surface relative mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-7 rounded-full pr-2.5 pl-[18px] shadow-md xl:h-[76px] xl:pr-3.5 xl:pl-5">
        <SafeLink
          href={home.href}
          aria-label={home.label}
          className={cn(
            "flex items-center gap-[9px] rounded-full xl:gap-3.5",
            focusRing,
          )}
        >
          <Image
            src={clarityLogo.src}
            alt={clarityLogo.alt}
            width={clarityLogo.width}
            height={clarityLogo.height}
            className="size-11 xl:size-[52px]"
          />
          <span
            aria-hidden="true"
            className="bg-divider h-[22px] w-px xl:h-[30px]"
          />
          <Image
            src={yoLogo.src}
            alt={yoLogo.alt}
            width={yoLogo.width}
            height={yoLogo.height}
            className="h-6 w-auto xl:h-[34px]"
          />
        </SafeLink>

        <nav
          aria-label={labels.nav}
          className="hidden gap-2 text-[15px] font-semibold xl:flex"
        >
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <SafeLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-text rounded-full px-[18px] py-[9px] transition-colors",
                  focusRing,
                  active ? "bg-primary-tint" : "hover:bg-surface-hover",
                )}
              >
                {item.label}
              </SafeLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          <SafeLink
            href={telHref(phone)}
            className={cn(
              "text-text hidden rounded-full text-[15px] font-bold xl:inline",
              focusRing,
            )}
          >
            {phone}
          </SafeLink>

          <div className="flex gap-1.5">
            {messengers.map((m) => (
              <SafeLink
                key={m.kind}
                href={m.href}
                aria-label={m.label}
                className={cn(
                  "text-text flex size-11 items-center justify-center rounded-full transition-colors xl:size-10",
                  messengerClass[m.kind],
                  focusRing,
                )}
              >
                <MessengerIcon kind={m.kind} />
              </SafeLink>
            ))}

            <button
              ref={burgerRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? labels.closeMenu : labels.openMenu}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "bg-surface-inverse flex size-11 flex-col items-center justify-center gap-[5px] rounded-full xl:hidden",
                focusRing,
              )}
            >
              <span
                className={cn(
                  "bg-text-inverse h-0.5 w-4 rounded-sm transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "bg-text-inverse h-0.5 w-4 rounded-sm transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>

        {open && (
          <div
            id={menuId}
            className="bg-surface absolute inset-x-0 top-full mt-2 rounded-lg p-3 shadow-md xl:hidden"
          >
            <nav aria-label={labels.nav}>
              <ul className="flex flex-col gap-1">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <SafeLink
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-text block rounded-full px-[18px] py-3 text-[15px] font-semibold transition-colors",
                          focusRing,
                          active ? "bg-primary-tint" : "hover:bg-surface-hover",
                        )}
                      >
                        {item.label}
                      </SafeLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <SafeLink
              href={telHref(phone)}
              className={cn(
                "bg-primary-tint text-text mt-2 flex rounded-full px-[18px] py-3 text-[15px] font-bold",
                focusRing,
              )}
            >
              {phone}
            </SafeLink>
          </div>
        )}
      </div>
    </header>
  );
}
