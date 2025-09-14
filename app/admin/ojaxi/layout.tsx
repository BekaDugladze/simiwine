import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ოჯახი – აპლიკაცია || Zrunva.org",
  openGraph: {
    title: "კითხვარი || Zrunva.org",
    description:
      "საქართველოში საოჯახო ზრუნვის შრომა ამ დრომდე არაფორმალური შრომაა...",
    url: "https://zrunva.netlify.app/", // ✅ replace with your real Netlify domain or custom domain
    siteName: "Zrunva.org",
    images: [
      {
        url: "https://zrunva.netlify.app/vakansia.jpg", // ✅ upload an image to /public and use full URL
        width: 1200,
        height: 630,
        alt: "zrunva.netlify.app Preview",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={inter.className}>{children}</div>
  );
}
