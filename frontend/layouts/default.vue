<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container flex max-auto justify-between p-4">
        <nuxt-link to="/" class="font-bold btn"
          ><Icon
            name="line-md:coffee-twotone-loop"
            class="text-3xl text-green-900 pr-2"
          />Basebone Assessment</nuxt-link
        >
        <ul class="flex gap-4">
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/categories">Categories</nuxt-link></li>
          <li><nuxt-link to="/items">Items</nuxt-link></li>
        </ul>
      </nav>
    </header>

    <!-- Output page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>
