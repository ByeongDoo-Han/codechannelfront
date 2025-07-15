import React from "react";
import Navigation from "../components/Navigation";
import "../styles/global.css";
import DarkModeProvider from "./provider/DarkModeProvider";
import AuthProvider from "./provider/AuthProvider";

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
    <html lang="en">
      <body>
        <AuthProvider>
          <DarkModeProvider>
            <Navigation />
            {children}
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
