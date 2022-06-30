import { createWriteStream, unlink, WriteStream } from 'fs'
import { get as getHttp } from 'http'
import { get as getHttps } from 'https'

const getFile = (
  url: string,
  dest: string,
  file: WriteStream,
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: any) => void,
) => {
  const get = url.includes('https://') ? getHttps : getHttp

  return get(url, (res) => {
    if (res.statusCode >= 400) {
      unlink(dest, (err) => {
        if (err) {
          console.error(err.message)
          resolve(false)
        }
      })
      resolve(false)
      return
    }

    if (res.statusCode === 301 || res.statusCode === 302) {
      return getFile(res.headers.location, dest, file, resolve, reject)
    }

    res.pipe(file)

    file.on('finish', () => {
      file.close()
      resolve(true)
    })

    file.on('error', (err) => {
      unlink(dest, (err) => {
        if (err) {
          console.error(err.message)
          resolve(false)
        }
      })
      console.error(err.message)
      resolve(false)
    })
  }).on('error', (err) => {
    unlink(dest, (err) => {
      if (err) {
        console.error(err.message)
        resolve(false)
      }
    })
    console.error(err.message)
    resolve(false)
  })
}

const download = (url: string, dest: string): Promise<boolean> => {
  const file = createWriteStream(dest)

  return new Promise((resolve, reject) => {
    getFile(url, dest, file, resolve, reject)
  })
}

export default download
