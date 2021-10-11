import { ipcMain } from 'electron'
import { bible } from '../models'

ipcMain.on('openBible', async (event, name) => {
  event.returnValue = await bible.openBible(name)
})

ipcMain.on('closeBible', async (event, name) => {
  event.returnValue = await bible.getBibleInfo(name)
})

ipcMain.on('getBibleInfo', async (event, name) => {
  event.returnValue = await bible.getBibleInfo(name)
})

ipcMain.on('getBibleBooks', async (event, name) => {
  event.returnValue = await bible.getBibleBooks(name)
})

ipcMain.on('getBibleVerses', async (event, name, { bookNumber }) => {
  event.returnValue = await bible.getBibleVerses(name, { bookNumber })
})
