
import mysql from "mysql2/promise"
import { RowDataPacket } from "mysql2"


const pool = mysql.createPool({
  host:process.env.DB_HOST || "localhost",
  user:process.env.DB_USER || "root",
  password:process.env.DB_PASSWORD || ""
});

const createDatabase = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    const dbName = process.env.DB_NAME || "e_commerce_db";
    const [rows] = await pool.execute<RowDataPacket[]>("SHOW DATABASES")
    if (rows.some((obj) => obj.Database == dbName)) {
      console.log("Creation of database skipped")
    } else {
      await pool.execute(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
      console.log("database created successfully")
    }
  } catch (err) {
    const e = err as Error;
    console.log(err)
    console.error("MYSQL connection error:", e.message);
    process.exit(1);
  }

}

export default createDatabase;