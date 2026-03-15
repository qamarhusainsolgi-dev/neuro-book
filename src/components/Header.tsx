import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, loading, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30"
    >
      <div className="container-narrow flex items-center justify-between h-14 md:h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            Neuro<span className="text-primary">Books</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: just show the theme toggle and optional sign-out */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          {!loading && user && (
            <button
              onClick={signOut}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {!loading && user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/store">Browse Ebooks</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
