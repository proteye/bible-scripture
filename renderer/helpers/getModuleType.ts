import { EModuleType } from 'types/common'

export const getModuleType = (filename: string) => {
  const moduleTypeKeys = Object.keys(EModuleType)
  const splittedFilename = filename.split('.')
  const lastFilPart = splittedFilename?.[splittedFilename.length - 1]

  return moduleTypeKeys.includes(lastFilPart) ? (lastFilPart as EModuleType) : EModuleType.bible
}
