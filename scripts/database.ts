import { Database } from "jsr:@db/sqlite"

const database = new Database("cobalt.db")
database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id   INTEGER UNIQUE,

    /* statistics */
    downloads INTEGER DEFAULT(0)
  )
`)

database.exec("PRAGMA journal_mode = WAL")
database.exec("PRAGMA synchronous = normal")
database.exec("PRAGMA temp_store = memory")