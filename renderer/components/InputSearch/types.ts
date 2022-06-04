import { IComponentDefaultProps } from 'components/types'

export interface IInputSearchProps extends IComponentDefaultProps {
  initialValue?: string
  placeholder?: string
  onChange?(value: string): void
  onSubmit?(value: string): void
}
