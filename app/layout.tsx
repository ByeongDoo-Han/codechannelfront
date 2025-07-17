import React from "react";
import Navigation from "../components/Navigation";
import "../styles/global.css";
import DarkModeProvider from "./provider/DarkModeProvider";
import AuthProvider from "./provider/AuthProvider";
import StudyProvider from "./provider/StudyProvider";
import { Geist, Geist_Mono } from "next/font/google";
import AuthModals from "../components/modal/AuthModal";
import AddStudyModal from "../components/modal/AddStudyModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:{
    template: '%s | Code Channel',
    default: 'Code Channel',
  },
  description: 'Code Channel에 오신 것을 환영합니다!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <DarkModeProvider>
            <StudyProvider>
              <Navigation />
              {children}
              {/* <AuthModals /> */}
            </StudyProvider>
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
