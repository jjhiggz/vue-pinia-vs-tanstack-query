import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '@/api/todos'
import type { Todo } from '@/api/todos'

export function useTodos() {
  const queryClient = useQueryClient()

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  })

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => createTodo({ title, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Todo) =>
      updateTodo({
        ...todo,
        completed: !todo.completed,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return {
    todos: todosQuery.data,
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    addTodo: addTodoMutation.mutate,
    isAddingTodo: addTodoMutation.isPending,
    toggleTodo: toggleTodoMutation.mutate,
    isTogglingTodo: toggleTodoMutation.isPending,
    deleteTodo: deleteTodoMutation.mutate,
    isDeletingTodo: deleteTodoMutation.isPending,
  }
}
