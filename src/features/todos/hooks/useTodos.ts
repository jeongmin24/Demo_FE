import { useEffect, useState } from 'react'
import { listTodos } from '../api/todoApi'
import type { Todo } from '../types/todo'

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; todos: Todo[] }
  | { status: 'error' }

export function useTodos() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    void listTodos(controller.signal).then(
      (todos) => {
        if (!controller.signal.aborted) setState({ status: 'ready', todos })
      },
      () => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      },
    )
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return { state, retry }
}
