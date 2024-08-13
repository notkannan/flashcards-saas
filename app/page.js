import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Hero from './components/Hero';
import Pricing from "./components/Pricing";
import PricingSection from "./components/PricingOption";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-200">
      <Hero />
      <Pricing />
    </div>
  );
}
