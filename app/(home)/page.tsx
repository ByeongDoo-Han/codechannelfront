"use client";
import React, { useEffect, useState } from "react";
import Content from "./content";
import ReactQueryProvider from "../provider/ReactQueryProvider";

export default function Home() {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const [studies, setStudies] = useState([]);
    
    useEffect(() => {
        const fetchStudies = async () => {
            const response = await fetch(`${API_HOST}/api/v1/studies`);
            const data = await response.json();
            setStudies(data);
        }
        fetchStudies();
    }, []);
    return (
        <ReactQueryProvider>
            <Content studies={studies}/>
        </ReactQueryProvider>
    );
}