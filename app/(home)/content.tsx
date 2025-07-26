"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import StudySection from "../../components/StudySection";
import { useDarkMode } from "../context/DarkModeContext";
import { Study, UserSelectionsMap } from "../context/StudyContext";
import AddStudyModal from "../../components/modal/AddStudyModal";
import useAuth from "../context/AuthContext";
import axios from "axios";
import useStudy from "../context/StudyContext";
import AuthModals from "../../components/modal/AuthModal";
import Body from "./body";

export default async function Content({studies}: {studies: Study[]}) {
    const { isDarkMode } = useDarkMode();
    
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Header/>
        <Body studies={studies}/>
      </div>
    );
}