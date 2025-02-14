interface Todo {
  id: string
  title: string
  completed: boolean
}

const BASE_URL = 'http://localhost:3000'

const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`)
  return response.json()
}

const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  return response.json()
}

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  return response.json()
}

export { getAllTodos, createTodo, updateTodo }
export type { Todo }
