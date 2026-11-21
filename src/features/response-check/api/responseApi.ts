import { apiClient } from '../../../lib/apiClient'
import type { ResponseCheckResult } from '../types/response'

const statusMessages: Readonly<Partial<Record<number, string>>> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  409: 'Conflict',
  413: 'Content Too Large',
  415: 'Unsupported Media Type',
  422: 'Unprocessable Content',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
}

export async function checkResponse(): Promise<ResponseCheckResult> {
  const apiUrl = import.meta.env.VITE_RESPONSE_CHECK_URL?.trim()
  const response = apiUrl
    ? await apiClient.get(apiUrl)
    : await apiClient.get('/api/response-check')

  const body: unknown = await response.json().catch(() => undefined)
  const payload = body && typeof body === 'object' ? body : {}
  const code = 'code' in payload ? payload.code : undefined
  const message = 'message' in payload ? payload.message : undefined

  return {
    kind: response.ok ? 'success' : 'failure',
    code: typeof code === 'number' || (typeof code === 'string' && code.trim())
      ? code
      : response.status,
    message: typeof message === 'string' && message.trim()
      ? message
      : response.statusText || statusMessages[response.status] || '응답 메시지가 없습니다.',
  }
}
