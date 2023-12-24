import { defineStore } from "pinia";
import { useGetPageTable } from "~/lib/composables";
import { getPageTable } from "~/lib/api";

export const useNotesStore = defineStore("notes", {
  state: () => {
    return {
      notes: [],
      categories: [],
    };
  },
  getters: {
    getNotes: async (state) => {
      if (state.notes.length !== 0) {
        return state.notes;
      }
      return await getPageTable("619787c75b60479886c147cf746bfbb8");
    },
    getCategory: async (state) => {
      if (state.categories.length !== 0) {
        return state.categories;
      }
      const pageTable = useGetPageTable("619787c75b60479886c147cf746bfbb8");
      const uniqueClass = new Set();
      if (pageTable.value) {
        pageTable.value.forEach((item) => {
          uniqueClass.add(item.class);
        });
      }
      return Array.from(uniqueClass).sort((a, b) => a.localeCompare(b));
    },
  },
  persist: {
    storage: persistedState.cookies,
  },
});
