import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import EbookCard from "@/components/EbookCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useEbooks, useCategories } from "@/hooks/useEbooks";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";

export default function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  const { data: ebooks = [], isLoading } = useEbooks();
  const { data: categories = ["All"] } = useCategories();

  const filtered = useMemo(() => {
    let result = ebooks.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [ebooks, searchQuery, activeCategory, sortBy]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4">
                Explore Our <span className="text-gradient-primary">Library</span>
              </h1>
              <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto">
                Browse AI-assisted ebooks across categories. Find your next breakthrough read.
              </p>
            </div>
          </ScrollReveal>

          {/* Search & Filters */}
          <ScrollReveal delay={0.1}>
            <div className="glass p-3 sm:p-6 mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title, author, or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-secondary border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-secondary border border-border rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-auto"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {filtered.length} ebook{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${sortBy}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
            >
              {filtered.map((ebook, i) => (
                <ScrollReveal key={ebook.id} delay={i * 0.05}>
                  <EbookCard ebook={ebook} />
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <p className="text-muted-foreground text-base sm:text-lg">No ebooks match your search.</p>
              <p className="text-muted-foreground/60 text-xs sm:text-sm mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
