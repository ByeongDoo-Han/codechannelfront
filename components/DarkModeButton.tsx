"use client";
import React, { useContext } from "react";
import { useDarkMode } from "../app/context/DarkModeContext";


export default function DarkModeButton() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <button onClick={toggleDarkMode}>
            {isDarkMode ? true:false}
        </button>
    );
}