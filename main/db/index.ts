const sqlite3 = require('sqlite3').verbose()

const db = {}

const openDb = (moduleName: string) => {
  if (db[moduleName]) {
    console.log('db exist', db)
    return db[moduleName]
  }

  const res = new sqlite3.Database(`./resources/databases/${moduleName}.SQLite3`)
  db[moduleName] = res

  return res
}

const closeDb = (moduleName: string): boolean => {
  if (db[moduleName]) {
    db[moduleName].close()
    delete db[moduleName]

    return true
  }

  return false
}

const closeAllDb = () => {
  for (var key in db) {
    db[key].close()
    delete db[key]
  }
}

export { db, openDb, closeDb, closeAllDb }
