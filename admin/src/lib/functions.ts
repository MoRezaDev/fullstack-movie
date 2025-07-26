import { movieType, SeriesType } from "../common/types";

export function getPaginatedData(
  data: movieType[] | SeriesType[],
  itemsPerPage: number = 5,
  currentPage: number = 1
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentContent = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentContent, totalPages, currentPage };
}
