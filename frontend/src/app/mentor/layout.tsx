import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./sideber";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex bg-gray-50 ${inter.className}`}>
        <Sidebar />
        <main className="flex-1 p-6 bg-white text-black font-bold">
          {children}
        </main>
      </body>
    </html>
  );
}