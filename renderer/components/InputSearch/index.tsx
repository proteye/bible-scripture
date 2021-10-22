import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IInputSearchProps } from './types'
import { SInputSearch, SForm } from './styled.index'
import useBase from './useBase'

const InputSearch: FC<IInputSearchProps> = ({ className, style, qa, ...props }) => {
  const { placeholder } = props
  const { value, handleChange, handleSubmit } = useBase(props)

  return (
    <SForm onSubmit={handleSubmit}>
      <SInputSearch
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

InputSearch.defaultProps = {
  qa: 'InputSearch',
  initialValue: '',
  placeholder: 'Enter a verse reference',
  onChange: noop,
  onSubmit: noop,
}

export default InputSearch
