import axios, { backendErrorParser } from "../config/apiConfig";
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
      try {
        const { data: response } = await axios.get(`/categories`);
        this.categories = response.data || [];
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async createCategory(payload) {
      try {
        const { data: response } = await axios.post(`/categories`, payload);
        this.categories.push(response.data);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async updateCategory(payload) {
      try {
        await axios.put(`/categories/${payload.id}`, payload);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`/categories/${id}`);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
  },
});
