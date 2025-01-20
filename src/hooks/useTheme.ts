import { useContext } from "react"
import { ThemeContext } from "../features/themeProvider/ThemeProvider"

export const useTheme = () => {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error('ThemeContext not found')
    }
    return themeContext
}