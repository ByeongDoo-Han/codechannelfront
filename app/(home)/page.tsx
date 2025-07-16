import React from "react";
import Content from "./content";

export default async function Home() {

    async function fetchStudies() {
        const response = await fetch("http://localhost:8080/api/v1/studies");
        const data = await response.json();
        return data;
    }
    const studies = await fetchStudies();

    return (
        <Content studies={studies} />
    );
}