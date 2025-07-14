import React, {useState, useEffect} from "react";
import axios from "axios";

interface Study {
    id: number;
    name: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

// const getStudy = async () => {
//     const response = await axios.get(`${API_HOST}/studies`)
//     .then((response) => {
//         console.log(response.data);
//         return response.data;
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     return response;
// }

async function getStudies() {
    const response = await fetch(API_HOST + '/studies');
    const json = await response.json();
    return json;
}

export default async function Studies() {
    const studies = await getStudies();

    return (
        <div>
            <h1>{JSON.stringify(studies)}</h1>
        </div>
    );
}