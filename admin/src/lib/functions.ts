import clsx from "clsx";
import { ClassValue } from "clsx";
import {twMerge} from 'tailwind-merge'


export function getPaginatedData<T>(
  data: T[],
  itemsPerPage: number = 5,
  currentPage: number = 1
) {
  if (!data || !Array.isArray(data))
    return { currentContent: [], currentPage: "", totalPages: 0 };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentContent = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentContent, totalPages, currentPage };
}

//helper function for CreatePost Data object
export function createPostDto(
  formData: FormData,
  content: string,
  downloadsLink: any[],
  originalId: string
) {
  const raw = Object.fromEntries(formData.entries());

  console.log("tt", downloadsLink);

  const downloadsLinkObj = {
    create: downloadsLink,
  };

  return {
    title: raw.title?.toString().trim() || "",
    extra_info: raw.extra_info?.toString() || "",
    download_info: raw.download_info?.toString() || "",
    description: raw.description?.toString() || "",
    is_premium: raw.is_premium === "true",
    slug: raw.title?.toString().trim().replace(/\s+/g, "-").toLowerCase(),
    download_links: downloadsLinkObj,
    id: originalId,
    content,
  };
}


export function cn(...inputs : ClassValue[]) {
  return twMerge(clsx(inputs))
}
