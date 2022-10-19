import { createWriteStream, statSync, unlink } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import fetch from 'node-fetch'
import { TDownloadResult } from '../types'
import { TDownloadProgressCallback } from 'common/types'

const download = async (
  url: string,
  dest: string,
  onProgress?: TDownloadProgressCallback,
): Promise<TDownloadResult> => {
  const response = await fetch(url)

  if (!response.ok) {
    console.error(`download: unexpected response ${response.statusText}`)
    return false
  }

  const totalSize = +response.headers.get('Content-Length')
  onProgress?.({ total: totalSize, downloaded: 1 })

  let downloadedSize = 0

  response.body.on('data', (chunk) => {
    downloadedSize += chunk?.length
    onProgress?.({ total: totalSize, downloaded: downloadedSize })
  })

  const streamPipeline = promisify(pipeline)
  const file = createWriteStream(dest)

  try {
    await streamPipeline(response.body, file)
  } catch (e) {
    console.error(e.message)
    unlink(dest, (err) => {
      if (err) {
        console.error(err.message)
      }
    })

    return false
  }

  return statSync(dest)
}

export default download
