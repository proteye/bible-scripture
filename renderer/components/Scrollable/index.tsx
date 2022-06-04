import { TAny } from '@common/types'
import React, { FC, forwardRef } from 'react'
import { IScrollableProps } from './types'

const Scrollable: FC<IScrollableProps> = forwardRef<TAny, IScrollableProps>(
  ({ dimensions, className, style, qa, children }, ref) => (
    <div noDefaultStyles noScrollX $dimensions={dimensions} className={className} style={style} data-qa={qa} ref={ref}>{children}</div>
  )
)

Scrollable.defaultProps = {
  dimensions: { width: '100%', height: '100%' },
  qa: 'Scrollable',
}

export default Scrollable
