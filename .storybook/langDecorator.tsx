import React, { ReactNode } from "react"
import {LanguageProvider} from '../src/providers/languageProvider/LanguageProvider'

const LangDecorator = (Story: () => ReactNode) => (
  <LanguageProvider>
    <Story/>
  </LanguageProvider>
)

export default LangDecorator