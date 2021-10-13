import { ipcMain } from 'electron'
import { TModuleName } from 'common/types'
import { IGetBibleVersesProps } from '../models/bible/types'
import { bible } from '../models'

ipcMain.handle('getBibleInfo', async (_event, moduleName: TModuleName) => {
  return await bible.getBibleInfo(moduleName)
})

ipcMain.handle('getBibleBooks', async (_event, moduleName: TModuleName) => {
  return await bible.getBibleBooks(moduleName)
})

ipcMain.handle('getBibleVerses', async (_event, moduleName: TModuleName, props: IGetBibleVersesProps) => {
  return await bible.getBibleVerses(moduleName, props)
})
