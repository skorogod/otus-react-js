import React, { ReactElement } from "react"
import {ThemeProvider} from '../src/providers/themeProvider/ThemeProvider'


const ThemeDecorator = (storyFn: () => ReactElement) => (
  <ThemeProvider>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator