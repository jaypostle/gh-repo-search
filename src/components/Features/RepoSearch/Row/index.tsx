import { Card } from "@components/ui/card";
import type { GithubRepository } from "../../../../models/github";

function RepoRow({ repo }: { repo: GithubRepository }) {
  return (
    <Card className="p-4 flex flex-col gap-1 items-start">
      <a
        className="font-bold text-lg text-blue-600 hover:underline"
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {repo.name}
      </a>
      <span>{repo.description}</span>
      <span className="flex gap-4 font-medium text-sm text-gray-400">
        <span>{repo.stargazers_count} stars</span>
        <span>Updated on {repo.updated_at}</span>
      </span>
    </Card>
  );
}

export default RepoRow;
