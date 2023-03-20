import axios, { noConnection } from "../config/apiConfig";
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
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.get(`/items`);
        this.items = response.data || [];
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
    async createItem(payload) {
      this.serverRequestLoading = true;
      try {
        const { data: response } = await axios.post(`items`, payload);
        this.items.push(response.data);
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
