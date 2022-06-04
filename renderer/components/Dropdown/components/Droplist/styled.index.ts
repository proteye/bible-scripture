import { Checked } from '@dasreda/icons'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { IStyledDroplistItemProps, IStyledDroplistProps } from './types'

import mediaOld from 'components/media'

export const StyledChecked = styled(Checked)`
  ${({ theme }) => css`
    position: absolute;
    top: 50%;
    right: ${theme.spacings.s8};
    width: ${theme.spacings.s24};
    height: ${theme.spacings.s24};
    margin-top: 1px;
    transform: translateY(-50%);
    fill: ${theme.palette.emerald};
  `}
`

export const StyledDroplistItems = styled(motion.ul)`
  margin: -${({ theme }) => theme.spacings.s6} 0;
  padding: 0;
  overflow-y: hidden;
`

export const StyledDroplistItem = styled(motion.li)<IStyledDroplistItemProps>`
  ${({ theme, $size }) => css`
    position: relative;
    display: block;
    padding: ${theme.spacings.s6} 0;
    overflow: hidden !important;
    font: ${$size === 'small'
      ? theme.fontSystem.extraSmall
      : $size === 'medium'
      ? theme.fontSystem.small
      : theme.fontSystem.middle};
    white-space: nowrap;
    text-overflow: ellipsis;
    list-style: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    ${mediaOld.xl`
      &:hover {
        color: ${theme.palette.emerald};
      }
    `}
  `}
`

export const StyledDroplistHeader = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: ${theme.spacings.s8} ${theme.spacings.s14} ${theme.spacings.s24} 0;
  `}
`

export const StyledDroplistTitle = styled.div`
  ${({ theme }) => css`
    color: ${theme.palette.textGraphite};
    font: ${theme.font.mobile.h2};
  `}
`

export const StyledDroplistCancel = styled.button`
  padding: 0;
  background-color: transparent;
  border: 0;

  ${({ theme }) => css`
    color: ${theme.palette.textGray};
    font: ${theme.font.mobile.p2};
  `}

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const StyledDroplist = styled.div<IStyledDroplistProps>`
  ${({ theme, $isPanel }) => css`
    width: ${$isPanel ? '100%' : '348px'};
    padding: ${theme.spacings.s16} ${theme.spacings.s8} ${theme.spacings.s16}
      ${$isPanel ? theme.spacings.s24 : theme.spacings.s16};
    background-color: ${theme.palette.white};
    border-radius: ${theme.radius.r20};
    box-shadow: ${theme.palette.dropdownShadow};

    ${$isPanel &&
    css`
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    `}
  `}
`
