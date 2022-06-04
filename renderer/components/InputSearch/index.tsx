import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IInputSearchProps } from './types'
import useBase from './useBase'

const InputSearch: FC<IInputSearchProps> = ({ className, style, qa, ...props }) => {
  const { placeholder } = props
  const { value, handleChange, handleSubmit } = useBase(props)

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={className}
        style={style}
        data-qa={qa}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </form>
  )
}

InputSearch.defaultProps = {
  qa: 'InputSearch',
  initialValue: '',
  placeholder: 'Enter a verse reference',
  onChange: noop,
  onSubmit: noop,
}

export default InputSearch
