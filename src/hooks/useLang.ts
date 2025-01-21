import { useContext } from "react"
import { LanguageContext } from "../providers/languageProvider/LanguageProvider"

export const useLang = () => {
    const langContext = useContext(LanguageContext)
    if (!langContext)
        throw new Error ('Language Context not Found')
    return langContext
}