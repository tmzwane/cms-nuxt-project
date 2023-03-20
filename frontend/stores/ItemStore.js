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
  }),
  getters: {
    allItems: (state) => {
      return state.items;
    },
  },
  actions: {
    async createItem(payload) {
      this.serverRequestLoading = true;
      try {
        const serverRequest = await axios.post(
          `${this.address}/items`,
          payload
        );
        console.log({ serverRequest });
      } catch (errorDetails) {}
      this.serverRequestLoading = false;
    },
  },
});
