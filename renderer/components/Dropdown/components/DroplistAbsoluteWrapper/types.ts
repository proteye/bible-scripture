import { RefObject } from 'react'

import { IDropdownApi, IDroplistPosition, IDroplistState, TIsPanel } from 'components/Dropdown/types'

export interface IStyledDroplistAbsoluteWrapper {
  /** `true` отображать как выдвижную панель (моб), `false` обычный выпадающий список */
  $isPanel: TIsPanel
  $position: IDroplistPosition
  /** z-index элемента */
  $zIndex: number
}

export interface IDroplistAbsoluteWrapperProps extends IDroplistState, IDropdownApi {
  /** `true` отображать как выдвижную панель (моб), `false` обычный выпадающий список */
  isPanel?: TIsPanel
  triggerRef: RefObject<HTMLDivElement>
  /** z-index элемента */
  zIndex?: number
}
