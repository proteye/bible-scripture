import { ipcMain } from 'electron'
import { TId, TModuleName } from 'common/types'
import { common } from '../models'

ipcMain.handle('openModule', async (_event, moduleName: TModuleName, uniqId: TId) => {
  return common.openModule(moduleName, uniqId)
})

ipcMain.handle('closeModuleByUid', async (_event, moduleName: TModuleName, uniqId: TId) => {
  return common.closeModuleByUid(moduleName, uniqId)
})

ipcMain.handle('closeModule', async (_event, moduleName: TModuleName) => {
  return common.closeModule(moduleName)
})
