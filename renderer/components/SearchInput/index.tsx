import React, { FC } from 'react'
import noop from 'helpers/noop'

import { ISearchInputProps } from './types'
import { SSearchInput } from './styled.index'
import useBase from './useBase'

const SearchInput: FC<ISearchInputProps> = ({ className, style, qa, ...props }) => {
  const { placeholder } = props
  const { value, handleChange, handleSubmit } = useBase(props)

  return (
    <SSearchInput
      className={className}
      style={style}
      data-qa={qa}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

SearchInput.defaultProps = {
  qa: 'SearchInput',
  initialValue: '',
  placeholder: 'Enter a verse reference',
  onChange: noop,
  onSubmit: noop,
}

export default SearchInput
