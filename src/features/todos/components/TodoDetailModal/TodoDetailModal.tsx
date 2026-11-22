import { useEffect, useRef, useState } from 'react'
import { getTodoDetail } from '../../api/todoApi'
import type { Todo } from '../../types/todo'
import './TodoDetailModal.css'

export function TodoDetailModal({ todo, postNum, onClose }: { todo: Todo; postNum: number; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [detail, setDetail] = useState(todo)
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 5000)

    void getTodoDetail(postNum, controller.signal).then(
      (result) => {
        if (!active) return
        setDetail({ ...todo, ...result })
        setStatus('ready')
      },
      () => {
        if (active) setStatus('fallback')
      },
    ).finally(() => clearTimeout(timeout))

    return () => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    }
  }, [todo, postNum])

  return (
    <dialog
      ref={dialogRef}
      className="todo-detail"
      aria-labelledby="todo-detail-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="todo-detail__body">
        <header className="todo-detail__header">
          <h2 id="todo-detail-title">메모 상세</h2>
          <button type="button" onClick={onClose} aria-label="상세 팝업 닫기">닫기</button>
        </header>
        {status === 'loading' && <p role="status">상세 내용을 불러오는 중입니다.</p>}
        {status === 'fallback' && <p role="status">상세 조회에 실패해 기존 메모를 표시합니다.</p>}
        <p className="todo-detail__content">{detail.content}</p>
        <dl className="todo-detail__meta">
          <dt>상태</dt><dd>{detail.completed ? '완료' : '미완료'}</dd>
          <dt>작성일</dt><dd>{detail.createdAt ? new Date(detail.createdAt).toLocaleString('ko-KR') : '-'}</dd>
          <dt>수정일</dt><dd>{detail.updatedAt ? new Date(detail.updatedAt).toLocaleString('ko-KR') : '-'}</dd>
        </dl>
      </div>
    </dialog>
  )
}
