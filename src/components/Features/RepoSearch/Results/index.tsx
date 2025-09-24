import type { GithubSearchResponse } from "@models/github";
import RepoRow from "../Row";

function Results({
  data,
  isLoading,
  error,
}: {
  data: GithubSearchResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}) {
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return data?.items.map((repo) => <RepoRow key={repo.id} repo={repo} />);
}

export default Results;
