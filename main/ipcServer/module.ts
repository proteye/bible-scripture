import { ipcMain } from 'electron'
import { TId, TModuleName } from 'common/types'
import { module } from '../services'

ipcMain.handle('getModules', async (_event) => {
  return module.getModules()
})

ipcMain.on('downloadModule', async (event, moduleName: TModuleName) => {
  const sender = event.sender

  await module
    .downloadModule(moduleName, (progress) => sender.send('downloadProgress', moduleName, progress))
    .then((data) => {
      sender.send('downloadEnd', moduleName, data)
    })
    .catch(() => {
      sender.send('downloadError', moduleName, { message: `Error module "${moduleName}" download` })
    })
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

ipcMain.handle('removeModule', async (_event, moduleName: TModuleName) => {
  return module.removeModule(moduleName)
})
