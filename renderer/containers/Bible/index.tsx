import React, { FC } from 'react'
import noop from 'helpers/noop'

import { MyButton } from './styled.index'
import { IBibleProps } from './types'
import { AppBar, Container, Tabs, Tab, Box, Typography } from '@material-ui/core'

import useBase from './useBase'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const Bible: FC<IBibleProps> = ({ onClick }) => {
  const { verses } = useBase()

  return (
    <Container>
      <AppBar position="static">
        <Tabs value={0} onChange={noop} aria-label="simple tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <TabPanel value={0} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={0} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={0} index={2}>
        Item Three
      </TabPanel>
      {verses.map(({ verse, text }) => (
        <div key={verse}>
          {verse}. {text.replace(/<[Sfi]>.+?[Sfi]>/gi, '').replace(/<pb\/>/gi, '')}
        </div>
      ))}
      <MyButton onClick={onClick}>Bible</MyButton>
    </Container>
  )
}

Bible.defaultProps = {
  onClick: noop,
}
