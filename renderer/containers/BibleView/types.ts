import { IComponentWithDimensions } from 'components/types'

export interface IBibleViewProps extends IComponentWithDimensions {
  moduleName?: string
}

export enum EBibleNames {
  RST_STR = 'RST+',
  CAS = 'CAS',
}
