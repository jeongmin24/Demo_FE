function get(path: string) {
  return fetch(path, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  })
}

export const apiClient = { get }
