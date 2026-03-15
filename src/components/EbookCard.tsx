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
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass hover-lift group cursor-pointer overflow-hidden h-full flex flex-col"
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
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-primary text-primary-foreground">
              {ebook.badge}
            </span>
          )}
        </div>

        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
          <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider">
            {ebook.category}
          </span>
          <h3 className="font-display text-xs sm:text-base font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {ebook.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">by {ebook.author}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 hidden sm:block">{ebook.shortDescription}</p>

          <div className="flex items-center gap-0.5 sm:gap-1 pt-1 mt-auto">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < Math.floor(ebook.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">({ebook.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="font-display text-sm sm:text-lg font-bold text-foreground">${ebook.price}</span>
            {ebook.originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">${ebook.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
