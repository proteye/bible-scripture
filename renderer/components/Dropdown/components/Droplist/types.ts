import { RefObject } from 'react'

import { IDroplistItem, TDropdownSize, TDropdownValue, TDroplistTitle, TIsPanel } from 'components/Dropdown/types'

export interface IDroplistProps {
  /** Должно ли width значение droplist соответствовать input width */
  droplistWidthAsInput?: boolean
  /** Список значений */
  items: IDroplistItem[]
  /** ref input-элемента */
  inputRef?: RefObject<HTMLInputElement>
  /** `true` отображать как выдвижную панель (моб), `false` обычный выпадающий список */
  isPanel?: TIsPanel
  /** Возможные размеры, аналогичны Input: small, medium, large */
  size: TDropdownSize
  /** Заголовок выпадающего списка, используется в мобильной версии (`isPanel = true`) */
  title?: TDroplistTitle
  /** Предвыбранное значение */
  value?: TDropdownValue
  /** Коллбек на клик по элементу списка */
  onSelect(value: string): void
  /** Ф-ия закрытия */
  close(): void
  /** Высота контейнера Droplist */
  height?: number
}

export interface IStyledDroplistProps {
  /** `true` отображать как выдвижную панель (моб), `false` обычный выпадающий список */
  $isPanel?: TIsPanel
}

export interface IStyledDroplistItemProps {
  /** Возможные размеры, аналогичны Input: small, medium, large */
  $size: TDropdownSize
}
