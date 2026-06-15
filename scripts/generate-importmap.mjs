import { generateImportMap } from "payload";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Find payload config
const configPath = path.join(rootDir, "src", "payload.config.ts");
if (!fs.existsSync(configPath)) {
  console.error("Payload config not found at", configPath);
  process.exit(1);
}

// Set env vars
process.env.ROOT_DIR = rootDir;
process.env.PAYLOAD_CONFIG_PATH = "src/payload.config.ts";

// Dynamic import of the config
const { default: config } = await import(configPath);
await generateImportMap(config, { log: true, force: true });

console.log("Import map generated successfully!");
