import { TAny } from '@common/types'
import React, { FC, forwardRef } from 'react'
import { IScrollableProps } from './types'
import { getStyleNumber } from 'helpers/getStyleNumber'

const Scrollable: FC<IScrollableProps> = forwardRef<TAny, IScrollableProps>(
  ({ dimensions: { width, height }, className = '', style, qa, children }, ref) => (
    <div
      className={`flex flex-col ${height ? `h-[${getStyleNumber(String(height))}]` : 'flex-grow'} ${
        width ? `w-[${getStyleNumber(String(width))}]` : 'w-full'
      } overflow-y-scroll ${className}`}
      style={style}
      data-qa={qa}
      ref={ref}
    >
      {children}
    </div>
  ),
)

Scrollable.defaultProps = {
  dimensions: { width: null, height: null },
  className: '',
  qa: 'Scrollable',
}

export default Scrollable
