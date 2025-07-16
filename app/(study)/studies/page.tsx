import React, {useState, useEffect, Suspense} from "react";
import axios from "axios";
import Section from "../../../components/StudySection";
import Loading from "../../loading";

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
                <Section studies={[]} />
            </Suspense>
        </div>
    );
}