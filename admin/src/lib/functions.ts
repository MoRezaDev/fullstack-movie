import { AnimeType, movieType, PostType, SeriesType } from "../common/types";

export function getPaginatedData(
  data: movieType[] | SeriesType[] | AnimeType[] | PostType[],
  itemsPerPage: number = 5,
  currentPage: number = 1
) {
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
