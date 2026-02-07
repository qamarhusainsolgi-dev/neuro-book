import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Brain, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AIDisclaimer() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold">AI Content Disclaimer</h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <div className="glass glow-border-accent p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-lg font-display font-semibold text-foreground mb-2">Important Notice</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The ebooks available on NeuroBooks are created with the assistance of artificial intelligence technologies, including large language models. This means that while the content is curated and reviewed by human editors, portions of the text, analysis, and recommendations are generated or enhanced by AI.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">What This Means for You</h2>
                <ul className="space-y-3">
                  {[
                    "AI-generated content may contain factual errors or outdated information",
                    "Recommendations should not substitute professional advice (medical, legal, financial)",
                    "Statistics and data points should be independently verified for critical decisions",
                    "AI may produce content that reflects biases present in its training data",
                    "Content is regularly reviewed but may not reflect the latest developments",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <AlertTriangle className="h-4 w-4 text-accent/60 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">Our Quality Commitment</h2>
                <ul className="space-y-3">
                  {[
                    "Every ebook undergoes human editorial review before publication",
                    "We use multiple AI models and cross-reference outputs for accuracy",
                    "Reader feedback is actively incorporated into content improvements",
                    "Clear labeling of AI-assisted content where applicable",
                    "Regular content updates to reflect new information",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass p-6 space-y-3">
                <h2 className="text-xl font-display font-semibold text-foreground">Questions?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have concerns about AI-generated content in any of our ebooks, please contact us at content@neurobooks.com. We take content accuracy seriously and welcome your feedback.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
