import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const TopBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-[var(--topbar-height)] border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">H</span>
            </div>
            <span className="font-semibold text-foreground text-lg">HealthLink</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-1 bg-secondary px-2 py-0.5 rounded">PATHLAB PORTAL</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-sm font-medium text-right leading-tight">
              Fortis Admin<br />
              <span className="text-xs text-muted-foreground font-normal">PathLab</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              FA
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default TopBar;
