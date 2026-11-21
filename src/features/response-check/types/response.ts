export type ResponseCheckResult =
  | { kind: 'success' | 'failure'; code: number | string; message: string }
  | { kind: 'connection-failure'; message: string }
