import type { Metadata } from "next";
import "./globals.css";
import { Anonymous_Pro } from "next/font/google";

const font = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["greek"],
});

export const metadata: Metadata = {
  title: "ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ | Εκτίμηση Πλήθους Διαδηλώσεων Τεμπών",
  description: "Εφαρμογή εκτίμησης και οπτικοποίησης πλήθους στις διαδηλώσεις για το δυστύχημα των Τεμπών.",
  keywords: ["Τέμπη", "διαδηλώσεις", "υπολογισμός πλήθους", "συγκεντρώσεις", "Ελλάδα", "δικαιοσύνη", "σιδηροδρομικό δυστύχημα", "πορείες"],
  authors: [{ name: "Giorgos Iliopoulos" }],
  creator: "Giorgos Iliopoulos",
  openGraph: {
    title: "ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ | Εκτίμηση Πλήθους Διαδηλώσεων Τεμπών",
    description: "Εφαρμογή εκτίμησης πλήθους στις διαδηλώσεις για το δυστύχημα των Τεμπών με χρήση χαρτών και διαδραστικών εργαλείων.",
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ | Χαρτογράφηση Διαδηλώσεων Τεμπών",
    description: "Αναλυτικά δεδομένα και οπτικοποίηση πλήθους για τις διαδηλώσεις του δυστυχήματος των Τεμπών",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  category: "civic-tech",
  applicationName: "Τέμπη Crowd Estimation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}