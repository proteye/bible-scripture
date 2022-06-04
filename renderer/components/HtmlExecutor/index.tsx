import React, { FC } from 'react'
import { sanitize } from 'helpers/sanitize'

import { IHtmlExecutorProps } from './types'

const HtmlExecutor: FC<IHtmlExecutorProps> = ({ as, children }) => {
  const innerHtml = sanitize(children)

  return as === 'p' ? <p dangerouslySetInnerHTML={innerHtml} /> : <span dangerouslySetInnerHTML={innerHtml} />
}

HtmlExecutor.defaultProps = {
  as: 'span',
}

export default HtmlExecutor
