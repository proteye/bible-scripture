import React, { FC } from 'react'
import { HtmlExecutor } from 'components'

import { IInstantViewProps } from './types'

export const InstantView: FC<IInstantViewProps> = ({ htmlText }) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-full h-1/4 border-t border-gray-300 bg-gray-100 overflow-y-scroll">
      <div className="p-4">
        <HtmlExecutor>{htmlText}</HtmlExecutor>
      </div>
    </div>
  )
}
