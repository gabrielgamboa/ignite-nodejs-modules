import { describe, expect, test } from "vitest";
import { Slug } from "./slug";

describe('Slug', () => {
  test('should be able to create a slug', () => {
    const slug = Slug.createFromText('Example of a slug');
    expect(slug.value).toBe('example-of-a-slug');
  })
});