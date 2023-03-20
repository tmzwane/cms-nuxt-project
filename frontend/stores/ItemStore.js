import axios, { backendErrorParser } from "../config/apiConfig";
import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
    itemTypes: ["Text", "Image", "Audio", "Video", "Game"],
    itemQualities: ["Low", "Medium", "High"],
    sizeUnits: ["B", "KB", "MB", "GB", "TB", "PB", "EB"],
    serverRequestLoading: false,
    hasError: false,
    error: null,
  }),
  getters: {
    allItems: (state) => {
      return state.items;
    },
    recentItems: (state) => {
      return state.items.copyWithin(5, 0);
    },
    itemsLoading: (state) => {
      return state.serverRequestLoading;
    },
    itemsHasError: (state) => {
      return state.hasError;
    },
    itemsError: (state) => {
      return state.error;
    },
  },
  actions: {
    async retrieveItems() {
      try {
        const { data: response } = await axios.get(`/items`);
        this.items = response.data || [];
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async createItem(payload) {
      try {
        const { data: response } = await axios.post(`items`, payload);
        this.items.push(response.data);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async updateItem(payload) {
      try {
        const { data: response } = await axios.put(
          `items/${payload.id}`,
          payload
        );
        this.items.push(response.data);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/items/${id}`);
      } catch (errorDetails) {
        backendErrorParser(errorDetails);
      }
    },
  },
});
