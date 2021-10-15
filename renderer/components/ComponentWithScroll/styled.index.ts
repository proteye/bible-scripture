import styled, { css } from 'styled-components'
import { IStyledThemeWithDimensions } from 'components/types'

export const SComponentWithScroll = styled.div<IStyledThemeWithDimensions>(
  ({ $dimensions }) => css`
    display: block;
    width: ${$dimensions.width ? `${$dimensions.width}px` : '100%'};
    height: ${$dimensions.height ? `${$dimensions.height}px` : '100%'};
    overflow-y: scroll;
  `,
)
