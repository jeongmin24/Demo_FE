import { TodoNote } from '../TodoNote/TodoNote'
import { TodoEmptyState } from '../TodoEmptyState/TodoEmptyState'
import type { Todo } from '../../types/todo'
import './TodoBoard.css'

export function TodoBoard({ todos, onSelect }: { todos: Todo[]; onSelect: (todo: Todo, postNum: number) => void }) {
  if (todos.length === 0) return <TodoEmptyState />

  return (
    <ul className="todo-board" aria-label="투두 목록" role="list">
      {todos.map((todo, index) => <TodoNote key={todo.id} todo={todo} onClick={() => onSelect(todo, index)} />)}
    </ul>
  )
}
