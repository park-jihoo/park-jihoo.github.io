import { defineStore } from "pinia";
import { useGetPageTable } from "~/lib/composables";
import { getPageTable } from "~/lib/api";

export const useNotesStore = defineStore("notes", {
  state: () => {
    return {
      notes: [],
    };
  },
  getters: {
    getNotes: async (state) => {
      if (state.notes.length !== 0) {
        return state.notes;
      }
      return await getPageTable("619787c75b60479886c147cf746bfbb8");
    }
  },
  persist: {
    storage: persistedState.cookies,
  }
});