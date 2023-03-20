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
  }),
});
