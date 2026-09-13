export async function ApiFetch<T>(url: string, option: RequestInit) {
  const response = await fetch(url, {
    ...option,
    headers: { 'Content-Type': 'application/json', ...option.headers },
  })
  const r = (await response.json()) as T | any

  return r
}
