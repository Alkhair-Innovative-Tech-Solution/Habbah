const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgresql://postgres:password@localhost:5499/habbah_db?schema=public",
});
async function main() {
  await client.connect();
  const res = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  console.log("Tables in public schema:");
  res.rows.forEach((r) => console.log("  -", r.table_name));
  await client.end();
}
main().catch((e) => console.error("Error:", e.message));
