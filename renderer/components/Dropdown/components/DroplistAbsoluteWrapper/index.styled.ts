import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { IStyledDroplistAbsoluteWrapper } from './types'

export const StyledDroplistMobileBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.backgroundOverlay};
  touch-action: none;
`

export const StyledDroplistAbsoluteWrapper = styled(motion.div)<IStyledDroplistAbsoluteWrapper>`
  ${({ theme, $isPanel, $position, $zIndex }) => css`
    z-index: ${$zIndex || 100};
    padding-top: ${theme.spacings.s4};

    ${$isPanel
      ? css`
          position: fixed;
          right: 0;
          bottom: 0;
          left: 0;
        `
      : css`
          position: absolute;
          top: ${$position.top}px;
          left: ${$position.left}px;
        `}
  `}
`
