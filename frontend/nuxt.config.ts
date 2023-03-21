// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  app: {
    head: {
      title: "Basebone Assessment",
      meta: [
        {
          name: "description",
          content:
            "Nuxt.js and Express.js project created for the technical assessment",
        },
      ],
    },
  },
  runtimeConfig: {
    // Public envs that are exposed to the client
    public: {
      apiBase: process.env.NUXT_API_BASE_URL || "http://localhost:5000/api",
    },
  },
});
