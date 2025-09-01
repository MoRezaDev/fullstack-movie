import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { getContents } from "@/lib/client-api";

export function useContentSearch(searchValue: string) {
  const debouncedValue = useDebounce(searchValue, 800);

  return useQuery({
    queryKey: ["searchContent", debouncedValue],
    queryFn: () => getContents(debouncedValue),
    enabled: !!debouncedValue,
  });
}
