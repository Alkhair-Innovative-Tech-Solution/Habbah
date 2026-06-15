const { Client } = require("pg");
const client = new Client({
  connectionString: "postgresql://postgres:password@localhost:5499/habbah_db?schema=public",
});
async function main() {
  await client.connect();
  // Check enums
  const enums = await client.query(
    "SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname LIKE '%role%' OR t.typname LIKE '%status%' OR t.typname LIKE '%type%' ORDER BY t.typname, e.enumlabel"
  );
  console.log("Enums matching role/status/type:");
  enums.rows.forEach((r) => console.log("  ", r.typname, "->", r.enumlabel));
  
  // Check all enums
  const allEnums = await client.query(
    "SELECT DISTINCT t.typname FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid ORDER BY t.typname"
  );
  console.log("\nAll enum types:");
  allEnums.rows.forEach((r) => console.log("  -", r.typname));
  await client.end();
}
main().catch((e) => console.error("Error:", e.message));
