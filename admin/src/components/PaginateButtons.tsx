import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";

type paginatedProps = {
  onBack: () => void;
  onForward: () => void;
  currentPage: number;
  totalPage: number;
};

export default function PaginateButtons({
  onBack,
  onForward,
  currentPage,
  totalPage,
}: paginatedProps) {
  return (
    <div
      dir="ltr"
      className="flex  gap-6 items-center justify-center w-fit p-2 bg-neutral-800 rounded-md mt-2"
    >
      <button
        disabled={currentPage === 1}
        onClick={onBack}
        className="p-2 size-8 bg-neutral-700 rounded-lg cursor-pointer transition hover:opacity-50"
      >
        <IoCaretBackOutline />
      </button>
      <div className="p-2 flex items-center justify-center size-8 bg-neutral-700 rounded-lg ">
        <span>{currentPage}</span>
      </div>
      <button
        disabled={currentPage === totalPage}
        onClick={onForward}
        className="p-2 size-8 bg-neutral-700 rounded-lg cursor-pointer transition hover:opacity-50"
      >
        <IoCaretForwardOutline />
      </button>
    </div>
  );
}
