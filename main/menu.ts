import { app, ipcMain, Menu, MenuItem, WebContents } from 'electron'

const isMac = process.platform === 'darwin'

const handleClick = (menuItem: MenuItem, webContents: WebContents) => {
  webContents.send('main-menu-command', menuItem.id)
}

const getTemplate = (webContents: WebContents) => [
  // { role: 'appMenu' },
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            {
              id: 'dictionarySettings',
              label: 'Dictionary settings...',
              click: (menuItem: MenuItem) => handleClick(menuItem, webContents),
            },
            {
              id: 'downloadModules',
              label: 'Download modules...',
              click: (menuItem: MenuItem) => handleClick(menuItem, webContents),
            },
            { type: 'separator' },
            {
              id: 'preferences',
              label: 'Preferences...',
              accelerator: 'CmdOrCtrl+,',
              click: (menuItem: MenuItem) => handleClick(menuItem, webContents),
            },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
      ]
    : []),
  { role: 'fileMenu' },
  // {
  //   label: 'File',
  //   submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
  // },
  { role: 'editMenu' },
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac
  //       ? [
  //           { role: 'pasteAndMatchStyle' },
  //           { role: 'delete' },
  //           { role: 'selectAll' },
  //           { type: 'separator' },
  //           {
  //             label: 'Speech',
  //             submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
  //           },
  //         ]
  //       : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
  //   ],
  // },
  { role: 'viewMenu' },
  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forceReload' },
  //     { role: 'toggleDevTools' },
  //     { type: 'separator' },
  //     { role: 'resetZoom' },
  //     { role: 'zoomIn' },
  //     { role: 'zoomOut' },
  //     { type: 'separator' },
  //     { role: 'togglefullscreen' },
  //   ],
  // },
  {
    label: 'Tools',
    submenu: [
      {
        id: 'instantDetails',
        label: 'Instant Details',
        type: 'checkbox',
        click: (menuItem: MenuItem) => handleClick(menuItem, webContents),
      },
    ],
  },
  { role: 'windowMenu' },
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac
  //       ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
  //       : [{ role: 'close' }]),
  //   ],
  // },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        },
      },
    ],
  },
]

const createMainMenu = (webContents: WebContents) => {
  const template = getTemplate(webContents)
  const menu = Menu.buildFromTemplate(template as unknown as MenuItem[])
  Menu.setApplicationMenu(menu)

  ipcMain.on('isShowInstantDetails', (_e, isShow) => {
    ;(template[4].submenu[0] as unknown as MenuItem).checked = isShow
    const menu = Menu.buildFromTemplate(template as unknown as MenuItem[])
    Menu.setApplicationMenu(menu)
  })
}

export default createMainMenu
