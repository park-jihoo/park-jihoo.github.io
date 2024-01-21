import { cache } from "react";
import { Octokit } from "@octokit/rest";

export const getAlgorithms = cache(async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const algorithm = await octokit.git.getTree({
    owner: "park-jihoo",
    repo: "Algorithm",
    tree_sha: "main",
    recursive: 1,
  });

  return algorithm.data.tree.filter(
    (item) =>
      item.type === "blob" &&
      ["leetcode", "프로그래머스", "백준"].includes(item.path.split("/")[0]) &&
      !item.path.includes(".md"),
  );
});
