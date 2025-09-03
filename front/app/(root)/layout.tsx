import Navbar from "@/components/Navbar/Navbar";

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
