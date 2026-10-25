import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rent-logis.vercel.app/"),
  title: "RentLogi | Industrial & Commercial Equipment Rental",
  description:
    "Explore heavy excavators, compact track loaders, aerial work platforms, and mobile power generators. Request fast commercial rental quotes with verified fleet availability.",
  keywords: [
    "equipment rental",
    "heavy machinery rental",
    "excavator hire",
    "scissor lift rental",
    "skid steer loader",
    "generator rental",
    "construction equipment",
  ],
  openGraph: {
    title:"RentLogis",
    description: "Explore heavy excavators, compact track loaders, aerial work platforms, and mobile power generators. Request fast commercial rental quotes with verified fleet availability.",
    url:"https://rent-logis.vercel.app/",
    siteName:"RentLogis",
    images:[
      {
        url:'/og-image.jpg',
        width:1200,
        height:630,
        alt:'RentLogis site home page'
      }
    ],
    type:'website'
    
  },
  twitter:{
    card:"summary_large_image",
    title:"RentLogis",
    description:"Explore heavy excavators, compact track loaders, aerial work platforms, and mobile power generators. Request fast commercial rental quotes with verified fleet availability.",
    images:['/og-image.jpg']
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fafaf8] text-[#14161a]">
        <Suspense>
        {children}
        </Suspense>
      </body>
    </html>
  );
}
