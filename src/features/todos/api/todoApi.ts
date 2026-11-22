import { apiClient } from '../../../lib/apiClient'
import { demoTodos } from '../data/demoTodos'
import type { Todo } from '../types/todo'

export function getTodoDetail(postNum: number, signal: AbortSignal): Promise<Todo> {
  return apiClient.get<Todo>(`/api/todos/detail/${postNum}`, signal)
}

export async function listTodos(signal: AbortSignal): Promise<Todo[]> {
  signal.throwIfAborted()

  const controller = new AbortController()
  const abortRequest = () => controller.abort()
  signal.addEventListener('abort', abortRequest, { once: true })
  const timeout = setTimeout(abortRequest, 5000)

  try {
    return await apiClient.get<Todo[]>('/api/todos', controller.signal)
  } catch (error) {
    if (signal.aborted) throw error
    return demoTodos.map((todo) => ({ ...todo }))
  } finally {
    clearTimeout(timeout)
    signal.removeEventListener('abort', abortRequest)
  }
}
