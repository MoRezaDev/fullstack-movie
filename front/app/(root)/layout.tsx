import Navbar from "@/components/Navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ممل مووی | دانلود انیمه، دانلود سریال، دانلود فیلم، دانلود بدون سانسور",
  description:
    "ممل فیلم دانلوو جدیدترین فیلم ها و سریال ها و انیمه های بدون سانسور با لینک مستقیم",
  robots: "index,follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-[62px] bg-neutral-900 text-white text-sm">
      <Navbar />
      <section className="min-h-[calc(100vh-65px)]">{children}</section>
    </main>
  );
}
