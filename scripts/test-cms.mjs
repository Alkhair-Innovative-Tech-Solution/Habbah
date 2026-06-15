import { createServer } from "http";
import { parse } from "url";

// Import Next.js
const { default: next } = await import("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port: 3000 });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

// Helper to make requests
function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    const req = server._handle?.connections
      ? null
      : require("http").request(
          { hostname: "localhost", port: 3000, path, method: "GET" },
          (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
              resolve({ status: res.statusCode, headers: res.headers, bodyLength: data.length, bodyPreview: data.substring(0, 500) });
            });
          }
        );
    if (req) {
      req.on("error", reject);
      req.end();
    } else {
      reject(new Error("Server not listening"));
    }
  });
}

// Listen
await new Promise((resolve) => server.listen(3000, "localhost", resolve));
console.log("Server ready on http://localhost:3000");

// Test pages
const pages = ["/", "/about", "/cms-admin", "/api/pages", "/api/access"];
for (const page of pages) {
  try {
    const result = await fetchUrl(page);
    console.log(`\n=== ${page} ===`);
    console.log(`Status: ${result.status}`);
    console.log(`Content-Type: ${result.headers["content-type"] || "N/A"}`);
    console.log(`Body size: ${result.bodyLength} bytes`);
    if (result.bodyLength < 1000) {
      console.log(`Body: ${result.bodyPreview}`);
    }
  } catch (e) {
    console.log(`\n=== ${page} === ERROR: ${e.message}`);
  }
}

await new Promise((resolve) => server.close(resolve));
console.log("\nDone.");
process.exit(0);
