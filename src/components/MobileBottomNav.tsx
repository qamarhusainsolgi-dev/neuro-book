import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, LayoutDashboard, User, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/store", label: "Store", icon: Store },
  { href: "/dashboard", label: "Library", icon: BookOpen },
  { href: "/auth", label: "Account", icon: User, authHref: "/dashboard" },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border/40 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const href = tab.authHref && user ? tab.authHref : tab.href;
          const isActive =
            location.pathname === href ||
            (tab.href === "/" && location.pathname === "/") ||
            (tab.href === "/store" && location.pathname.startsWith("/store")) ||
            (tab.href === "/store" && location.pathname.startsWith("/ebook")) ||
            (tab.href === "/dashboard" && location.pathname === "/dashboard") ||
            (tab.authHref && location.pathname === tab.authHref);

          return (
            <Link
              key={tab.label}
              to={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_hsl(var(--glow-primary)/0.5)]")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
