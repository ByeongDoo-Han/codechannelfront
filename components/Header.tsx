"use client";
import React, { useState } from "react";
import { useDarkMode } from "../app/context/DarkModeContext";
import Navigation from "./Navigation";

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (

            <header className={`backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-colors duration-300 ${
                isDarkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
                <Navigation />
            </header>
    );
}