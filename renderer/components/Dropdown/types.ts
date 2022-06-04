import { IComponentDefaultProps } from '../types'
import { InputSize } from 'components/Input/types'

/** Возможные размеры, аналогичны Input: small, medium, large */
export type TDropdownSize = InputSize

/** Заголовок выпадающего списка, используется в мобильной версии (`isPanel = true`) */
export type TDroplistTitle = string

/** Отображение вариантов как выдвижной панели (`true`, мобильная версия), либо обычный выпадающий список (`false`)  */
export type TIsPanel = boolean

/** Абсолютная координата */
export interface IDroplistPosition {
  /** y1 */
  top: number
  /** x0 */
  left: number
}

export interface IDropdownApi {
  /** Закрытие Droplist */
  close(): void
}

export interface IDroplistState {
  /** Состояние открыт/закрыт */
  isOpen: boolean
  /** Абсолютная координата left/top для привязки Droplist к Input */
  position: IDroplistPosition
}

/** ID варианта */
export type TDropdownValue = string

export interface IDroplistItem {
  /** label для ID варианта (по аналогии с <select> <option>) */
  text: string
  value: TDropdownValue
}

export interface IDropdownProps extends IComponentDefaultProps {
  /** Возможные размеры, аналогичны Input: small, medium, large */
  size: TDropdownSize
  /** Заголовок выпадающего списка, используется в мобильной версии (`isPanel = true`) */
  title?: TDroplistTitle
  /** Список вариантов */
  items: IDroplistItem[]
  // TODO: отобразить в UI hint и error
  /** Подсказка */
  hint?: string
  /** Текст ошибок */
  error?: boolean
  placeholder?: string
  /** Предвыбранное значение */
  value?: TDropdownValue
  /** Должно ли width значение droplist соответствовать input width */
  droplistWidthAsInput?: boolean
  /** Коллбек на выбор варианта */
  onSelect?(value: TDropdownValue): void
  /** Высота контейнера Droplist */
  height?: number
  /** z-index контейнера Droplist */
  droplistZIndex?: number
  /** Состояние disabled */
  disabled?: boolean
  /** Состояние readOnly */
  readOnly?: boolean
}

export interface IStyledInputWrapper {
  /** Состояние открыт/закрыт */
  $isOpen: boolean
  /** Возможные размеры, аналогичны Input: small, medium, large */
  $size: TDropdownSize
}
