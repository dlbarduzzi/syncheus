import { onJsonRequest, JsonRequestError } from "./json"
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest"

describe("requests.onJsonRequest", () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.resetAllMocks()
  })

  it("should throw error on failed request", async () => {
    const error = new Error("Network failure")
    globalThis.fetch = vi.fn().mockRejectedValue(error)
    const req = new Request("https://test.com")
    await expect(onJsonRequest(req)).rejects.toThrow(JsonRequestError)
    await expect(onJsonRequest(req)).rejects.toMatchObject({
      cause: error,
      status: 500,
      message: "json request failed",
    })
  })
  it("should throw error on wrong status code", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 404,
      statusText: "Not Found",
      json: vi.fn(),
    })
    const req = new Request("https://test.com")
    await expect(onJsonRequest(req)).rejects.toThrow(JsonRequestError)
    await expect(onJsonRequest(req)).rejects.toMatchObject({
      cause: "Not Found",
      status: 404,
      message: "json request failed",
    })
  })
  it("should throw error on invalid json response", async () => {
    const error = new Error("Invalid JSON format")
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: vi.fn().mockRejectedValue(error),
    })
    const req = new Request("https://test.com")
    await expect(onJsonRequest(req)).rejects.toThrow(JsonRequestError)
    await expect(onJsonRequest(req)).rejects.toMatchObject({
      status: 200,
      message: "json request failed",
      cause: error,
    })
  })
  it("should return success response", async () => {
    const data = { message: "Test completed successfully." }
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: vi.fn().mockResolvedValue(data),
    })
    const req = new Request("https://test.com")
    const res = await onJsonRequest(req)
    expect(res).toEqual(data)
    expect(fetch).toHaveBeenCalledWith(req)
  })
})
