import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "კითხვარი || Zrunva.org",
  description: "საქართველოში საოჯახო ზრუნვის შრომა ამ დრომდე არაფორმალური შრომაა. ჩვენი ერთობაც არაფორმალურად დაიწყო 2021 წლის 29 მაისს , როცა თბილისში, კიკვიძის სკვერის მედიათეკის შენობაში შევიკრიბეთ. ხოლო უკვე 2023 წელს პროგრესულ ფორუმთან თანამშრომლობით და გაეროს ქალთა ორგანიზაციის მხარდაჭერით შევძელით დაგვეფუძნებინა ძიძების და საოჯახო მშრომელების ასოციაცია და შეგვექმნა უფასო საკონსულტაციო სერვისი, იურიდიული დახმარების სერვისი, სატელეფონო მხარდაჭერის შესაძლებლობა ოჯახში დასაქმებული ქალებისთვის დაგვეწყო საოჯახო შრომის კლვევა და გაგვეჩინა მისი  ცვლილების შესაძლებლობა. ჩვენ სამი რამ გვაერთიანებს: (1) საოჯახო შრო­მის ცოდნა და გამოცდილება (2) სურვილი, ეს სამუშაო უკეთესი გავხადოთ, (3) რწმენა, რომ გაერთიანებით და ერთმანეთის თა­ნადგომით შრომის პირობების ცვლილება შესაძლებელია.თითქმის ყოველ კვირას ვიკრიბებით ცოცხლად ან ვიდეო­ზარის საშუალებით. ჩვენი შეხვედრები ყო­ველთვის ერთმანეთის მხარდამჭერი და საქმიანია.სამსახურის და საოჯახო საქმის მიღმა ძიძებს და საოჯახო მშრომელებს ცოტა თავისუფალი დრო გვრჩება, თუმ­ცა ვცდილობთ, ეს მცირე დრო ერთმანეთის დასახმარებლად, ახალი შესაძლებლობების გაჩენისთვის გამოვიყენოთ.ვსაუბრობთ ჩვენს სამუშაო გარემოზე, ჩვენი შრო­მის - სხვის ოჯახში შრომის სპეციფიკაზე, მის სირთულეებზე და სიკეთეებზე, ჩვენ საჭიროებებზე, რომელსაც ხშირად ვერც სახელმწიფო და ვერც სხვა მხარეები ხედავენ. თუ ხართ საოჯახო მშრომელი, ამ დამოკიდებულებების გჯერათ და ეძებთ თქვენი მსგავსი ყოველდღიურობის მქონე ადამიანების ერთობას, შემოგვიერთდით.",
  openGraph: {
    title: "კითხვარი || Zrunva.org",
    description:
      "საქართველოში საოჯახო ზრუნვის შრომა ამ დრომდე არაფორმალური შრომაა...",
    url: "https://zrunva.netlify.app/", // ✅ replace with your real Netlify domain or custom domain
    siteName: "Zrunva.org",
    images: [
      {
        url: "https://zrunva.netlify.app/favicon.ico", // ✅ upload an image to /public and use full URL
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
    <html lang="en">
      <body className={inter.className}><Suspense>{children}</Suspense></body>
      <SpeedInsights />
    </html>
  );
}
