import { readFileSync, writeFileSync, existsSync, unlink } from 'fs'
import { IRegistryInfoJson, IRegistryJson } from 'common/types'
import { IRegistry } from './types'
import registryConfig from '../../config/registryConfig'
import { convertRegistryDownloads } from './helpers'
import { getUrl, download, unzip } from '../../helpers'

const registry: IRegistry = { hosts: [], downloads: [] }

const getRegistry = (): IRegistry => {
  if (registry.downloads.length > 0) {
    return registry
  }

  const dest = `${registryConfig.path}/${registryConfig.filename}`
  const registryJSON: IRegistryJson = JSON.parse(readFileSync(dest, 'utf8'))

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
    let url = ''
    let infoUrl = ''
    let currentRegistryInfo: IRegistryInfoJson = { version: 0 }
    let registryInfo: IRegistryInfoJson = null

    if (existsSync(infoDest)) {
      currentRegistryInfo = JSON.parse(readFileSync(infoDest, 'utf8'))
    }

    while (!registryInfo?.version && index < registryConfig.urls.length) {
      infoUrl = registryConfig.urls[index].info
      registryInfo = await getUrl(infoUrl)
      index += 1
    }

    if (registryInfo?.version <= currentRegistryInfo?.version && existsSync(destJson)) {
      return getRegistry()
    }

    unlink(infoDest, () => {})
    unlink(destJson, () => {})

    writeFileSync(infoDest, JSON.stringify(registryInfo))

    infoUrl = registryConfig.urls[index - 1].info
    await download(infoUrl, infoDest)

    index = 0
    result = false

    while (!result && index < registryConfig.urls.length) {
      url = registryConfig.urls[index].registry
      result = await download(url, dest)
      index += 1
    }

    await unzip(dest, registryConfig.path)

    unlink(dest, () => {})

    return getRegistry()
  } catch (err) {
    console.error(err)
  }
}

export default { getRegistry, syncRegistry }
