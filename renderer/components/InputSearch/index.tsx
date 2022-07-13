import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IInputSearchProps } from './types'
import useBase from './useBase'

const InputSearch: FC<IInputSearchProps> = ({ className, style, qa, ...props }) => {
  const { placeholder } = props
  const { value, handleChange, handleSubmit } = useBase(props)

  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <input
        className={`inline-block w-full px-4 rounded ${className}`}
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
  initialValue: '',
  placeholder: 'Enter a verse reference',
  className: '',
  onChange: noop,
  onSubmit: noop,
}

export default InputSearch
