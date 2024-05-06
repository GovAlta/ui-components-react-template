import { describe, it, expect } from "vitest";
import { phoneNumberValidator, requiredValidator } from "./validation"

describe("Required Valdidator", () => {
  const validator = requiredValidator("Some param is required")
  const blankValidator = requiredValidator();

  it("creates a message for a blank value", () => {
    const msg = validator("");
    expect(msg).toBe("Some param is required");
  })

  it("validates a numeric value", () => {
    const msg = validator(42);
    expect(msg).toBe("");
  })

  it("creates the default message when no message is supplied", () => {
    const msg = blankValidator("");
    expect(msg).toBe("Required");
  })

  it("doesn't create a message for a valid value", () => {
    const msg = validator("John");
    expect(msg).toBeFalsy();
  })
})

describe("Phone number validator", () => {
  const validator = phoneNumberValidator();

  const validNums = [
    "7805551212",
    "780 555-1212",
    "(780) 555-1212",
    "780-555-1212",
    "+17805551212",
    "+1 7805551212",
    "+1 780 555-1212",
    "+1 (780) 555-1212",
    "+1 780-555-1212",
  ]

  const invalidNums = [
    "42",
    "abc780555-1212"
  ]

  for (const num of validNums) {
    it(`${num} should be a valid phonenumber`)
    const msg = validator(num)
    expect(msg).toBeFalsy();
  }

  for (const num of invalidNums) {
    it(`${num} should be a invalid phonenumber`)
    const msg = validator(num)
    expect(msg).toBeTruthy();
  }
})
