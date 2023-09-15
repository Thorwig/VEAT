import { useQuery } from "@tanstack/react-query";
import { fetchArticleById } from "../api/restaurant";

export function useGetArticleById(articleId: string) {
    return useQuery(["get-article"], () => fetchArticleById(articleId));
}
