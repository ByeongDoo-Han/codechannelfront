import React from "react";
import Header from "../../components/Header";
import Section from "../../components/StudySection";

export default async function Home() {

    async function fetchStudies() {
        const response = await fetch("http://localhost:8080/api/v1/studies");
        const data = await response.json();
        return data;
    }
    const studies = await fetchStudies();

    return (
        <div className={`min-h-screen transition-colors duration-300 bg-gray-900`}>
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <Section studies={studies} />
                    </div>
                </div>
            </main>
        </div>
    );
}