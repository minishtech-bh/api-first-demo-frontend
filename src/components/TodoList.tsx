import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
  getGetTodosQueryKey,
} from '../api/generated/todo/todo'
import type { Todo } from '../api/generated/model'

export function TodoList() {
  const queryClient = useQueryClient()
  const [newTitle, setNewTitle] = useState('')

  const { data: response, isLoading } = useGetTodos()
  const todos: Todo[] = response?.data ?? []

  const createMutation = useCreateTodo({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() })
        setNewTitle('')
      },
    },
  })

  const updateMutation = useUpdateTodo({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() })
      },
    },
  })

  const deleteMutation = useDeleteTodo({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() })
      },
    },
  })

  const handleCreate = () => {
    const title = newTitle.trim()
    if (!title) return
    createMutation.mutate({ data: { title } })
  }

  const handleToggle = (todo: Todo) => {
    updateMutation.mutate({
      id: todo.id!,
      data: { title: todo.title!, completed: !todo.completed },
    })
  }

  const handleDelete = (todo: Todo) => {
    deleteMutation.mutate({ id: todo.id! })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Todos</h1>

      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="New todo..."
        />
        <button onClick={handleCreate} disabled={createMutation.isPending}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed ?? false}
                onChange={() => handleToggle(todo)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <button onClick={() => handleDelete(todo)} disabled={deleteMutation.isPending}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
