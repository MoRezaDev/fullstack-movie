import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-[69px] bg-neutral-900 text-white text-sm">
      <Navbar />
      {children}
    </main>
  );
}
