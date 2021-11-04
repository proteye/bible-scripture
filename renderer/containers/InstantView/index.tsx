import React, { FC } from 'react'
import { HtmlExecutor } from 'components'

import { SInstantView, SComponentWithScroll } from './styled.index'
import { IInstantViewProps } from './types'

export const InstantView: FC<IInstantViewProps> = ({ htmlText, dimensions }) => {
  return (
    <SComponentWithScroll dimensions={dimensions}>
      <SInstantView>
        <HtmlExecutor>{htmlText}</HtmlExecutor>
      </SInstantView>
    </SComponentWithScroll>
  )
}
