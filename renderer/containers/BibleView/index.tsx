import React, { FC } from 'react'

import { SBibleView } from './styled.index'
import { IBibleViewProps } from './types'

import useBase from './useBase'
import { ComponentWithScroll } from 'components'

export const BibleView: FC<IBibleViewProps> = ({ moduleName, dimensions }) => {
  const { verses } = useBase({ moduleName })

  return (
    <ComponentWithScroll dimensions={dimensions}>
      <SBibleView>
        {verses.map(({ verse, text }) => (
          <div key={verse}>
            {verse}. {text.replace(/<[Sfi]>.+?[Sfi]>/gi, '').replace(/<pb\/>/gi, '')}
          </div>
        ))}
      </SBibleView>
    </ComponentWithScroll>
  )
}
