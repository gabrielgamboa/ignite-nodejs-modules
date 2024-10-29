import { describe, expect } from "vitest";
import { Slug } from "./slug";

describe("Slug", () => {
  it("should be able to create a slug", () => {
    const slug = Slug.createFromText("Example of a slug");
    expect(slug.value).toBe("example-of-a-slug");
  });

  it("should be able to create a slug from create static method", () => {
    const slug = Slug.create("example-of-a-slug");
    expect(slug.value).toBe("example-of-a-slug");
  });
});
