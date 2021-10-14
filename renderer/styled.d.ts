import 'styled-components'
import { AppTheme } from 'theme/types'

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
