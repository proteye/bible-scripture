import { FC } from 'react'
import { createPortal } from 'react-dom'
import { isServer } from 'helpers/isServer'

import { IPortalProps } from './types'

import useBase from './useBase'

const Portal: FC<IPortalProps> = ({ children, className, qa }) => {
  const target = useBase(className, qa)

  if (isServer()) {
    return null
  }

  return createPortal(children, target)
}

Portal.defaultProps = {
  className: null,
  qa: null,
}

export default Portal
