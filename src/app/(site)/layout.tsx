import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { footer, header } from "@/content/site";

/**
 * Shared frame of the public site: sticky header, growing <main>, footer.
 * `flex-1` on <main> is what keeps the footer at the bottom of the window
 * on short pages. Dev/preview routes (/ui-kit, /design-system, /blocks)
 * live outside this group and render without it.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header {...header} />
      <main className="flex-1">{children}</main>
      <Footer {...footer} />
    </>
  );
}
