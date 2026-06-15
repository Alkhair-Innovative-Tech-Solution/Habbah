const { Client } = require("pg");
const crypto = require("crypto");

function generateSalt() {
  return crypto.randomBytes(32).toString("hex");
}

function generateHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 25000, 512, "sha256").toString("hex");
}

async function main() {
  const email = process.argv[2] || "admin@habbah.org";
  const password = process.argv[3] || "Admin123!";
  const name = process.argv[4] || "Super Admin";

  const salt = generateSalt();
  const hash = generateHash(password, salt);

  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5499/habbah_db",
  });
  await client.connect();

  const existing = await client.query(
    "SELECT id FROM payload.users WHERE email = $1",
    [email]
  );
  if (existing.rows.length > 0) {
    console.log(`User ${email} already exists (id=${existing.rows[0].id})`);
    await client.end();
    return;
  }

  const res = await client.query(
    `INSERT INTO payload.users (email, "role", name, salt, hash, login_attempts, updated_at, created_at)
     VALUES ($1, 'super_admin', $2, $3, $4, 0, NOW(), NOW())
     RETURNING id, email, role, name`,
    [email, name, salt, hash]
  );
  console.log("Created admin user:", JSON.stringify(res.rows[0], null, 2));
  await client.end();
}
main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
