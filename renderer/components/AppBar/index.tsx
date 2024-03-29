import { FC } from 'react'
import { IAppBarProps } from './types'

const AppBar: FC<IAppBarProps> = ({ className, children }) => (
  <div className={`flex h-16 w-full border-b border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 ${className}`}>
    {children}
  </div>
)

AppBar.defaultProps = {
  className: '',
}

export default AppBar
