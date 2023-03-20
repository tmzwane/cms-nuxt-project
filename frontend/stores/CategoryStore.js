import axios from "../config/apiConfig";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
    serverRequestLoading: false,
    hasError: false,
    error: null,
  }),
  getters: {
    allCategories: (state) => {
      return state.categories;
    },
    recentCategories: (state) => {
      return state.categories.splice(0, 5);
    },
    categoriesLoading: (state) => {
      return state.serverRequestLoading;
    },
    categoriesHasError: (state) => {
      return state.hasError;
    },
    categoriesError: (state) => {
      return state.error;
    },
  },
  actions: {
    async retrieveCategories() {
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.get(`/categories`);
        this.categories = response.data || [];
      } catch (errorDetails) {
        this.hasError = true;
        this.error = errorDetails;
      }
      this.serverRequestLoading = false;
    },
    async createCategory(payload) {
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.post(`/categories`, payload);
        this.categories.push(response.data);
      } catch (errorDetails) {
        this.hasError = true;
        this.error = errorDetails;
      }
      this.serverRequestLoading = false;
    },
  },
});
