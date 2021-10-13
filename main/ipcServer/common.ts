import { ipcMain } from 'electron'
import { TModuleName } from 'common/types'
import { common } from '../models'

ipcMain.handle('openModule', async (_event, moduleName: TModuleName) => {
  return common.openModule(moduleName)
})

ipcMain.handle('closeModule', async (_event, moduleName: TModuleName, closeAll = false) => {
  return common.closeModule(moduleName, closeAll)
})
