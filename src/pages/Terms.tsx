import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

export default function Terms() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">Terms of Service</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p className="text-sm leading-relaxed">
                  By accessing and using NeuroBooks ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">2. AI-Assisted Content</h2>
                <p className="text-sm leading-relaxed">
                  Our ebooks are created with the assistance of artificial intelligence. While we strive for accuracy and quality, AI-generated content may contain errors or inaccuracies. Users should verify critical information from independent sources. NeuroBooks does not guarantee the accuracy, completeness, or reliability of AI-assisted content.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">3. Purchases & Refunds</h2>
                <p className="text-sm leading-relaxed">
                  All purchases are processed securely through Stripe. Digital products are non-refundable after download unless the product is defective. We offer a 30-day money-back guarantee for products that don't meet the description.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">4. Intellectual Property</h2>
                <p className="text-sm leading-relaxed">
                  All ebooks and content on NeuroBooks are protected by copyright. Purchasing an ebook grants you a personal, non-transferable license to read and use the content. You may not redistribute, resell, or share purchased ebooks without explicit written permission.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">5. Account Responsibility</h2>
                <p className="text-sm leading-relaxed">
                  You are responsible for maintaining the security of your account credentials. Any activity under your account is your responsibility. Notify us immediately of any unauthorized access.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">6. Limitation of Liability</h2>
                <p className="text-sm leading-relaxed">
                  NeuroBooks shall not be liable for any indirect, incidental, or consequential damages arising from the use of our Service or content. Our total liability is limited to the amount paid for the specific product in question.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">7. Changes to Terms</h2>
                <p className="text-sm leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
