const path = require("path");
const { generateImportMap } = require("payload");

const rootDir = path.resolve(__dirname, "..");
process.env.ROOT_DIR = rootDir;

async function main() {
  const configPath = path.resolve(rootDir, "src/payload.config.ts");
  const configModule = await import(configPath);
  const config = configModule.default || configModule;
  await generateImportMap(config, { log: true, force: true });
  console.log("Import map generated!");
}

main().catch(console.error);
