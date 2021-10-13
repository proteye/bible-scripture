import { TAny } from 'common/types'
import { IDb } from './types'
import dbSource from './sqlite3'

const db: IDb = {}

const openDb = (dbName: string): TAny => {
  if (db[dbName]) {
    return db[dbName]
  }

  const res = new dbSource.Database(`./resources/databases/${dbName}.SQLite3`)
  db[dbName] = res

  return res
}

const closeDb = (dbName: string): boolean => {
  if (db[dbName]) {
    db[dbName].close()
    delete db[dbName]

    return true
  }

  return false
}

const closeAllDb = (): void => {
  for (var key in db) {
    db[key].close()
    delete db[key]
  }
}

export { db, openDb, closeDb, closeAllDb }
