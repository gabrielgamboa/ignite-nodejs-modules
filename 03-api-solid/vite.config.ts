import { defineConfig } from "vitest/config";
import tsConfigPaths from "vitest-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [
      ["src/infra/http/controllers/**", "./prisma/vitest-environment-prisma"],
    ],
  },
});
