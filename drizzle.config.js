/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_B4d6pnfWlOtC@ep-solitary-math-abuawz8f-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }
};
