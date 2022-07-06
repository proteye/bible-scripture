const isProd: boolean = process.env.NODE_ENV === 'production'

const registryConfig = {
  path: isProd ? `${process.resourcesPath}/registry` : './resources/registry',
  filename: 'registry.json',
  zipFilename: 'registry.zip',
  infoFilename: 'registry_info.json',
  urls: [
    {
      info: 'https://dl.dropbox.com/s/1odi2f2tyn1oqyx123/registry_info.json',
      registry: 'https://dl.dropbox.com/s/peatcjj6azrnj0u/registry.zip',
    },
    {
      info: 'http://mph4.ru/registry_info.json',
      registry: 'http://mph4.ru/registry.zip',
    },
    {
      info: 'http://s3.igrnt.info/registry_info.json',
      registry: 'http://s3.igrnt.info/registry.zip',
    },
    {
      info: 'http://myb.1gb.ru/registry_info.json',
      registry: 'http://myb.1gb.ru/registry.zip',
    },
    {
      info: 'http://mybible.i-t.kz/registry_info.json',
      registry: 'http://mybible.i-t.kz/registry.zip',
    },
  ],
}

export default registryConfig
