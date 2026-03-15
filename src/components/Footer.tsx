import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/30">
      <div className="container-narrow px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <span className="font-display text-base sm:text-lg font-bold text-foreground">
                Neuro<span className="text-primary">Books</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              AI-assisted ebooks crafted to accelerate your learning. Each title is carefully curated and enhanced with artificial intelligence.
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-3 sm:mt-4">
              ⚡ Content is AI-assisted. Please verify critical information independently.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Platform</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/store" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Browse Store</Link></li>
              <li><Link to="/dashboard" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">My Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/ai-disclaimer" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">AI Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-border/30 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} NeuroBooks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
