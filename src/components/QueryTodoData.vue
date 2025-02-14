<script setup lang="ts">
import { computed } from 'vue'
import { useTodos } from '@/composables/useTodos'

const { todos } = useTodos()

const totalCount = computed(() => todos.value?.length ?? 0)
const completedCount = computed(() => todos.value?.filter((todo) => todo.completed).length ?? 0)
const incompletedCount = computed(() => todos.value?.filter((todo) => !todo.completed).length ?? 0)
const completionRate = computed(() =>
  totalCount.value === 0 ? 0 : Math.round((completedCount.value / totalCount.value) * 100),
)
</script>

<template>
  <div class="bg-white shadow mb-6 p-6 sm:rounded-lg">
    <h2 class="mb-4 font-semibold text-gray-900 text-lg">Todo Statistics</h2>
    <div class="gap-4 grid grid-cols-2 md:grid-cols-4">
      <div class="bg-gray-50 p-4 rounded-md">
        <div class="text-gray-500 text-sm">Total Todos</div>
        <div class="font-bold text-gray-900 text-2xl">{{ totalCount }}</div>
      </div>

      <div class="bg-green-50 p-4 rounded-md">
        <div class="text-green-600 text-sm">Completed</div>
        <div class="font-bold text-green-700 text-2xl">{{ completedCount }}</div>
      </div>

      <div class="bg-blue-50 p-4 rounded-md">
        <div class="text-blue-600 text-sm">Pending</div>
        <div class="font-bold text-blue-700 text-2xl">{{ incompletedCount }}</div>
      </div>

      <div class="bg-indigo-50 p-4 rounded-md">
        <div class="text-indigo-600 text-sm">Completion Rate</div>
        <div class="font-bold text-indigo-700 text-2xl">{{ completionRate }}%</div>
      </div>
    </div>
  </div>
</template>
