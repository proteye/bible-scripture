import styled, { css } from 'styled-components'
import { IStyledThemeWithDimensions } from 'components/types'
import { getNumberFromString } from 'helpers/getNumberFromString'

export const SComponentWithScroll = styled.div<IStyledThemeWithDimensions>(
  ({ $dimensions }) => css`
    display: block;
    width: ${$dimensions.width ? `${getNumberFromString(String($dimensions.width))}px` : '100%'};
    height: ${$dimensions.height ? `${getNumberFromString(String($dimensions.height))}px` : '100%'};
    overflow-y: scroll;
  `,
)
