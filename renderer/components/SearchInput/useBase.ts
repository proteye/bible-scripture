import { useState } from 'react'
import { ISearchInputProps } from './types'

const useBase = ({ initialValue, onChange, onSubmit }: ISearchInputProps) => {
  const [value, setValue] = useState<string>(initialValue)

  const handleChange = (e: any) => {
    const value = e.target.value
    setValue(value)
    onChange(value)
  }

  const handleSubmit = () => {
    onSubmit(value)
  }

  return {
    value,
    handleChange,
    handleSubmit,
  }
}

export default useBase
