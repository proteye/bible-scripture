import React, { FC } from 'react'
import { ComponentWithScroll, HtmlExecutor } from 'components'

import { SInstantView } from './styled.index'
import { IInstantViewProps } from './types'

export const InstantView: FC<IInstantViewProps> = ({ htmlText, dimensions }) => {
  return (
    <ComponentWithScroll dimensions={dimensions}>
      <SInstantView>
        <HtmlExecutor>{htmlText}</HtmlExecutor>
      </SInstantView>
    </ComponentWithScroll>
  )
}
