import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '@/api/todos'
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '@/api/todos'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTodos = async () => {
    isLoading.value = true
    error.value = null
    try {
      todos.value = await getAllTodos()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch todos'
    } finally {
      isLoading.value = false
    }
  }

  const addTodo = async (title: string) => {
    isLoading.value = true
    error.value = null
    try {
      const newTodo = await createTodo({ title, completed: false })
      todos.value.push(newTodo)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add todo'
    } finally {
      isLoading.value = false
    }
  }

  const toggleTodo = async (todo: Todo) => {
    isLoading.value = true
    error.value = null
    try {
      const updatedTodo = await updateTodo({
        ...todo,
        completed: !todo.completed,
      })
      const index = todos.value.findIndex((t) => t.id === updatedTodo.id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update todo'
    } finally {
      isLoading.value = false
    }
  }

  const removeTodo = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      await deleteTodo(id)
      todos.value = todos.value.filter((todo) => todo.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete todo'
    } finally {
      isLoading.value = false
    }
  }

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
  }
})
