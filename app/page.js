import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-600">
      <p className="absolute inset-0 flex justify-center items-center">Main Page Content</p>
    </main>
  );
}
