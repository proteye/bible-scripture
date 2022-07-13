import { IDownloadProgress } from '@common/types'

/**
 * Get download progress in percent
 * @param progress - {total, downloaded}
 * @returns - percent number
 */
export const getDownloadProgress = ({ total, downloaded }: IDownloadProgress) => {
  let percent = total > 0 && downloaded > 0 ? Math.ceil(downloaded / (total / 100)) : 0
  return percent > 100 ? 100 : percent
}
