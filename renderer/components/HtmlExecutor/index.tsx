import React, { FC } from 'react'

import { IHtmlExecutorProps } from './types'

const HtmlExecutor: FC<IHtmlExecutorProps> = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: children,
    }}
  />
)

export default HtmlExecutor
