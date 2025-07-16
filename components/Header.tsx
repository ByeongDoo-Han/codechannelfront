"use client";
import React, { useState } from "react";

export default function Header({ darkMode }: { darkMode: boolean }) {
    return (
        <header className={`backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800/80 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            </div>
        </header>
    );
}