<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container flex max-auto justify-between p-4">
        <nuxt-link to="/" class="font-bold btn">Basebone Assessment</nuxt-link>
        <nuxt-link to="/categories" class="font-bold">All Categories</nuxt-link>
      </nav>
    </header>

    <!-- Output page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>

    <footer class="container flex mx-auto justify-between border-t-2 p-4">
      <ul class="flex gap-4">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/categories">Categories</nuxt-link></li>
        <li><nuxt-link to="/items">Items</nuxt-link></li>
      </ul>
    </footer>
  </div>
</template>
