"use client";
import React from "react";
import Header from "../../components/Header";
import Section from "../../components/StudySection";
import { useDarkMode } from "../context/DarkModeContext";
import { Study } from "../context/StudyContext";
import AddStudyModal from "../../components/modal/AddStudyModal";

export default function Content({ studies }: { studies: Study[] }) {
    const { isDarkMode, isAddStudyModalOpen, closeAddStudyModal } = useDarkMode();
    return (
        <>
            <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Header darkMode={isDarkMode} />
                <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <Section studies={studies} />
                            {isAddStudyModalOpen && (
                                <AddStudyModal
                                isStudyModalOpen={isAddStudyModalOpen}
                                closeAddStudyModal={closeAddStudyModal}
                                isDarkMode={isDarkMode}
                                handleAddStudy={handleAddStudy}
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}