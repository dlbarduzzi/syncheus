import { describe, expect, it } from "vitest"

import {
  capitalize,
  lowercase,
  hasNumber,
  hasSpecialChar,
  hasLowercaseChar,
  hasUppercaseChar,
  generateOTP,
} from "./index"

describe("strings.index", () => {
  describe("lowercase", () => {
    it("should lowercase string", () => {
      expect(lowercase("Hello")).toBe("hello")
      expect(lowercase("WoRld")).toBe("world")
    })
  })
  describe("capitalize", () => {
    it("should capitalize string", () => {
      expect(capitalize("hello")).toBe("Hello")
      expect(capitalize("woRld")).toBe("WoRld")
    })
  })
  describe("hasNumber", () => {
    it("should validate if string includes a number", () => {
      expect(hasNumber("hello1")).toBeTruthy()
      expect(hasNumber("hello")).toBeFalsy()
    })
  })
  describe("hasSpecialChar", () => {
    it("should validate if string includes a special character", () => {
      expect(hasSpecialChar("hello!")).toBeTruthy()
      expect(hasSpecialChar("hello")).toBeFalsy()
    })
  })
  describe("hasLowercaseChar", () => {
    it("should validate if string includes a special character", () => {
      expect(hasLowercaseChar("HElLO")).toBeTruthy()
      expect(hasLowercaseChar("HELLO")).toBeFalsy()
    })
  })
  describe("hasUppercaseChar", () => {
    it("should validate if string includes a special character", () => {
      expect(hasUppercaseChar("heLlo")).toBeTruthy()
      expect(hasUppercaseChar("hello")).toBeFalsy()
    })
  })
})

describe("strings.generateOTP", () => {
  it("should generate an OTP of default length 6", () => {
    const otp = generateOTP()
    expect(otp).toHaveLength(6)
    expect(/^\d{6}$/.test(otp)).toBe(true)
  })
  it("should generate an OTP of specified length", () => {
    const length = 8
    const otp = generateOTP(length)
    expect(otp).toHaveLength(length)
    expect(/^\d{8}$/.test(otp)).toBe(true)
  })
  it("should generate different OTPs on each call (likely)", () => {
    const otp1 = generateOTP()
    const otp2 = generateOTP()
    expect(otp1).not.toEqual(otp2)
  })
})
