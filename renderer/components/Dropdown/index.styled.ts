import { DropdownStatus, DropdownStatusLg } from '@dasreda/icons'
import styled, { css } from 'styled-components'

import { IStyledInputWrapper } from './types'

import Input from 'components/Input'

export const StyledDropdownStatus = styled(DropdownStatus)`
  ${({ theme }) => css`
    width: ${theme.spacings.s24};
    height: ${theme.spacings.s24};
    fill: ${theme.palette.textGray};
  `}
`

export const StyledDropdownStatusLg = styled(DropdownStatusLg)`
  ${({ theme }) => css`
    width: ${theme.spacings.s24};
    height: ${theme.spacings.s24};
    fill: ${theme.palette.textGray};
  `}
`

export const StyledInputTrigger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
`

export const StyledInputWrapper = styled.div<IStyledInputWrapper>`
  ${({ theme, $isOpen, $size }) => css`
    position: relative;
    display: inline-block;

    ${StyledDropdownStatus},
    ${StyledDropdownStatusLg} {
      position: absolute;
      top: 50%;
      right: ${$size === 'small' ? theme.spacings.s10 : theme.spacings.s12};
      transform: translateY(-50%) scale(${$isOpen ? -1 : 1});
      transition: transform 0.2s ease-in-out;
    }
  `}
`

export const SDropDropDownInput = styled(Input)`
  width: 100%;
  pointer-events: none;

  input {
    background-clip: padding-box;
  }
`
