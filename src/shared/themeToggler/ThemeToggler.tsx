import React, {FC} from "react";
import themeTogglerScss from './themeToggler.module.scss'

import lightBulb from '../../assets/icons/light-bulb.svg'
import darkBulb from '../../assets/icons/dark-bulb.svg'
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggler:FC = () => {
    const themeContext = useTheme()

    return (
        <button
            className={themeTogglerScss.button}
            onClick={(e) => {
                if (themeContext) {
                    themeContext.toggleTheme()
                }
            }}
        >
            <img
                className={themeTogglerScss.icon}
                src={
                    themeContext?.theme === 'light' ? lightBulb : darkBulb
                } 
                alt="bulb-icon" />
        </button>
    
    )
}