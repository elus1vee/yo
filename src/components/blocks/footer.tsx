export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm">
        <span>© {new Date().getFullYear()} yo</span>
        <span>Все права защищены</span>
      </div>
    </footer>
  );
}
