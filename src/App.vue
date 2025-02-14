<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <header class="top-0 z-50 fixed bg-white shadow-sm w-full">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <img alt="Vue logo" class="w-8 h-8" src="@/assets/logo.svg" />
            <span class="ml-3 font-semibold text-gray-900 text-xl">Vue App</span>
          </div>

          <!-- Navigation -->
          <nav class="flex space-x-4">
            <RouterLink
              to="/"
              class="hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors"
              active-class="bg-gray-100 text-gray-900"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/pinia"
              class="hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors"
              active-class="bg-gray-100 text-gray-900"
            >
              Pinia
            </RouterLink>
            <RouterLink
              to="/tanstack-query"
              class="hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors"
              active-class="bg-gray-100 text-gray-900"
            >
              TanStack Query
            </RouterLink>
            <RouterLink
              to="/about"
              class="hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors"
              active-class="bg-gray-100 text-gray-900"
            >
              About
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content with padding for fixed header -->
    <main class="mx-auto px-4 sm:px-6 lg:px-8 pt-20 max-w-7xl">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}
</style>
