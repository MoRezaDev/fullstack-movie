export default function MainCard({ data }: { data: any }) {
  return (
    <div className="p-4 bg-neutral-800 rounded-md">
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="w-[190px] h-[270px]">
            <img
              className="size-full object-cover rounded-md"
              src={data[0].content.poster}
            />
          </div>
          <div className="py-2 px-4 rounded-md bg-blue-600 text-center w-fit">
            مشاهده تریلر
          </div>
        </div>

        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
