import { app } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import createMainMenu from './menu'
import { closeAllDb } from './database'
import { dictionary, module, registry } from './services'
import './ipcServer'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  createMainMenu(mainWindow.webContents)

  await registry.syncRegistry()
  await module.syncModules()
  await dictionary.syncDictionaries()

  if (isProd) {
    await mainWindow.loadURL('app://./main.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/main`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  closeAllDb()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
