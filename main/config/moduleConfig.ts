const isProd: boolean = process.env.NODE_ENV === 'production'

const moduleConfig = {
  path: isProd ? `${process.resourcesPath}/modules` : './resources/modules',
  extension: '.SQLite3',
}

export default moduleConfig
