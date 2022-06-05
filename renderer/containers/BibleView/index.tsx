import React, { FC } from 'react'
import { ContentByLang, InputSearch } from 'components'

import { IBibleViewProps } from './types'

import useBase from './useBase'

export const BibleView: FC<IBibleViewProps> = ({ moduleName, dimensions, onGetDictionaryTopic }) => {
  const { verses, language, handleSearchSubmit } = useBase({ moduleName, onGetDictionaryTopic })

  if (!language) {
    return null
  }

  return (
    <>
      <div className='flex w-full h-10 py-2 px-3 bg-blue-300'>
        <InputSearch onSubmit={handleSearchSubmit} />
      </div>
      {/* <Scrollable> */}
      <div className={`flex flex-col w-full h-auto p-4 text-lg`}>
        <ContentByLang lang={language}>
          {verses.map(({ verse, preparedText }) => (
            <div key={verse}>
              {verse}. {preparedText}
            </div>
          ))}
        </ContentByLang>
      </div>
      {/* </Scrollable> */}
    </>
  )
}
