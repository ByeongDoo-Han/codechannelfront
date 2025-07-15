"use client";
import React, { useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const value = {
        isDarkMode,
        toggleDarkMode,
    }
    
    return (
        <DarkModeContext.Provider value={value}>
            {children}
        </DarkModeContext.Provider>
    );
}