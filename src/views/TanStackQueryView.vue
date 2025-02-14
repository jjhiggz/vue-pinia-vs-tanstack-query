<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from '@/composables/useTodos'

const { todos, isLoading, error, addTodo, isAddingTodo, toggleTodo, deleteTodo } = useTodos()
const newTodoTitle = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  if (newTodoTitle.value.trim()) {
    addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = ''
  }
}
</script>

<template>
  <div class="py-8">
    <div class="mx-auto max-w-3xl">
      <h1 class="mb-6 font-bold text-gray-900 text-3xl">Todo App with TanStack Query</h1>

      <!-- Error Alert -->
      <div v-if="error" class="bg-red-50 mb-4 p-4 rounded-md text-red-700">
        {{ error }}
      </div>

      <!-- Add Todo Form -->
      <form @submit="handleSubmit" class="mb-6">
        <div class="flex gap-4">
          <input
            v-model="newTodoTitle"
            type="text"
            placeholder="Add a new todo..."
            class="flex-1 shadow-sm border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500"
            :disabled="isAddingTodo"
          />
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white"
            :disabled="isAddingTodo || !newTodoTitle.trim()"
          >
            {{ isAddingTodo ? 'Adding...' : 'Add Todo' }}
          </button>
        </div>
      </form>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center my-8">
        <div class="border-indigo-600 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
      </div>

      <!-- Todo List -->
      <div v-else-if="todos" class="bg-white shadow sm:rounded-lg divide-y">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="group flex items-center gap-4 hover:bg-gray-50 p-4"
        >
          <button @click="toggleTodo(todo)" class="flex items-center">
            <div
              class="flex justify-center items-center border-2 rounded w-5 h-5"
              :class="[
                todo.completed
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'border-gray-300 group-hover:border-indigo-500',
              ]"
            >
              <svg
                v-if="todo.completed"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </button>

          <span class="flex-1" :class="{ 'line-through text-gray-400': todo.completed }">
            {{ todo.title }}
          </span>

          <button
            @click="deleteTodo(todo.id)"
            class="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-opacity"
            :disabled="isDeletingTodo"
            title="Delete todo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!isLoading && (!todos || todos.length === 0)"
        class="bg-white shadow py-12 sm:rounded-lg text-center"
      >
        <p class="text-gray-500">No todos yet. Add one above!</p>
      </div>
    </div>
  </div>
</template>
