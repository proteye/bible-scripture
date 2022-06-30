import { createReadStream } from 'fs'
import { Extract } from 'unzipper'

const unzip = (srcFile: string, destPath: string): Promise<boolean | string> => {
  const readStream = createReadStream(srcFile)

  return new Promise((resolve, reject) => {
    const stream = readStream.pipe(Extract({ path: destPath }))

    stream.on('finish', () => {
      resolve(true)
    })

    stream.on('error', (err) => {
      reject(err.message)
    })
  })
}

export default unzip
