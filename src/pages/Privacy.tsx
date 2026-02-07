import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

export default function Privacy() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">1. Information We Collect</h2>
                <p className="text-sm leading-relaxed">
                  We collect information you provide directly: name, email address, and payment information. We also collect usage data such as pages visited, ebooks purchased, and download activity. Payment processing is handled by Stripe—we never store your credit card details.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">2. How We Use Your Information</h2>
                <p className="text-sm leading-relaxed">
                  Your information is used to: process purchases and deliver ebooks, provide customer support, improve our services, send important account notifications, and comply with legal obligations. We do not sell your personal data to third parties.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">3. Data Security</h2>
                <p className="text-sm leading-relaxed">
                  We implement industry-standard security measures including encryption in transit (TLS/SSL), encrypted storage, and access controls. Download URLs are signed and time-limited to prevent unauthorized access to purchased content.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">4. Cookies & Analytics</h2>
                <p className="text-sm leading-relaxed">
                  We use essential cookies for authentication and session management. Analytics cookies help us understand how users interact with our platform. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">5. Your Rights</h2>
                <p className="text-sm leading-relaxed">
                  You have the right to: access your personal data, request corrections, request deletion of your account and data, export your data, and opt out of marketing communications. Contact us at privacy@neurobooks.com to exercise these rights.
                </p>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">6. Third-Party Services</h2>
                <p className="text-sm leading-relaxed">
                  We use trusted third-party services for payment processing (Stripe), authentication, and hosting. Each service has its own privacy policy and we encourage you to review them.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
