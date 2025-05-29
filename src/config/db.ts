import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error('Missing required database environment variables.');
}

const pgp = pgPromise();

const dbConfig = {
    host : DB_HOST,
    port : parseInt(DB_PORT, 10),
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME,
}

const db = pgp(dbConfig);
export default db;