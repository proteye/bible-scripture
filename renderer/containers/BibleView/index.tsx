import React, { FC } from 'react'
import { ContentByLang, InputSearch, Scrollable } from 'components'

import { IBibleViewProps } from './types'

import useBase from './useBase'

export const BibleView: FC<IBibleViewProps> = (props) => {
  const { verses, language, verseClass, handleSearchSubmit } = useBase(props)

  if (!language) {
    return null
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex flex-shrink-0 w-full h-12 py-2 px-3 bg-blue-300">
        <InputSearch placeholder="Иоан 3:16" onSubmit={handleSearchSubmit} />
      </div>
      <Scrollable className={`p-4 text-lg select-text text-gray-800 bg-white selection:bg-gray-300`}>
        <ContentByLang lang={language}>
          {verses.map(({ verse, preparedText }) => (
            <div key={verse}>
              <span className={verseClass}>
                {verse}
                {language !== 'iw' ? '. ' : ' '}
              </span>
              {preparedText}
            </div>
          ))}
        </ContentByLang>
      </Scrollable>
    </div>
  )
}
