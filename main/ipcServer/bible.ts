import { ipcMain } from 'electron'
import { TId, TModuleName } from 'common/types'
import { IGetBibleVersesProps } from '../models/bible/types'
import { bible } from '../models'

ipcMain.handle('openBible', async (_event, moduleName: TModuleName, uid: TId) => {
  return await bible.openBible(moduleName, uid)
})

ipcMain.handle('closeBibleByUid', async (_event, uid: TId) => {
  return await bible.closeBibleByUid(uid)
})

ipcMain.handle('getBibleInfo', async (_event, uid: TId) => {
  return await bible.getBibleInfo(uid)
})

ipcMain.handle('getBibleBooks', async (_event, uid: TId) => {
  return await bible.getBibleBooks(uid)
})

ipcMain.handle('getBibleVerses', async (_event, uid: TId, props: IGetBibleVersesProps) => {
  return await bible.getBibleVerses(uid, props)
})
