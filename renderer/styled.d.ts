import 'styled-components'
import { AppDefaultTheme } from 'theme/types'

declare module 'styled-components' {
  interface DefaultTheme extends AppDefaultTheme {}
}
