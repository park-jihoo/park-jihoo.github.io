import { cache } from "react";
import { Octokit } from "@octokit/rest";
import { NotionAPI } from "notion-client";

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

export const getAlgorithmParams = cache( (algorithms) => {
  const params = [];
  for (const algorithm of algorithms) {
    const path = algorithm.path
      .split(".")
      .slice(0, algorithm.path.split(".").length - 1)
      .join(".");
    const platform = path.split("/")[0];
    const difficulty = path.split("/")[1];
    const slug = path.split("/")[2];
    params.push({
      platform: encodeURIComponent(platform),
      difficulty: encodeURIComponent(difficulty),
      slug: encodeURIComponent(slug),
    });
    params.push({
      platform,
      difficulty,
      slug,
    });
  }
  return params;
});