import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTranslatedGenres(genre: string[]) {
  console.log("genres", genre);
  const translationMap: Record<string, string> = {
    action: "اکشن",
    comedy: "کمدی",
    drama: "درام",
    fantasy: "فانتزی",
    horror: "ترسناک",
    romance: "عاشقانه",
    "sci-fi": "علمی-تخیلی",
    thriller: "هیجانی",
    adventure: "ماجراجویی",
    animation: "انیمیشن",
    mystery: "معمایی",
    crime: "جنایی",
    documentary: "مستند",
    family: "خانوادگی",
    history: "تاریخی",
    music: "موزیک",
    war: "جنگی",
    western: "وسترن",
  };

  return genre.map((g) => {
    const lower = g.toLowerCase();
    return {
      genre: g,
      translated: translationMap[lower] ?? g, // fallback to original if not found
      link: `/content/genre/${lower}`,
    };
  });
}

export function getTranslatedCountries(countries: string[]) {
  const translationMap: Record<string, string> = {
    usa: "آمریکا",
    uk: "انگلیس",
    france: "فرانسه",
    germany: "آلمان",
    italy: "ایتالیا",
    spain: "اسپانیا",
    russia: "روسیه",
    china: "چین",
    japan: "ژاپن",
    india: "هند",
    iran: "ایران",
    canada: "کانادا",
    australia: "استرالیا",
    brazil: "برزیل",
    mexico: "مکزیک",
    turkey: "ترکیه",
    korea: "کره",
    egypt: "مصر",
    sweden: "سوئد",
    norway: "نروژ",
  };

  return countries.map((c) => {
    const lower = c.toLowerCase();
    return {
      country: c,
      translated: translationMap[lower] ?? c,
      link: `/country/${lower}`,
    };
  });
}
