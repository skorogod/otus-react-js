import { useContext } from "react"
import { ThemeContext } from "../providers/themeProvider/ThemeProvider"

export const useTheme = () => {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error('ThemeContext not found')
    }
    return themeContext
}