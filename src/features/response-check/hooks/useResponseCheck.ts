import { useRef, useState } from 'react'
import { checkResponse } from '../api/responseApi'
import type { ResponseCheckResult } from '../types/response'

type ResponseCheckState =
  | { status: 'idle' | 'loading' }
  | { status: 'settled'; result: ResponseCheckResult }

export function useResponseCheck() {
  const pending = useRef(false)
  const [state, setState] = useState<ResponseCheckState>({ status: 'idle' })

  async function requestResponse() {
    if (pending.current) return

    pending.current = true
    setState({ status: 'loading' })

    try {
      setState({ status: 'settled', result: await checkResponse() })
    } catch (error) {
      let message = '서버에서 HTTP 응답을 받지 못했습니다.'
      if (error instanceof Error && error.name === 'TimeoutError') {
        message = '서버 응답 대기 시간이 초과되었습니다.'
      } else if (error instanceof Error && error.message) {
        message = `서버 연결에 실패했습니다. (${error.message})`
      }
      setState({ status: 'settled', result: { kind: 'connection-failure', message } })
    } finally {
      pending.current = false
    }
  }

  return { state, requestResponse }
}
