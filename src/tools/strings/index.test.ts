import { describe, expect, it } from "vitest"

import {
  capitalize,
  lowercase,
  hasNumber,
  hasSpecialChar,
  hasLowercaseChar,
  hasUppercaseChar,
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
