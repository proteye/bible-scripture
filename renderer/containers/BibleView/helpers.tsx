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
  const spaceClearedText = text
    .replace(/<n>.+?n>/gi, '')
    .replace(/\s+(<[SJefimt]>)\s*(.+?)\s*([SJefimt]>)/gi, '$1$2$3')
    .replace(/([:,\.]<S>.+?S>)\s*/gi, '$1 ')
  const preparedMakkefText = spaceClearedText.split(MAKKEF).join(` ${MAKKEF} `)
  const splittedText = preparedMakkefText.split(' ')
  const preparedSplittedText = splittedText.reduce(
    (prev, curr, idx) =>
      curr === MAKKEF || splittedText[idx + 1] === MAKKEF ? prev.concat(curr) : prev.concat(curr, ' '),
    [],
  )
  let isJesus = false
  let isJesusEnd = false
  let isEmphasized = false
  let isEmphasizedEnd = false

  return preparedSplittedText.map((word, index) => {
    // Strong
    const strongMatches = word.match(strongRegexp)
    const strongNumber = strongMatches?.length > 1 ? strongMatches[1] : null
    const strongPrefix = strongNumbersPrefix || (bookNumber < NT_BEGIN_BOOK_NUMBER ? 'H' : 'G')
    // Morphology
    const morphologyMatches = word.match(morphologyRegexp)
    const morphologyIndication = morphologyMatches?.length > 1 ? morphologyMatches[1] : null
    // Jesus said?
    isJesus = isJesus || word.includes('<J>')
    isJesusEnd = word.includes('</J>')
    // Is emphasized?
    isEmphasized = isEmphasized || word.includes('<e>')
    isEmphasizedEnd = word.includes('</e>')

    const preparedWord = word
      .replace(/<[Smfhn]>.+?[Smfhn]>/gi, '')
      .replace(/<\/?J>/gi, '')
      .replace(/<\/?e>/gi, '')
      .replace(/<\/?i>/gi, '')
      .replace(/<\/?t>/gi, '"')
      .replace(/<pb\/>/gi, '')
      .replace(/<br\/>/gi, '')

    if (preparedWord === ' ') {
      return ' '
    }

    if (preparedWord === MAKKEF || preparedWord === PIPE) {
      return <span key={`${index}-${preparedWord}`}>{preparedWord}</span>
    }

    let className = `${isJesus ? 'text-red-700' : ''}${isEmphasized && !isJesus ? ' text-black' : ''}${
      isEmphasized ? ' font-bold' : ''
    }`

    if (isHover) {
      className += ' hover:bg-blue-200 selection:hover:bg-blue-200'
    }

    if (isJesusEnd) {
      isJesus = false
      isJesusEnd = false
    }

    if (isEmphasizedEnd) {
      isEmphasized = false
      isEmphasizedEnd = false
    }

    return (
      <span
        key={`${index}-${preparedWord}`}
        className={className}
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
