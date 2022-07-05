const convertRegistrySize = (size: string) => {
  if (/^[0-9]+$/gi.test(size)) {
    return `${size} Bytes`
  }

  const sizes = { k: 'KB', m: 'MB', g: 'GB' }

  const lastChar = size[size.length - 1].toLowerCase()

  return `${size.slice(0, -1)} ${sizes[lastChar]}`
}

export default convertRegistrySize
