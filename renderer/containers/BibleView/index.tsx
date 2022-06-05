import React, { FC } from 'react'
import { ContentByLang, InputSearch, Scrollable } from 'components'

import { IBibleViewProps } from './types'

import useBase from './useBase'

export const BibleView: FC<IBibleViewProps> = ({ moduleName, onGetDictionaryTopic }) => {
  const { verses, language, verseClass, handleSearchSubmit } = useBase({ moduleName, onGetDictionaryTopic })

  if (!language) {
    return null
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex flex-shrink-0 w-full h-10 py-2 px-3 bg-blue-300">
        <InputSearch onSubmit={handleSearchSubmit} />
      </div>
      <Scrollable className={`p-4 text-lg select-text bg-gray-50 selection:bg-gray-300`}>
        <ContentByLang lang={language}>
          {verses.map(({ verse, preparedText }) => (
            <div key={verse}>
              <span className={verseClass}>
                {verse}
                {language !== 'iw' ? '.' : ''}
              </span>{' '}
              {preparedText}
            </div>
          ))}
        </ContentByLang>
      </Scrollable>
    </div>
  )
}
