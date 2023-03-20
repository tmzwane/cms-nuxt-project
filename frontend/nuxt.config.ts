// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  runtimeConfig: {
    // Public envs that are exposed to the client
    public: {
      apiBase: process.env.NUXT_API_BASE_URL || "http://localhost:5000/api",
    },
  },
});
