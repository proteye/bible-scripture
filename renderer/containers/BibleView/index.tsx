import React, { FC } from 'react'
import { ComponentWithScroll, SearchInput } from 'components'

import { SBibleView, SSearchPanel } from './styled.index'
import { IBibleViewProps } from './types'

import useBase from './useBase'

export const BibleView: FC<IBibleViewProps> = ({ moduleName, dimensions }) => {
  const { verses, handleSearchSubmit } = useBase({ moduleName })

  return (
    <>
      <SSearchPanel>
        <SearchInput onSubmit={handleSearchSubmit} />
      </SSearchPanel>
      <ComponentWithScroll dimensions={dimensions}>
        <SBibleView>
          {verses.map(({ verse, text }) => (
            <div key={verse}>
              {verse}.{' '}
              {text
                .replace(/<[Sfim]>.+?[Sfim]>/gi, '')
                .replace(/<pb\/>/gi, '')
                .replace(/<\/?t>/gi, '"')}
            </div>
          ))}
        </SBibleView>
      </ComponentWithScroll>
    </>
  )
}
