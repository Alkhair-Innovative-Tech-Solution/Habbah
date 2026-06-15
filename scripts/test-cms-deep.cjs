// Deep test script for CMS - tests ALL critical paths
const http = require("http");

const BASE = "http://localhost:3000";
const EMAIL = "admin@habbah.org";
const PASSWORD = "Admin123!";

async function request(method, path, body, headers) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { ...headers },
    };
    if (body) {
      opts.headers["Content-Type"] = "application/json";
      opts.headers["Content-Length"] = Buffer.byteLength(body);
    }
    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  console.log("=== CMS DEEP DIAGNOSTIC ===\n");

  // 1. Check homepage
  console.log("[1] GET /");
  const home = await request("GET", "/");
  console.log(`    Status: ${home.status}, Size: ${home.body.length}B`);
  const hasHtml = home.body.includes("<html");
  const hasDoctype = home.body.startsWith("<!DOCTYPE html>");
  console.log(`    Has DOCTYPE: ${hasDoctype}, Has <html>: ${hasHtml}`);

  // 2. Check CMS admin (no auth)
  console.log("\n[2] GET /cms-admin");
  const admin = await request("GET", "/cms-admin");
  console.log(`    Status: ${admin.status}, Size: ${admin.body.length}B`);
  const htmlTag = admin.body.match(/<html[^>]*>/)?.[0] || "NONE";
  console.log(`    <html> tag: ${htmlTag}`);
  const bodyTag = admin.body.match(/<body[^>]*>/)?.[0] || "NONE";
  console.log(`    <body> tag: ${bodyTag.substring(0, 80)}...`);

  // 3. Check redirect to login
  console.log("\n[3] GET /cms-admin (checking for login redirect)");
  const hasLoginRedirect = admin.body.includes("/cms-admin/login") || admin.body.includes("NEXT_REDIRECT");
  console.log(`    Has login redirect: ${hasLoginRedirect}`);

  // 4. Check CSS links
  console.log("\n[4] CSS Loading Analysis");
  const cssLinks = admin.body.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
  console.log(`    CSS link tags: ${cssLinks.length}`);
  cssLinks.forEach((l, i) => {
    const href = l.match(/href="([^"]+)"/)?.[1] || "?";
    const prec = l.match(/data-precedence="([^"]+)"/)?.[1] || "?";
    console.log(`    [${i}] href=/${href.split("/").pop()}... data-precedence="${prec}"`);
  });

  // 5. Check login page specifically
  console.log("\n[5] GET /cms-admin/login");
  const login = await request("GET", "/cms-admin/login");
  console.log(`    Status: ${login.status}, Size: ${login.body.length}B`);
  const hasEmail = login.body.includes('name="email"') || login.body.includes("Email");
  const hasPassword = login.body.includes('type="password"') || login.body.includes("Password");
  console.log(`    Has email field: ${hasEmail}, Has password field: ${hasPassword}`);

  // 6. Check login page CSS
  const loginCss = login.body.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
  console.log(`    CSS links on login page: ${loginCss.length}`);

  // 7. Check Login API
  console.log("\n[6] POST /api/users/login");
  const loginResult = await request("POST", "/api/users/login", JSON.stringify({ email: EMAIL, password: PASSWORD }));
  console.log(`    Status: ${loginResult.status}`);
  let token = null;
  if (loginResult.status === 200) {
    const data = JSON.parse(loginResult.body);
    token = data.token;
    console.log(`    User: ${data.user?.email}, Role: ${data.user?.role}`);
    console.log(`    Token: ${token?.substring(0, 20)}...`);
  } else {
    console.log(`    Body: ${loginResult.body.substring(0, 200)}`);
  }

  // 8. Check authenticated admin
  if (token) {
    console.log("\n[7] GET /cms-admin (authenticated)");
    const authAdmin = await request("GET", "/cms-admin", null, { Cookie: `payload-token=${token}` });
    console.log(`    Status: ${authAdmin.status}, Size: ${authAdmin.body.length}B`);
    const hasContent = authAdmin.body.includes("dashboard") || authAdmin.body.includes("collections");
    console.log(`    Has dashboard/collections content: ${hasContent}`);
    const authCss = authAdmin.body.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
    console.log(`    CSS links: ${authCss.length}`);
    authCss.forEach((l) => {
      const prec = l.match(/data-precedence="([^"]+)"/)?.[1] || "?";
      console.log(`      data-precedence="${prec}"`);
    });
    // Check body content
    const bodyMatch = authAdmin.body.match(/<body[^>]*>([\s\S]*)<\/body>/);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];
      console.log(`    Body content length: ${bodyContent.length}`);
      const bodyStart = bodyContent.substring(0, 200);
      console.log(`    Body starts with: ${bodyStart.substring(0, 100)}...`);
    }
  }

  // 9. Check Pages API
  console.log("\n[8] GET /api/pages?depth=0");
  const pages = await request("GET", "/api/pages?depth=0");
  console.log(`    Status: ${pages.status}`);
  if (pages.status === 200) {
    const data = JSON.parse(pages.body);
    console.log(`    Total docs: ${data.totalDocs}`);
    data.docs?.forEach((p) => console.log(`      - ${p.title} (/${p.slug})`));
  }

  console.log("\n=== DIAGNOSTIC COMPLETE ===");
}
run().catch(console.error);
