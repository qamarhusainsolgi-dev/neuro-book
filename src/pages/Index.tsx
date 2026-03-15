import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import EbookCard from "@/components/EbookCard";
import Layout from "@/components/Layout";
import { ebooks } from "@/data/ebooks";
import { ArrowRight, BookOpen, Shield, Zap, Brain, Sparkles, Download } from "lucide-react";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const features = [
  {
    icon: Brain,
    title: "AI-Enhanced Content",
    description: "Every ebook is crafted with AI assistance, delivering cutting-edge insights condensed into actionable knowledge.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Purchase and download immediately. No waiting—your ebook is ready the moment your payment clears.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-grade encryption for payments. Signed download URLs prevent unauthorized sharing.",
  },
  {
    icon: Download,
    title: "Lifetime Access",
    description: "Buy once, access forever. Re-download from your dashboard anytime, anywhere.",
  },
];

const stats = [
  { value: "10K+", label: "Readers" },
  { value: "50+", label: "Titles" },
  { value: "4.8", label: "Avg Rating" },
  { value: "99.9%", label: "Uptime" },
];

export default function Index() {
  const featured = ebooks.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <HeroScene />
        </Suspense>

        <div className="relative z-10 container-narrow section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle text-xs font-medium text-primary mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-Assisted Knowledge, Delivered Instantly
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.08] mb-6">
              Read Smarter.{" "}
              <span className="text-gradient-primary">Learn Faster.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Discover a curated library of AI-assisted ebooks designed to give you an unfair advantage in business, tech, and personal growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/store">
                  Explore Library
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/store">See What's Trending</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-subtle px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-medium text-primary uppercase tracking-widest">Why NeuroBooks</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold mt-3 mb-4">
                The Future of Learning is <span className="text-gradient-primary">Here</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                We combine AI intelligence with human curation to create ebooks that actually deliver on their promise.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass glow-border p-5 sm:p-6 h-full hover-lift">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ebooks */}
      <section className="section-padding bg-muted/20">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-12">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-widest">Featured</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mt-3">
                  Trending <span className="text-gradient-accent">Right Now</span>
                </h2>
              </div>
              <Button variant="hero-outline" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/store">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {featured.map((ebook, i) => (
              <ScrollReveal key={ebook.id} delay={i * 0.1}>
                <EbookCard ebook={ebook} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="hero-outline" asChild>
              <Link to="/store">
                View All Ebooks <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="glass glow-border p-6 sm:p-12 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative z-10">
                <BookOpen className="h-8 sm:h-10 w-8 sm:w-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">
                  Ready to <span className="text-gradient-primary">Level Up</span>?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-6 sm:mb-8">
                  Join thousands of readers who are already using AI-assisted ebooks to gain a competitive edge.
                </p>
                <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                  <Link to="/store">
                    Start Reading Today
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
