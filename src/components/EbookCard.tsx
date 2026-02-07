import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export interface EbookData {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  badge?: string;
}

export default function EbookCard({ ebook }: { ebook: EbookData }) {
  return (
    <Link to={`/ebook/${ebook.id}`}>
      <motion.div
        whileHover={{ y: -6, rotateY: 3, rotateX: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass hover-lift group cursor-pointer overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
          <img
            src={ebook.coverUrl}
            alt={ebook.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          {ebook.badge && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {ebook.badge}
            </span>
          )}
        </div>

        <div className="p-4 space-y-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {ebook.category}
          </span>
          <h3 className="font-display text-base font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {ebook.title}
          </h3>
          <p className="text-xs text-muted-foreground">by {ebook.author}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{ebook.shortDescription}</p>

          <div className="flex items-center gap-1 pt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(ebook.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({ebook.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="font-display text-lg font-bold text-foreground">${ebook.price}</span>
            {ebook.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${ebook.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
