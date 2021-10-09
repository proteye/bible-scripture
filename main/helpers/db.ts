const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./resources/databases/RST+/RST+.SQLite3')

export default db
