import CallToAction from "@/components/home/CallToAction";
import Hero from "@/components/home/Hero";
import JobFeaturesSection from "@/components/home/JobFeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Hero />
      <JobFeaturesSection />
      <PricingSection />
      <CallToAction />
    </div>
  );
}
