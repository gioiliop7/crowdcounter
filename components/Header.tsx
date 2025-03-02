import Image from "next/image";
import { Calendar, Heart } from "lucide-react";
import oksygono from "@/assets/oksygono.png";

export default function Header() {
  return (
    <>
      <header className="w-full bg-gradient-to-r from-red-900 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-lg shadow-md transform rotate-2">
                <div className="flex items-center gap-2 text-red-900 font-bold">
                  <Calendar className="h-5 w-5" />
                  <h1 className="text-2xl">28.02.2025</h1>
                  <Heart className="h-5 w-5 text-red-600 animate-pulse" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M14 6a4 4 0 1 1-2-3.46" />
                    <circle cx="12" cy="6" r="2" />
                    <path d="M10 6a4 4 0 0 1 8 0v2A6 6 0 0 1 6 8V6" />
                    <path d="M12 14v8" />
                    <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5" />
                    <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5" />
                  </svg>
                </div>
              </div>

              <div className="hidden md:flex flex-col">
                <h2 className="text-xl font-semibold">ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ</h2>
                <p className="text-sm text-red-100">Ανάλυση πληθυσμού</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <Image
                  className="relative w-full max-w-[220px] transition-transform duration-300 group-hover:scale-105"
                  src={oksygono}
                  alt="oksygono"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
