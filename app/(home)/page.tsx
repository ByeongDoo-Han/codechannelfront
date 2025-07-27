
import React from "react";
import Content from "./content";
import ReactQueryProvider from "../provider/ReactQueryProvider";

export default function Home() {
    return (
        <ReactQueryProvider>
            <Content/>
        </ReactQueryProvider>
    );
}