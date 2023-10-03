import { defineStore } from 'pinia'

const fetchGithubFiles = async () => {
  try {
    const owner = "park-jihoo";
    const repo = "Algorithm";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const response = await fetch(apiUrl);
    let data = await response.json();
    data = data.tree
      .filter((item) => item.type === "blob")
      .filter(
        (item) =>
          item.path.includes("leetcode")
          || item.path.includes("백준")
          || item.path.includes("프로그래머스")
      )
      .filter((item) => !item.path.includes(".md"));
    return data;
  } catch (error) {
    console.error(error);
  }
};

const filterAndFormatPosts = async (data) => {
  let questions = [];
  for (const item of data) {
    const path = item.path.split("/");
    if (questions.map((item) => item.slug).includes(path[2])) {
      const index = questions.findIndex((question) => question.slug === path[2]);
      questions[index].languages.push(path[3].split(".").pop());
    } else {
      if (path[0] === "leetcode") {
        questions.push({
          id: path[2].split("-")[0],
          slug: path[2],
          name: path[2]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      } else if (path[0] === "백준") {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      } else {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      }
    }
  }
  return questions.sort((a, b) => a.id - b.id);
};

export const useAlgorithmStore = defineStore("algorithm", {
  state: () =>  {
    return {
      questions: [],
      loading: false,
    }
  },
  getters: {
    getQuestions: (state) => state.questions,
  },
  actions: {
    async fetchQuestions() {
      this.loading = true;
      const data = await fetchGithubFiles();
      this.questions = await filterAndFormatPosts(data);
      this.loading = false;
    }
  }
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlgorithmStore, import.meta.hot));
}