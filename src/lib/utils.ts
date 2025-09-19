import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildGitHubSearchUrl({
  query,
  itemsPerPage,
  sortBy,
  orderBy,
  page,
}: {
  query: string;
  itemsPerPage?: number;
  sortBy?: string;
  orderBy?: string;
  page?: number;
}) {
  const url = new URL("https://api.github.com/search/repositories");
  const params = url.searchParams;

  if (query) params.set("q", query);
  if (itemsPerPage) params.set("per_page", itemsPerPage.toString());
  if (sortBy) params.set("sort", sortBy);
  if (orderBy) params.set("order", orderBy);
  if (page) params.set("page", page.toString());

  return url.toString();
}
