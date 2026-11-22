async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const url = new URL(path, 'https://api.devlink.ai.kr')
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`투두를 불러오지 못했습니다 (${response.status}).`)
  return response.json() as Promise<T>
}

export const apiClient = { get }
