"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamically import the Map component with SSR disabled
const Leaflet = dynamic(() => import("@/components/Leaflet"), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex-1 w-full">
          <Leaflet />
        </div>
      </main>
      <Footer />
    </>
  );
}
