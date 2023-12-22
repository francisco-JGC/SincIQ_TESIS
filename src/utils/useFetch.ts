export const useFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
