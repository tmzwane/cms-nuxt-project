import axios from "../config/apiConfig";
import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [
      {
        id: "123",
        locale: {
          title: "Test Title 1",
          description: "Test title one description",
        },
      },
    ],
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
      return state.items.splice(0, 5);
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
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.get(`/items`);
        this.items = response.data || [];
      } catch (errorDetails) {
        this.hasError = true;
        this.error = errorDetails;
      }
      this.serverRequestLoading = false;
    },
    async createItem(payload) {
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.post(`items`, payload);
        this.items.push(response.data);
      } catch (errorDetails) {
        this.hasError = true;
        this.error = errorDetails;
      }
      this.serverRequestLoading = false;
    },
  },
});
