import { readFileSync } from 'fs'
import { IRegistryJson } from 'common/types'
import { IRegistry } from './types'
import registryConfig from '../../config/registryConfig'
import { convertRegistryDownloads } from './helpers'

const registry: IRegistry = { hosts: [], downloads: [] }

const getRegistry = (): IRegistry => {
  const registryJSON: IRegistryJson = JSON.parse(readFileSync(`${registryConfig.path}/${registryConfig.filename}`, 'utf8'))
  registry.hosts = registryJSON.hosts
  registry.downloads = convertRegistryDownloads(registryJSON.downloads)
  
  return registry
}

const syncRegistry = async (): Promise<IRegistry> => {
  try {
    // TODO: sync and download last registry.json
    return registry
  } catch (err) {
    console.error(err)
  }
}

export default { getRegistry, syncRegistry }
