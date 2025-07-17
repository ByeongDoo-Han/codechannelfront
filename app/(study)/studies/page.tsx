import React, {useState, useEffect, Suspense} from "react";
import axios from "axios";
import Loading from "../../loading";
import StudySection from "../../../components/StudySection";

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


export default async function Studies() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
            </Suspense>
        </div>
    );
}