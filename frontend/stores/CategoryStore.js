import axios, { noConnection } from "../config/apiConfig";
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
      return state.categories.copyWithin(5, 0);
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
        if (Object.keys(errorDetails).length < 1) {
          errorDetails = noConnection;
        }
        this.hasError = true;
        this.error = errorDetails;
        const errorMessage =
          errorDetails.error ||
          errorDetails.message ||
          errorDetails.description;
        throw createError({
          statusCode: errorDetails.status_code,
          statusMessage: errorMessage,
        });
      }
      this.serverRequestLoading = false;
    },
    async createCategory(payload) {
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.post(`/categories`, payload);
        this.categories.push(response.data);
      } catch (errorDetails) {
        if (Object.keys(errorDetails).length < 1) {
          errorDetails = noConnection;
        }
        this.hasError = true;
        this.error = errorDetails;
        const errorMessage =
          errorDetails.error ||
          errorDetails.message ||
          errorDetails.description;
        throw createError({
          statusCode: errorDetails.status_code,
          statusMessage: errorMessage,
        });
      }
      this.serverRequestLoading = false;
    },
  },
});
