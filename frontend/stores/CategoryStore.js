import axios from "../config/apiConfig";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
    serverRequestLoading: false,
  }),
  getters: {
    allCategories: (state) => {
      return state.categories;
    },
    loading: (state) => {
      return state.serverRequestLoading;
    },
  },
  actions: {
    async createCategory(payload) {
      this.serverRequestLoading = true;
      try {
        const serverRequest = await axios.post(`/categories`, payload);
        console.log({ serverRequest });
      } catch (errorDetails) {}
      this.serverRequestLoading = false;
    },
  },
});
