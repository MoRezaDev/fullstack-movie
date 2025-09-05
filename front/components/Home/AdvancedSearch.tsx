"use client";

import {
  countryOptions,
  dubbedOptions,
  genreOptions,
  scoreOptions,
} from "@/lib/react-select.data";
import { useState } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";

const selectStyles: StylesConfig<
  {
    value: string;
    label: string;
  },
  false,
  GroupBase<{
    value: string;
    label: string;
  }>
> = {
  control: (baseStyles, state) => ({
    width: "100%",
    ...baseStyles,
    backgroundColor: "#171717",
    padding: "4px 10px",
    borderColor: state.isFocused ? "#444" : "#222", // custom border
    boxShadow: state.isFocused ? "none" : "none", // kill blue outline
    "&:hover": {
      borderColor: state.isFocused ? "#555" : "#333", // hover overrides
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#171717",
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    height: "200px",
    padding: "6px",
    animation: "fade 0.3s ease-in-out",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#888 #171717",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#ffffff", // 👈 custom placeholder color
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff", // 👈 selected value text color
    fontWeight: 500,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#2563eb" // Tailwind blue-600 on hover
      : state.isSelected
      ? "#1e3a8a" // Tailwind blue-900 when selected
      : "#171717", // default bg
    color: state.isFocused || state.isSelected ? "white" : "#e5e5e5",
    cursor: "pointer",
    borderRadius: "4px",
  }),
};

type selectedType = {
  genre: { label: string; value: string } | null;
  country: { label: string; value: string } | null;
  score: { label: string; value: string } | null;
  is_dubbed: { label: string; value: string } | null;
};

export default function AdvancedSearch() {
  const [selected, setSelected] = useState<selectedType>({
    genre: null,
    country: null,
    score: null,
    is_dubbed: null,
  });

  return (
    <form method="GET" action="/content/s">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-2  p-4 w-[90%] max-w-[1200px] mx-auto bg-neutral-800 rounded-lg xl:flex h-[150px] sm:h-auto overflow-y-auto sm:overflow-visible">
        <div className="p-4 sm:col-span-2 w-full xl:w-fit   bg-neutral-900 rounded-md flex gap-2 text-xs ">
          {/* Movie */}
          <label className="cursor-pointer">
            <input
              className="hidden peer"
              type="radio"
              name="type"
              value="movie"
              defaultChecked
            />
            <span className="px-4 py-2 rounded-full transition-colors duration-300  peer-checked:bg-blue-500 peer-checked:text-white">
              فیلم
            </span>
          </label>

          {/* Series */}
          <label className="cursor-pointer">
            <input
              className="hidden peer"
              type="radio"
              name="type"
              value="series"
            />
            <span className="px-4 py-2 rounded-full transition-colors duration-300  peer-checked:bg-blue-500 peer-checked:text-white">
              سریال
            </span>
          </label>

          {/* Anime */}
          <label className="cursor-pointer">
            <input
              className="hidden peer"
              type="radio"
              name="type"
              value="anime"
            />
            <span className="px-4 py-2 rounded-full transition-colors duration-300  peer-checked:bg-blue-500 peer-checked:text-white">
              انیمه
            </span>
          </label>
        </div>

        {/* Select-options State */}
        <Select
          className="grow"
          styles={selectStyles}
          options={genreOptions}
          placeholder="ژانر"
          value={selected.genre}
          instanceId={1}
          onChange={(option) =>
            setSelected((prev) => ({ ...prev, genre: option }))
          }
        />
        <Select
          className="grow"
          styles={selectStyles}
          options={countryOptions}
          placeholder="کشور"
          instanceId={2}
          onChange={(option) =>
            setSelected((prev) => ({ ...prev, country: option }))
          }
        />
        <Select
          className="grow"
          styles={selectStyles}
          options={scoreOptions}
          placeholder="امتیاز"
          instanceId={3}
          onChange={(option) =>
            setSelected((prev) => ({ ...prev, score: option }))
          }
        />
        <Select
          className="grow"
          styles={selectStyles}
          options={dubbedOptions}
          placeholder="دوبله"
          instanceId={4}
          onChange={(option) =>
            setSelected((prev) => ({ ...prev, is_dubbed: option }))
          }
        />

        {/* Year section */}
        <div className="bg-neutral-900 sm:col-span-2 p-2 rounded-sm flex items-center gap-2  ">
          <div className="flex gap-1 items-center">
            <label>از</label>
            <input
              placeholder="سال تولید"
              name="year_from"
              type="number"
              className="outline-none bg-neutral-800 rounded-md p-1 w-[80px] placeholder:text-xs"
            />
          </div>
          <div className="flex gap-1 items-center">
            <label>تا</label>
            <input
              placeholder="سال"
              name="year_to"
              className="outline-none bg-neutral-800 rounded-md p-1 w-[80px] placeholder:text-xs"
              type="number"
            />
          </div>
        </div>

        {/* hidden inputs for select */}
        {selected &&
          Object.entries(selected).map(([key, item]) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={item?.value || ""}
            />
          ))}

        <button className="bg-violet-600 px-4 py-2 rounded-md transition-opacity hover:opacity-70 cursor-pointer">
          جستجو
        </button>
      </div>
    </form>
  );
}
