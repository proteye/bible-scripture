import { TAny } from 'common/types'
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs'
import { Extract, Parse } from 'unzipper'

const unzip = (srcFile: string, destPath: string, isModule = false): Promise<boolean | string | string[]> => {
  const readStream = createReadStream(srcFile)
  const moduleFileName = srcFile.split('/').pop().replace('.zip', '')
  let stream = null
  let files = []

  return new Promise((resolve, reject) => {
    if (isModule) {
      stream = readStream.pipe(Parse())
      stream.on('entry', (entry: TAny) => {
        let fileName = entry.path
        let dest = `${destPath}/${fileName}`
        const type = entry.type // 'Directory' or 'File'
        if (type === 'File') {
          if (fileName[0] === '.') {
            fileName = `${moduleFileName}${fileName}`
          }
          entry.pipe(createWriteStream(`${destPath}/${fileName}`))
          files.push(fileName)
        } else if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
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
