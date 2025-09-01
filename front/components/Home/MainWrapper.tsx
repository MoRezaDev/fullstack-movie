import MainContent from "./MainContent";
import SideSection from "./Side-Section/SideSection";

export default function MainWrapper() {
  return (
    <section className="w-[90%]  max-w-[1200px] mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="">
        <SideSection />
      </div>
      <div className="col-span-2">
        <MainContent />
      </div>
    </section>
  );
}
