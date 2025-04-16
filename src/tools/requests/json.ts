export class JsonRequestError extends Error {
  public status: number
  constructor(cause: unknown, status: number) {
    super("json request failed", { cause })
    this.name = this.constructor.name
    this.status = status
  }
}

export async function onJsonRequest(req: Request, status = 200) {
  let res: Response
  try {
    res = await fetch(req)
  }
  catch (error) {
    throw new JsonRequestError(error, 500)
  }
  if (res.status !== status) {
    throw new JsonRequestError(res.statusText, res.status)
  }
  let data: unknown
  try {
    data = await res.json()
  }
  catch (error) {
    throw new JsonRequestError(error, res.status)
  }
  return data
}
