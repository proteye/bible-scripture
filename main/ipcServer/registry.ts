import { ipcMain } from 'electron'
import { registry } from '../services'

ipcMain.handle('getRegistry', () => {
  return registry.getRegistry()
})
