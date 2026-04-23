import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// DI SINI KITA MENGUBAH TAMPILAN LINK WHATSAPP-NYA!
export const metadata: Metadata = {
  title: "OurFlix | Happy Birthday Anggy! 🎉",
  description: "Sebuah perjalanan visual merayakan hari spesialmu. Dibuat khusus hanya untukmu.",
  openGraph: {
    title: "🍿 Tiket VIP OurFlix: Khusus Anggy",
    description: "Ada kejutan dan pesan rahasia buat kamu di sini. Buruan buka ya sayang! ❤️",
    images: [
      {
        // Ini akan jadi foto yang muncul di WhatsApp (Saya pakai foto profil Anggy)
        url: "https://qusvxxdfnqlahvxaqylt.supabase.co/storage/v1/object/public/ourflix-media/profil/Anggy-profile.jpg",
        width: 1200,
        height: 630,
        alt: "OurFlix Special Ticket",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}