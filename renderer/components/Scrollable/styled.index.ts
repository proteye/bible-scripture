import styled, { css } from 'styled-components'
import { IStyledThemeWithDimensions } from 'components/types'
import { getStyleNumber } from 'helpers/getStyleNumber'
import { Scrollbar } from 'react-scrollbars-custom'

export const SScrollable = styled(Scrollbar)<IStyledThemeWithDimensions>(
  ({ $dimensions }) => css`
    width: ${$dimensions.width ? getStyleNumber(String($dimensions.width)) : '100%'};
    height: ${$dimensions.height ? getStyleNumber(String($dimensions.height)) : '100%'};

    .ScrollbarsCustom-Wrapper {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `,
)
