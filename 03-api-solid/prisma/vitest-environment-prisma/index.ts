import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.log("deu bom");
    return {
      async teardown() {},
    };
  },
};
