import { ipcMain } from 'electron'
import { TId, TModuleName } from 'common/types'
import { IGetDictionaryTopicProps } from '../models/dictionary/types'
import { dictionary } from '../models'

ipcMain.handle('openDictionary', async (_event, moduleName: TModuleName, uid: TId) => {
  return await dictionary.openDictionary(moduleName, uid)
})

ipcMain.handle('closeDictionaryByUid', async (_event, uid: TId) => {
  return await dictionary.closeDictionaryByUid(uid)
})

ipcMain.handle('getDictionaryInfo', async (_event, uid: TId) => {
  return await dictionary.getDictionaryInfo(uid)
})

ipcMain.handle('getDictionaryByTopic', async (_event, uid: TId, props: IGetDictionaryTopicProps) => {
  return await dictionary.getDictionaryByTopic(uid, props)
})
