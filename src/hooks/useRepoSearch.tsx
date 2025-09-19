import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { GithubSearchResponse } from "@models/github";
import { buildGitHubSearchUrl } from "@lib/utils";

export default function useRepoSearch(
  query: string | undefined,
  itemsPerPage?: number,
  sortBy?: string,
  orderBy?: string,
  page?: number
) {
  return useQuery<GithubSearchResponse>({
    queryKey: ["repoData", query, itemsPerPage, sortBy, orderBy, page],
    queryFn: async () => {
      // Can turn this into an api func in /api folder later

      const url = buildGitHubSearchUrl({
        query: query!,
        itemsPerPage,
        sortBy,
        orderBy,
        page,
      });
      const response = await fetch(url, {
        headers: {
          "User-Agent": "jpostle",
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
      return (await response.json()) as GithubSearchResponse;
    },
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
}
