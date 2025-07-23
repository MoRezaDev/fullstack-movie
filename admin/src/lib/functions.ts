import { movieType } from "../common/types";

export function getPaginatedData(
  data: movieType[],
  itemsPerPage: number = 5,
  currentPage: number = 1
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentMovies = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentMovies, totalPages, currentPage };
}
