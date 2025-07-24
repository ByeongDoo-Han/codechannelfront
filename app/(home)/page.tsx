import React from "react";
import Content from "./content";
import ReactQueryProvider from "../provider/ReactQueryProvider";

export default async function Home() {

    async function fetchStudies() {
        const response = await fetch("http://localhost:8080/api/v1/studies");
        const data = await response.json();
        return data;
    }
    const studies = await fetchStudies();

    return (
        <ReactQueryProvider>
            <Content studies={studies}/>
        </ReactQueryProvider>
    );
}