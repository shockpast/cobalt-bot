import type { Database } from "jsr:@db/sqlite"

export class User {
  private database: Database
  private user_id: string

  constructor(database: Database, user_id: string) {
    this.database = database
    this.user_id = user_id

    const stmt = database.prepare(`SELECT user_id FROM users WHERE user_id = ?;`).bind(user_id).get()

    if (!stmt)
      database.prepare(`
        INSERT OR IGNORE INTO users (user_id)
        VALUES (?);
      `).run([user_id])
  }

  download() {
    this.database.prepare(`
      UPDATE users
         SET downloads = downloads + 1
       WHERE users.user_id = ?
    `).run([this.user_id])
  }
}