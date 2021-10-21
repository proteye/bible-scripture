import React, { FC } from 'react'
import noop from 'helpers/noop'

import { ISearchInputProps } from './types'
import { SSearchInput, SForm } from './styled.index'
import useBase from './useBase'

const SearchInput: FC<ISearchInputProps> = ({ className, style, qa, ...props }) => {
  const { placeholder } = props
  const { value, handleChange, handleSubmit } = useBase(props)

  return (
    <SForm onSubmit={handleSubmit}>
      <SSearchInput
        className={className}
        style={style}
        data-qa={qa}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </SForm>
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
