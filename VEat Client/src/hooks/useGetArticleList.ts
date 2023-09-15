import { useQuery } from "@tanstack/react-query";
import { fetchArticlesList } from "../api/restaurant";

export function useGetArticleList(articleIdList: string[]) {
    return useQuery(["get-article-list"], () => fetchArticlesList(articleIdList), { enabled: (articleIdList !== undefined && articleIdList.length > 0) });
}
