import React, { FC } from 'react'
import noop from 'helpers/noop'

import { MyButton } from './styled.index'
import { IBibleProps } from './types'

import useBase from './useBase'

export const Bible: FC<IBibleProps> = ({ onClick }) => {
  const { verses } = useBase()

  return (
    <div>
      {verses.map(({ verse, text }) => (
        <div key={verse}>
          {verse}. {text.replace(/<[Sfi]>.+?[Sfi]>/gi, '').replace(/<pb\/>/gi, '')}
        </div>
      ))}
      <MyButton onClick={onClick}>Bible</MyButton>
    </div>
  )
}

Bible.defaultProps = {
  onClick: noop,
}
