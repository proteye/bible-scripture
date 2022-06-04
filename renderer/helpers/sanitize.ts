import { sanitizeDefaultOptions } from 'constants/common'

import sanitizeHtml from 'sanitize-html'

export const sanitize = (dirtyHtml: string, options?: sanitizeHtml.IOptions) => ({
  __html: sanitizeHtml(dirtyHtml, { ...sanitizeDefaultOptions, ...options }),
})
