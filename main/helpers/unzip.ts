import { TAny } from 'common/types'
import { createReadStream, createWriteStream } from 'fs'
import moduleConfig from '../config/moduleConfig'
import { Extract, Parse } from 'unzipper'

const unzip = (srcFile: string, destPath: string, isModule = false): Promise<boolean | string | string[]> => {
  const readStream = createReadStream(srcFile)
  const moduleName = srcFile.split('/').pop().split('.')[0]
  let stream = null
  let files = []

  return new Promise((resolve, reject) => {
    if (isModule) {
      stream = readStream.pipe(Parse())
      stream.on('entry', (entry: TAny) => {
        let fileName = entry.path
        const type = entry.type // 'Directory' or 'File'
        if (type === 'File' && fileName.includes(moduleConfig.extension)) {
          if (fileName[0] === '.') {
            fileName = `${moduleName}${fileName}`
          }
          entry.pipe(createWriteStream(`${destPath}/${fileName}`))
          files.push(fileName)
        } else {
          entry.autodrain()
        }
      })
    } else {
      stream = readStream.pipe(Extract({ path: destPath }))
    }

    stream.on('finish', () => {
      resolve(isModule ? files : true)
    })

    stream.on('error', (err) => {
      console.error(err.message)
      reject(err.message)
    })
  })
}

export default unzip
