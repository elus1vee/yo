import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";

export interface EmptyStateProps {
  title: string;
  description?: Copy;
  /** Action under the text, e.g. a "Сбросить фильтры" button. */
  children?: ReactNode;
}

/** "Ничего не найдено" panel with a magnifier icon. */
export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <Card className="tablet:gap-4 tablet:rounded-lg tablet:px-10 tablet:py-20 flex flex-col items-center gap-3.5 rounded-[28px] px-6 py-12 text-center">
      <div className="bg-surface-tint text-text-muted tablet:size-16 flex size-[52px] items-center justify-center rounded-full">
        <svg
          viewBox="0 0 24 24"
          className="tablet:size-[26px] size-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <h3 className="font-heading tablet:text-2xl text-[20px] font-medium">
        {title}
      </h3>
      {description && (
        <ResponsiveText
          as="p"
          text={description}
          className="text-text-muted tablet:text-[15px] max-w-[340px] text-sm leading-[1.55]"
        />
      )}
      {children && <div className="tablet:mt-2 mt-1.5">{children}</div>}
    </Card>
  );
}
