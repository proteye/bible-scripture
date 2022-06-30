import { ipcMain } from 'electron'
import { registry } from '../models'

ipcMain.handle('getRegistry', () => {
  return registry.getRegistry()
})
