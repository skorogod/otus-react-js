import React, { ReactElement } from "react"
import {ThemeProvider} from '../src/features/themeProvider/ThemeProvider'

const ThemeDecorator = (storyFn: () => ReactElement) => (
  <ThemeProvider>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator