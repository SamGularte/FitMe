import { containsOnlyLetters } from "./Register";

describe("containsOnlyLetters", () => {
  it("should return true for strings containing only letters", () => {
    const result = containsOnlyLetters("abcdef");
    expect(result).toBe(true);
  });

  it("should return false for strings containing non-letter characters", () => {
    const result = containsOnlyLetters("abc123");
    expect(result).toBe(false);
  });

  it("should return true for an empty string", () => {
    const result = containsOnlyLetters("");
    expect(result).toBe(true);
  });

  it("should return false for strings containing spaces", () => {
    const result = containsOnlyLetters("abc def");
    expect(result).toBe(false);
  });

  it("should return false for strings containing special characters", () => {
    const result = containsOnlyLetters("abc!def");
    expect(result).toBe(false);
  });
});
