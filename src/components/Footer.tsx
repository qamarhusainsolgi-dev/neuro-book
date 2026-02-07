import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/30">
      <div className="container-narrow px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                Neuro<span className="text-primary">Books</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              AI-assisted ebooks crafted to accelerate your learning. Each title is carefully curated and enhanced with artificial intelligence to deliver maximum insight in minimum time.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4">
              ⚡ Content is AI-assisted. While we ensure quality, please verify critical information independently.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/store" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse Store</Link></li>
              <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/ai-disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NeuroBooks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
