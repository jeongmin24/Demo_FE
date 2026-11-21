import type { ResponseCheckResult } from '../../types/response'
import './ResponseResult.css'

type ResponseResultProps = {
  result: ResponseCheckResult
}

export function ResponseResult({ result }: ResponseResultProps) {
  const success = result.kind === 'success'
  const codeLabel = success ? '응답 코드' : '에러 코드'

  return (
    <div className="response-result" data-outcome={success ? 'success' : 'failure'}>
      <span className="response-result__label">{success ? '성공' : '실패'}</span>
      <strong className="response-result__code">
        {result.kind === 'connection-failure'
          ? '연결 실패'
          : <><span className="response-result__sr-only">{codeLabel} </span>{result.code}</>}
      </strong>
      <p className="response-result__message">{result.message}</p>
    </div>
  )
}
