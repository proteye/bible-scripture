import { readFileSync, unlink } from 'fs'
import { IRegistryJson } from 'common/types'
import { IRegistry } from './types'
import registryConfig from '../../config/registryConfig'
import { convertRegistryDownloads } from './helpers'
import { download, unzip } from '../../helpers'

const registry: IRegistry = { hosts: [], downloads: [] }

const getRegistry = (): IRegistry => {
  if (registry.downloads.length > 0) {
    return registry
  }

  const registryJSON: IRegistryJson = JSON.parse(
    readFileSync(`${registryConfig.path}/${registryConfig.filename}`, 'utf8'),
  )

  registry.hosts = registryJSON.hosts
  registry.downloads = convertRegistryDownloads(registryJSON.downloads)

  return registry
}

const syncRegistry = async (): Promise<IRegistry> => {
  try {
    const dest = `${registryConfig.path}/${registryConfig.zipFilename}`
    const destJson = `${registryConfig.path}/${registryConfig.filename}`
    const infoDest = `${registryConfig.path}/${registryConfig.infoFilename}`

    let index = 0
    let result = false
    let url = registryConfig.urls[index].registry
    let infoUrl = registryConfig.urls[index].info

    unlink(infoDest, () => {})

    while (!result && index < registryConfig.urls.length) {
      result = await download(infoUrl, infoDest)
      index += 1
      infoUrl = registryConfig.urls[index].info
    }

    unlink(dest, () => {})

    result = false

    while (!result && index < registryConfig.urls.length) {
      result = await download(url, dest)
      index += 1
      url = registryConfig.urls[index].registry
    }

    unlink(destJson, () => {})

    await unzip(dest, registryConfig.path)

    return getRegistry()
  } catch (err) {
    console.error(err)
  }
}

export default { getRegistry, syncRegistry }
