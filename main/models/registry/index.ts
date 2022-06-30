import { readFileSync } from 'fs'
import { IRegistryJson, IRegistryDownloadJsonList } from 'common/types'
import { editOrCreateDb, openDb, closeDb } from '../../database'
import { IRegistry } from './types'
import registryConfig from '../../config/registryConfig'
import { REGISTRY_DB } from './constants'
import { convertRegistryDownloads } from './helpers'

const registry: IRegistry = { hosts: [], downloads: [] }

const getRegistry = (): Promise<IRegistryDownloadJsonList> => {
  const db = openDb(REGISTRY_DB)

  return new Promise((resolve) => {
    db.all(
      'SELECT * FROM downloads',
      (e: any, downloads: IRegistryDownloadJsonList) => {
        resolve(downloads || [])
      },
    )

    closeDb(REGISTRY_DB)
  })
}

const syncRegistry = async (): Promise<IRegistry> => {
  try {
    const registryJSON: IRegistryJson = JSON.parse(readFileSync(`${registryConfig.path}/${registryConfig.filename}`, 'utf8'))
    const db = editOrCreateDb(REGISTRY_DB)

    await db.serialize(() => {
      // DROP TABLE IF EXISTS downloads; DROP INDEX IF EXISTS downloads_abr_idx; DROP INDEX IF EXISTS downloads_des_idx; 
      db.run(
        'CREATE TABLE downloads(id INTEGER PRIMARY KEY, abr TEXT, lng TEXT, aln TEXT, reg TEXT, des TEXT, lds TEXT, inf TEXT, fil TEXT, upd TEXT, cmt TEXT, def INTEGER, url TEXT, siz TEXT, lst TEXT, dep TEXT, hid INTEGER, lic TEXT); CREATE INDEX downloads_abr_idx ON downloads(abr); CREATE INDEX downloads_des_idx ON downloads(des)',
      )
      const stmt = db.prepare(
        'INSERT INTO downloads(abr, lng, aln, reg, des, lds, inf, fil, upd, cmt, def, url, siz, lst, dep, hid, lic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      )
      registryJSON.downloads.forEach(({ abr, lng, aln, reg, des, lds, inf, fil, upd, cmt, def, url, siz, lst, dep, hid, lic }, idx) => {
        stmt.run(abr, lng, aln, reg, des, lds, inf, fil, upd, cmt, def, url, siz, lst, dep, hid, lic)
      })
      stmt.finalize()
    })

    closeDb(REGISTRY_DB)

    const downloadsJson = await getRegistry()
    registry.hosts = registryJSON.hosts
    registry.downloads = convertRegistryDownloads(downloadsJson)

    return registry
  } catch (err) {
    console.error(err)
  }
}

export default { getRegistry, syncRegistry }
