import { readFileSync, writeFileSync, existsSync, unlink } from 'fs'
import { IRegistry, IRegistryInfoJson, IRegistryJson } from 'common/types'
import registryConfig from '../../config/registryConfig'
import { convertRegistryDownloads } from './helpers'
import { getUrl, download, unzip } from '../../helpers'

const registry: IRegistry = { version: 0, hosts: [], downloads: [] }

const getRegistry = () => {
  if (registry.hosts.length > 0 && registry.downloads.length > 0) {
    return registry
  }

  const dest = `${registryConfig.path}/${registryConfig.filename}`

  if (existsSync(dest)) {
    const registryJSON: IRegistryJson = JSON.parse(readFileSync(dest, 'utf8'))
    registry.hosts = registryJSON.hosts
    registry.downloads = convertRegistryDownloads(registryJSON.downloads)
  }

  return registry
}

const syncRegistry = async () => {
  try {
    const destZip = `${registryConfig.path}/${registryConfig.zipFilename}`
    const destJson = `${registryConfig.path}/${registryConfig.filename}`
    const infoDest = `${registryConfig.path}/${registryConfig.infoFilename}`

    let index = 0
    let result = false
    let url = ''
    let infoUrl = ''
    let currentRegistryInfo: IRegistryInfoJson = { version: 0 }
    let registryInfo: IRegistryInfoJson = null

    // read current "registry_info"
    if (existsSync(infoDest)) {
      currentRegistryInfo = JSON.parse(readFileSync(infoDest, 'utf8'))
    }

    // read "registry_info" from server
    while (!registryInfo?.version && index < registryConfig.urls.length) {
      infoUrl = registryConfig.urls[index].info
      registryInfo = await getUrl(infoUrl)
      index += 1
    }

    // check "registry_info" versions
    const isLastRegistry = registryInfo?.version <= currentRegistryInfo?.version

    if (isLastRegistry && existsSync(destJson)) {
      return getRegistry()
    }

    // remove registry files
    unlink(infoDest, () => {})
    unlink(destJson, () => {})

    // create "registry_info"
    writeFileSync(infoDest, JSON.stringify(registryInfo))

    index = 0
    result = false

    // download "registry" archive
    while (!result && index < registryConfig.urls.length) {
      url = registryConfig.urls[index].registry
      result = await download(url, destZip)
      index += 1
    }

    // unzip and remove "registry" archive
    await unzip(destZip, registryConfig.path)
    unlink(destZip, () => {})
  } catch (err) {
    console.error(err)
  }

  return getRegistry()
}

export default { getRegistry, syncRegistry }
