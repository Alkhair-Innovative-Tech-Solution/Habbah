const { Client } = require("pg");
const c = new Client({ connectionString: "postgresql://postgres:password@localhost:5499/habbah_db" });
(async () => {
  await c.connect();
  const r = await c.query(
    "SELECT column_name,data_type,character_maximum_length FROM information_schema.columns WHERE table_schema='payload' AND table_name='pages' ORDER BY ordinal_position"
  );
  console.log(JSON.stringify(r.rows.map((r) => r.column_name + " (" + r.data_type + ")"), null, 2));
  await c.end();
})();
