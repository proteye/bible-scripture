import { ipcMain } from 'electron'
import { TId, TModuleName } from 'common/types'
import { module } from '../models'

ipcMain.handle('getModules', async (_event) => {
  return module.getModules()
})

ipcMain.handle('downloadModule', async (_event, moduleName: TModuleName) => {
  return module.downloadModule(moduleName)
})

ipcMain.handle('openModule', async (_event, moduleName: TModuleName, uniqId: TId) => {
  return module.openModule(moduleName, uniqId)
})

ipcMain.handle('closeModuleByUid', async (_event, moduleName: TModuleName, uniqId: TId) => {
  return module.closeModuleByUid(moduleName, uniqId)
})

ipcMain.handle('closeModule', async (_event, moduleName: TModuleName) => {
  return module.closeModule(moduleName)
})
