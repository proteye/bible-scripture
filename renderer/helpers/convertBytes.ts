const convertBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (!bytes) {
    return 'n/a'
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10)

  if (i == 0) {
    return bytes + ' ' + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

export default convertBytes
