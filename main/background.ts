import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow, db } from './helpers'
import { BibleBook, BibleInfo, BibleVerse } from '../types'

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

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('get-bible-verses', (event, arg) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db.all('SELECT name, value FROM info', (_: any, info: BibleInfo[]) => {
    // dispatch({ type: types.READ_INFO, payload: bibleInfo });
    db.all(
      'SELECT book_number AS bookNumber, short_name AS shortName, long_name AS longName, book_color AS bookColor, is_present AS isPresent FROM books_all',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_: any, books: BibleBook[]) => {
        // dispatch({ type: types.READ_BOOKS, payload: rows });
        const condition = `book_number = ${books[0].bookNumber} AND chapter = 1`
        db.all(
          `SELECT book_number AS bookNumber, chapter, verse, text FROM verses WHERE ${condition}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (_: any, verses: BibleVerse[]) => {
            event.returnValue = verses || []
          },
        )
      },
    )
  })
})
