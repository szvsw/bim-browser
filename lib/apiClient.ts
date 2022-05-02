import useSWR from "swr"
import {CustomError} from "ts-custom-error"
// Generic interface for data fetched with SWR library
interface SwrData<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error: HttpError;
  mutate: (
    data?: (cur: T) => T,
    shouldRevalidate?: boolean
  ) => Promise<unknown>
}

export class HttpError extends CustomError {
  public constructor(
    public code: number,
    message?: string
  ) {
    super(message)
  }
}

const createErrorResponse = async (res: Response) => {
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    // Attach extra info to the error object.
    const info = await res.json()
    const error = new HttpError(res.status, info?.message)
    return error
  }
  return null
}

const handleResponse = async (res: Response) => {
  const error = await createErrorResponse(res)
  if (error) return { error, data: null }
  const data = await res.json()
  return { data, error: null }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const error = await createErrorResponse(res)
  if (error) throw error
  return res.json()
}

export const getProjects = async () => {
	const res = await fetch('/api/project')
  const data = res.json()
  console.log(data)
  return data
}

export const createComment = async (data) => {
  const res = await fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}