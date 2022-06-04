import { MouseEvent } from 'react'

import { IDropdownApi, IDroplistState } from '../types'

export interface IUseDropdown extends IDroplistState, IDropdownApi {
  /** Должен быть установлен на элемент, к которому происходит привязка (к его x0, y1) */
  onClick(evt: MouseEvent): void
}
