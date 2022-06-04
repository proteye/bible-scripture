const fontItems = [
  { fontFamily: 'Roboto', fontWeightName: 'Light', fontWeight: 300, fontFileWoff2: 'RobotoLight' },
  { fontFamily: 'Roboto', fontWeightName: 'Regular', fontWeight: 400, fontFileWoff2: 'RobotoRegular' },
  { fontFamily: 'Roboto', fontWeightName: 'Medium', fontWeight: 500, fontFileWoff2: 'RobotoMedium' },
  { fontFamily: 'Roboto', fontWeightName: 'Bold', fontWeight: 700, fontFileWoff2: 'RobotoBold' },
]

const getFont = ({ fontFamily, fontWeightName, fontWeight, fontFileWoff2 }) => `
  @font-face {
    font-family: ${fontFamily};
    font-display: swap;
    font-style: normal;
    font-weight: ${fontWeight};
    src: local('${fontFamily} ${fontWeightName}'), local('${fontFamily}-${fontWeightName}'), url('/fonts/${fontFileWoff2}.woff2') format('woff2');
  }
`

const fonts = fontItems.map(getFont).join('')

export default fonts
