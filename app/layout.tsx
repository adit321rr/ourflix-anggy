import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OurFlix | Happy Birthday Anggy! 🎉",
  description: "Sebuah perjalanan visual merayakan hari spesialmu. Dibuat khusus hanya untukmu.",
  openGraph: {
    title: "🍿 Tiket VIP OurFlix: Khusus Anggy",
    description: "Ada kejutan dan pesan rahasia buat kamu di sini. Buruan buka ya sayang! ❤️",
    images: [
      {
        url: "https://qusvxxdfnqlahvxaqylt.supabase.co/storage/v1/object/public/ourflix-media/profil/Anggy-profile.jpg",
        width: 1200,
        height: 630,
        alt: "OurFlix Special Ticket",
      },
    ],
  },
}; // <-- NAH, TADI KAMU KURANG TANDA TUTUP KURUNG INI

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}