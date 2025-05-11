import { getSession } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
  });
}
