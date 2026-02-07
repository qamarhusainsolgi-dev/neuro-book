import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ebooks } from "@/data/ebooks";
import { Star, ShoppingCart, Download, CheckCircle2, ArrowLeft, BookOpen } from "lucide-react";

function Book3D({ coverUrl, title }: { coverUrl: string; title: string }) {
  return (
    <motion.div
      className="relative w-64 sm:w-72 mx-auto"
      style={{ perspective: "1200px" }}
      whileHover={{ rotateY: -15 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        animate={{ rotateY: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Book cover */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ transform: "rotateY(5deg)" }}>
          <img
            src={coverUrl}
            alt={title}
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
        </div>
        {/* Book spine effect */}
        <div
          className="absolute top-0 left-0 w-4 h-full bg-primary/20 rounded-l-sm"
          style={{ transform: "rotateY(-90deg) translateZ(8px)" }}
        />
      </motion.div>
      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-4 bg-primary/10 blur-xl rounded-full" />
    </motion.div>
  );
}

const benefits = [
  "AI-curated insights from hundreds of sources",
  "Actionable frameworks you can apply immediately",
  "Regular updates with latest research",
  "Lifetime access with free updates",
  "Money-back guarantee within 30 days",
];

export default function EbookDetail() {
  const { id } = useParams();
  const ebook = ebooks.find((e) => e.id === id);

  if (!ebook) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Ebook Not Found</h1>
          <Button variant="hero-outline" asChild>
            <Link to="/store">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const discount = ebook.originalPrice
    ? Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/store" className="hover:text-primary transition-colors">Store</Link>
              <span>/</span>
              <span className="text-foreground">{ebook.title}</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Book visual */}
            <ScrollReveal>
              <div className="flex items-center justify-center py-8">
                <Book3D coverUrl={ebook.coverUrl} title={ebook.title} />
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-widest">{ebook.category}</span>
                  <h1 className="text-3xl sm:text-4xl font-display font-bold mt-2 mb-2 leading-tight">{ebook.title}</h1>
                  <p className="text-muted-foreground">by {ebook.author}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(ebook.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {ebook.rating} ({ebook.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-foreground/80 leading-relaxed">{ebook.shortDescription}</p>

                {/* Price */}
                <div className="glass p-6 glow-border">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl font-display font-bold text-foreground">${ebook.price}</span>
                    {ebook.originalPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">${ebook.originalPrice}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          {discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Button variant="hero" size="xl" className="w-full">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Buy Now — ${ebook.price}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Secure checkout. Instant download after purchase.
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="font-display font-semibold text-foreground">What You'll Get</h3>
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
