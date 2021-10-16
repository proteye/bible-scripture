import { FC } from 'react'
import noop from 'helpers/noop'

import { ITabProps } from './types'

const Tab: FC<ITabProps> = () => {
  return null
}

Tab.defaultProps = {
  label: '',
  value: '',
  onActive: noop,
}

export default Tab
