import * as React from "react";
import { ApplicationSettings } from "@nativescript/core";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        const savedTheme = ApplicationSettings.getString("theme", "light");
        return savedTheme === "dark";
    });

    const toggleTheme = React.useCallback(() => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            ApplicationSettings.setString("theme", newTheme ? "dark" : "light");
            return newTheme;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}