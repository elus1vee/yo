import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { type TitlePart } from "./types";

/** Renders heading parts; `accentClassName` styles the accented ones. */
export function TitleParts({
  parts,
  accentClassName = "italic",
}: {
  parts: TitlePart[];
  accentClassName?: string;
}) {
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part.accent ? (
            <span className={cn(accentClassName)}>{part.text}</span>
          ) : (
            part.text
          )}
          {part.breakAfter && <br className="tablet:block hidden" />}
        </Fragment>
      ))}
    </>
  );
}
