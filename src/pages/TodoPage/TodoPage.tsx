import { TodoBoard } from '../../features/todos/components/TodoBoard/TodoBoard'
import { useTodos } from '../../features/todos/hooks/useTodos'
import './TodoPage.css'

export function TodoPage() {
  const { state, retry } = useTodos()

  return (
    <main className="todo-page">
      <header className="todo-page__header">
        <h1>오늘의 Todo</h1>
      </header>
      {state.status === 'loading' && <p role="status">투두를 불러오는 중입니다.</p>}
      {state.status === 'error' && (
        <div className="todo-page__error">
          <p role="alert">투두를 불러오지 못했습니다.</p>
          <button type="button" onClick={retry}>다시 시도</button>
        </div>
      )}
      {state.status === 'ready' && <TodoBoard todos={state.todos} />}
    </main>
  )
}
