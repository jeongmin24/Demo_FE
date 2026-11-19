import { apiClient } from '../../../lib/apiClient'
import type { Todo } from '../types/todo'

export function listTodos(signal: AbortSignal) {
  return apiClient.get<Todo[]>('/api/todos', signal)
}
