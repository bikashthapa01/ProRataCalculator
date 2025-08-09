import Header from "@/components/Header";
import ProRataCalculator from "@/components/ProRataCalculator";
import HowItWorks from "@/components/HowItWorks";
import Examples from "@/components/Examples";
import FAQ from "@/components/FAQ";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ProRataCalculator />
        <HowItWorks />
        <Examples />
        <ToolsSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
