import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AIChatWidget from "./AIChatWidget";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-14 sm:pt-16">{children}</main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
