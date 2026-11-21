import { ResponseResult } from '../../features/response-check/components/ResponseResult/ResponseResult'
import { useResponseCheck } from '../../features/response-check/hooks/useResponseCheck'
import './ResponseCheckPage.css'

export function ResponseCheckPage() {
  const { state, requestResponse } = useResponseCheck()
  const loading = state.status === 'loading'

  return (
    <main className="response-check">
      <div className="response-check__content">
        <h1>버튼을 눌러 응답을 확인해보세요.</h1>
        <button type="button" disabled={loading} onClick={requestResponse}>
          {loading ? '확인 중...' : '응답 확인하기'}
        </button>
        <div className="response-check__result" aria-live="polite" aria-atomic="true">
          {state.status === 'settled' && <ResponseResult result={state.result} />}
        </div>
      </div>
    </main>
  )
}
