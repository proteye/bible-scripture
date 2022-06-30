const isProd: boolean = process.env.NODE_ENV === 'production'

const registryConfig = {
  path: isProd ? `${process.resourcesPath}/registry` : './resources/registry',
  filename: 'registry.json',
}

export default registryConfig
