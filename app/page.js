import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Hero from './components/Hero';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <Hero />
    </div>
  );
}
