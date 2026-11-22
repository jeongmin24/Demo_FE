import type { Todo } from '../../types/todo'
import './TodoNote.css'

export function TodoNote({ todo, onClick }: { todo: Todo; onClick: () => void }) {
  return (
    <li className="todo-note" data-completed={todo.completed}>
      <button type="button" className="todo-note__button" onClick={onClick} aria-haspopup="dialog">
        <span className="todo-note__status">{todo.completed ? '✓ 완료' : '○ 미완료'}</span>
        <span className="todo-note__content">{todo.content}</span>
      </button>
    </li>
  )
}
