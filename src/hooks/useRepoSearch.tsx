import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { GithubSearchResponse } from "@models/github";

// function buildGitHubSearchUrl({
//   query,
//   itemsPerPage,
//   sortBy,
//   orderBy,
//   page,
// }: {
//   query: string;
//   itemsPerPage?: number;
//   sortBy?: string;
//   orderBy?: string;
//   page?: number;
// }) {
//   // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
//   // const fasterParams = new URLSearchParams({q: params.searchQuery, page: params.page.toString(), per_page: params.perPage.toString(), sort: params.sortOrder})
//   const url = new URL("https://api.github.com/search/repositories");
//   const params = url.searchParams;

//   if (query) params.set("q", query);
//   if (itemsPerPage) params.set("per_page", itemsPerPage.toString());
//   if (sortBy) params.set("sort", sortBy);
//   if (orderBy) params.set("order", orderBy);
//   if (page) params.set("page", page.toString());

//   return url.toString();
// }

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
      const baseUrl = "https://api.github.com/search/repositories";
      const searchParams = new URLSearchParams({
        q: query!,
        per_page: itemsPerPage?.toString() || "30",
        sort: sortBy || "best match",
        order: orderBy || "desc",
        page: page?.toString() || "1",
      });
      const url = `${baseUrl}?${searchParams.toString()}`;
      console.log({ url });

      // No need for the builder anymore
      // const url = buildGitHubSearchUrl({
      //   query: query!,
      //   itemsPerPage,
      //   sortBy,
      //   orderBy,
      //   page,
      // });
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
      return response.json();
    },
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
}
