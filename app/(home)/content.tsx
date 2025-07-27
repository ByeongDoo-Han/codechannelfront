"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Body from "./body";
import { useDarkMode } from "../context/DarkModeContext";
import { Study } from "../context/StudyContext";

export default function Content() {
    const { isDarkMode } = useDarkMode();
    const [studies, setStudies] = useState<Study[]>([]);

    useEffect(() => {
        const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
        const fetchStudies = async () => {
            const response = await fetch(`${API_HOST}/api/v1/studies`);
            const data = await response.json();
            setStudies(data);
        }
        fetchStudies();
    }, []);

    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Header/>
        <Body studies={studies}/>
      </div>
    );
}