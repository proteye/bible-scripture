import React, { FC } from 'react'
import { ComponentWithScroll, InputSearch } from 'components'

import { SBibleView, SSearchPanel } from './styled.index'
import { IBibleViewProps } from './types'

import useBase from './useBase'

export const BibleView: FC<IBibleViewProps> = ({ moduleName, dimensions, onGetDictionaryTopic }) => {
  const { verses, handleSearchSubmit } = useBase({ moduleName, onGetDictionaryTopic })

  return (
    <>
      <SSearchPanel>
        <InputSearch onSubmit={handleSearchSubmit} />
      </SSearchPanel>
      <ComponentWithScroll dimensions={dimensions}>
        <SBibleView>
          {verses.map(({ verse, preparedText }) => (
            <div key={verse}>
              {verse}. {preparedText}
            </div>
          ))}
        </SBibleView>
      </ComponentWithScroll>
    </>
  )
}
