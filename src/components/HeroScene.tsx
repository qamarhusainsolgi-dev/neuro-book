import { motion } from "framer-motion";
import cover1 from "@/assets/covers/cover-1.jpg";
import cover2 from "@/assets/covers/cover-2.jpg";
import cover3 from "@/assets/covers/cover-3.jpg";
import cover4 from "@/assets/covers/cover-4.jpg";
import cover5 from "@/assets/covers/cover-5.jpg";

const floatingBooks = [
  { src: cover1, x: "8%", y: "10%", rotate: -12, delay: 0, size: "w-20 sm:w-28 lg:w-36" },
  { src: cover2, x: "75%", y: "5%", rotate: 8, delay: 0.3, size: "w-16 sm:w-24 lg:w-32" },
  { src: cover3, x: "85%", y: "55%", rotate: -6, delay: 0.6, size: "w-18 sm:w-26 lg:w-34" },
  { src: cover4, x: "5%", y: "60%", rotate: 10, delay: 0.9, size: "w-14 sm:w-22 lg:w-28" },
  { src: cover5, x: "60%", y: "75%", rotate: -15, delay: 1.2, size: "w-16 sm:w-20 lg:w-26" },
];

function FloatingBook({ src, x, y, rotate, delay, size }: {
  src: string; x: string; y: string; rotate: number; delay: number; size: string;
}) {
  return (
    <motion.div
      className={`absolute ${size} pointer-events-none`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.7, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ perspective: "600px" }}
      >
        <motion.div
          animate={{ rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-border/20">
            <img
              src={src}
              alt="Book cover"
              className="w-full aspect-[3/4] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Decorative particles
function BookParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30, -60] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(var(--glow-primary)/0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,hsl(var(--glow-accent)/0.08),transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating books */}
      <div className="hidden sm:block">
        {floatingBooks.map((book, i) => (
          <FloatingBook key={i} {...book} />
        ))}
      </div>

      {/* Mobile: show fewer, repositioned books */}
      <div className="sm:hidden">
        <FloatingBook src={cover1} x="5%" y="8%" rotate={-8} delay={0} size="w-16" />
        <FloatingBook src={cover2} x="70%" y="12%" rotate={6} delay={0.3} size="w-14" />
        <FloatingBook src={cover3} x="75%" y="65%" rotate={-10} delay={0.6} size="w-12" />
      </div>

      <BookParticles />
    </div>
  );
}
