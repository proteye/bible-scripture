import React, { MouseEvent } from 'react'
import { IBibleVerse, IBibleInfo, TAny } from '@common/types'
import { IBiblePreapredVerse } from './types'
import { MAKKEF, morphologyRegexp, NT_BEGIN_BOOK_NUMBER, PIPE, strongRegexp } from './constants'

export const getStrongNumbersPrefix = (info: IBibleInfo[]) => {
  const strongNumbersPrefix = info.find(({ name }) => name === 'strong_numbers_prefix')

  return strongNumbersPrefix?.value
}

export const prepareVerseText = ({
  text,
  bookNumber,
  strongNumbersPrefix,
  isHover,
  onMouseEnter,
}: {
  text: string
  bookNumber: number
  strongNumbersPrefix?: string
  isHover?: boolean
  onMouseEnter?: (e: MouseEvent<HTMLSpanElement>) => void
}) => {
  const spaceClearedText = text.replace(/<n>.+?n>/gi, '').replace(/\s+(<[SJfim]>)\s*(.+?)\s*([SJfim]>)/gi, '$1$2$3')
  const preparedMakkefText = spaceClearedText.split(MAKKEF).join(` ${MAKKEF} `)
  const splittedText = preparedMakkefText.split(' ')
  const preparedSplittedText = splittedText.reduce(
    (prev, curr, idx) =>
      curr === MAKKEF || splittedText[idx + 1] === MAKKEF ? prev.concat(curr) : prev.concat(curr, ' '),
    [],
  )

  return preparedSplittedText.map((word, index) => {
    // Strong
    const strongMatches = word.match(strongRegexp)
    const strongNumber = strongMatches?.length > 1 ? strongMatches[1] : null
    const strongPrefix = strongNumbersPrefix || (bookNumber < NT_BEGIN_BOOK_NUMBER ? 'H' : 'G')
    // Morphology
    const morphologyMatches = word.match(morphologyRegexp)
    const morphologyIndication = morphologyMatches?.length > 1 ? morphologyMatches[1] : null

    const preparedWord = word
      .replace(/<[Sfim]>.+?[Sfim]>/gi, '')
      .replace(/<\/?J>/gi, '')
      .replace(/<pb\/>/gi, '')
      .replace(/<\/?t>/gi, '"')

    if (preparedWord === ' ') {
      return ' '
    }

    if (preparedWord === MAKKEF || preparedWord === PIPE) {
      return <span key={`${index}-${preparedWord}`}>{preparedWord}</span>
    }

    return (
      <span
        key={`${index}-${preparedWord}`}
        className={isHover ? 'hover:bg-blue-200 selection:hover:bg-blue-200' : ''}
        data-strong={strongNumber ? `${strongPrefix}${strongNumber}` : null}
        data-morphology={morphologyIndication}
        onMouseEnter={onMouseEnter}
      >
        {preparedWord}
      </span>
    )
  })
}

export const prepareVerses = (
  verses: IBibleVerse[],
  strongNumbersPrefix: string,
  isHover: boolean,
  onMouseEnter: (e: TAny) => void,
): IBiblePreapredVerse[] =>
  verses?.map((verse: IBibleVerse) => ({
    ...verse,
    preparedText: prepareVerseText({
      text: verse.text,
      bookNumber: verse.bookNumber,
      strongNumbersPrefix,
      isHover,
      onMouseEnter,
    }),
  }))
