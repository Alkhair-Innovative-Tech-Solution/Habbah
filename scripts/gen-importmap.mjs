import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

const { generateImportMap } = await import("payload");
const { default: config } = await import("../src/payload.config.ts");

await generateImportMap(config, {
  log: true,
  force: true,
  ignoreResolveError: false,
});

console.log("Import map generated successfully!");
