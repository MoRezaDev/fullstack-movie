export default function UpdateInputWrapper({
  label,
  defaultValue = "",
  disabled = false,
}: {
  label: string;
  defaultValue: string | number | undefined;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type="text"
        className={`bg-neutral-800 rounded-md py-1 px-2 outline-none ${
          disabled && "text-gray-600"
        }`}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
}
