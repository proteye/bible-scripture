import { FC } from 'react'
import noop from 'helpers/noop'

import { ETabType, ITabProps } from './types'

const Tab: FC<ITabProps> = () => {
  return null
}

Tab.defaultProps = {
  label: '',
  value: '',
  type: ETabType.tab,
  onActive: noop,
}

export default Tab
