<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container flex max-auto justify-between p-4">
        <nuxt-link to="/" class="font-bold">Basebone Assessment</nuxt-link>
        <ul class="flex gap-4">
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/categories">Categories</nuxt-link></li>
          <li><nuxt-link to="/items" class="btn">Items</nuxt-link></li>
        </ul>
      </nav>
    </header>

    <!-- Output page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
