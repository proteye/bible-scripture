import React, { FC } from 'react'
import { HtmlExecutor, Scrollable } from 'components'

import { SInstantView, SWrapper } from './styled.index'
import { IInstantViewProps } from './types'

export const InstantView: FC<IInstantViewProps> = ({ htmlText }) => {
  return (
    <SInstantView>
      <Scrollable >
        <SWrapper>
          <HtmlExecutor>{htmlText}</HtmlExecutor>
        </SWrapper>
      </Scrollable>
    </SInstantView>
  )
}
