import { useState } from 'react'
import { IInputSearchProps } from './types'

const useBase = ({ initialValue, onChange, onSubmit }: IInputSearchProps) => {
  const [value, setValue] = useState<string>(initialValue)

  const handleChange = (e: any) => {
    const value = e.target.value
    setValue(value)
    onChange(value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(value)
  }

  return {
    value,
    handleChange,
    handleSubmit,
  }
}

export default useBase
