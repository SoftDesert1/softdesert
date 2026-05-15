import type { Metadata }
from "next";

import DynamicBackground
from "@/components/background/DynamicBackground";

import BackgroundParticles
from "@/components/background/BackgroundParticles";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { MainLayout }
from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({

    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata:
  Metadata = {

  title: "SoftDesert",

  description:
    "Black Desert Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body className="min-h-full">

        <DynamicBackground />

        <BackgroundParticles />

        <MainLayout>

          {children}

        </MainLayout>

      </body>

    </html>
  );
}