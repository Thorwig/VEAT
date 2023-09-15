import { useQuery } from "@tanstack/react-query";
import { fetchMenuById } from "../api/restaurant";

export function useGetMenuById(articleId: string) {
    return useQuery(["get-menu"], () => fetchMenuById(articleId));
}
