import { TAny } from 'common/types'
import { get as getHttp } from 'http'
import { get as getHttps } from 'https'

const getFollowingUrl = (
  url: string,
  isJson = true,
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: any) => void,
) => {
  const get = url.includes('https://') ? getHttps : getHttp

  return get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return getFollowingUrl(res.headers.location, isJson, resolve, reject)
    }

    if (res.statusCode !== 200) {
      reject(`Error with status code = ${res.statusCode}`)
      return
    }

    res.setEncoding('utf8')

    res.on('data', (data) => {
      if (isJson) {
        resolve(JSON.parse(data))
      } else {
        resolve(data)
      }
    })

    res.on('error', (err) => {
      console.error(err.message)
      reject(err.message)
    })
  }).on('error', (err) => {
    console.error(err.message)
    reject(err.message)
  })
}

const getUrl = (url: string, isJson = true): Promise<TAny> => {
  return new Promise((resolve, reject) => {
    getFollowingUrl(url, isJson, resolve, reject)
  })
}

export default getUrl
