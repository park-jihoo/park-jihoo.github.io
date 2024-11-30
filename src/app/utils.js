import { cache } from "react";

export const getAlgorithms = cache(async () => {
  const alg_json_link =
    "https://raw.githubusercontent.com/park-jihoo/Algorithm/main/algorithms.json";
  const response = await fetch(alg_json_link);
  const algorithms = await response.text();
  return JSON.parse(algorithms);
});

export const getAlgorithmParams = cache((algorithms) => {
  const params = [];
  for (const algorithm of algorithms) {
    const path = algorithm.slug;
    const platform = path.split("/")[0];
    const difficulty = path.split("/")[1];
    const slug = path.split("/")[2];
    // params.push({
    //   platform: encodeURIComponent(platform),
    //   difficulty: encodeURIComponent(difficulty),
    //   slug: encodeURIComponent(slug),
    // });
    params.push({
      platform,
      difficulty,
      slug,
    });
  }
  return params;
});
