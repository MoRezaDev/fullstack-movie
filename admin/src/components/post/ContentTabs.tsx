// ContentTabs.tsx
import clsx from "clsx";

type ContentType = "movie" | "anime" | "series";

interface Props {
  content: ContentType;
  setContent: (val: ContentType) => void;
  tabs: ContentType[];
}

export default function ContentTabs({ content, setContent, tabs }: Props) {
  return (
    <div className="w-full flex justify-center ">
      <div className="inline-flex items-center justify-center gap-2 bg-zinc-800 p-1 rounded-full shadow-md">
        {tabs.map((tab) => {
          const isActive = content === tab;
          return (
            <button
              key={tab}
              onClick={() => setContent(tab)}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium capitalize rounded-full transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-300 hover:bg-zinc-700"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
