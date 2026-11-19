import type { Todo } from '../../types/todo'
import './TodoNote.css'

export function TodoNote({ todo }: { todo: Todo }) {
  return (
    <li className="todo-note" data-completed={todo.completed}>
      <span className="todo-note__status">{todo.completed ? '✓ 완료' : '○ 미완료'}</span>
      <p className="todo-note__content">{todo.content}</p>
    </li>
  )
}
