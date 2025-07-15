
"use client";
import React, { useState } from "react";
import { useDarkMode } from "../app/context/DarkModeContext";
import { useAuth } from "../app/context/AuthContext";

export default function Navigation() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { isLoggedIn, login, logout, openLoginModal, openSignupModal } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                  <a href="/" className="text-xl sm:text-2xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                      Code Channel
                    </span>
                  </a>
                </div>
    
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6">
                  <a href="/study" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>스터디</a>
                  <a href="/schedule" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>프로젝트</a>
                  <a href="/code-share" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>코드 공유</a>
                  <a href="/qa" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>Q&A</a>
                  <a href="/community" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>커뮤니티</a>
                  <a href="/info-share" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>정보 공유</a>
                  <a href="/patch-history" className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>패치 이력</a>
                </div>
    
                {/* Desktop Right Side */}
                <div className="hidden lg:flex items-center space-x-4">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-yellow-400 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  
                  {isLoggedIn ? (
                    <button 
                      onClick={logout}
                      className={`transition-colors font-medium text-base ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      로그아웃
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={openLoginModal}
                        className={`transition-colors font-medium text-base ${
                          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        로그인
                      </button>
                      <button 
                        onClick={openSignupModal}
                        className={`transition-colors font-medium text-base ${
                          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        회원가입
                      </button>
                    </>
                  )}
                  <a href="/my" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                    MY
                  </a>
                </div>
    
                {/* Mobile Right Side */}
                <div className="flex lg:hidden items-center space-x-2">
                  {/* Dark Mode Toggle - Mobile */}
                  <button
                    onClick={toggleDarkMode}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-yellow-400 hover:bg-gray-700 active:bg-gray-600' 
                        : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
    
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-700 active:bg-gray-600' 
                        : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                  >
                    {isMobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className={`lg:hidden mt-4 pb-4 border-t transition-all ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                        <div className="pt-4 space-y-3">
                            <a href="/study" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                                isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>스터디</a>
                        <a href="/schedule" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>프로젝트</a>
                        <a href="/code-share" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>코드 공유</a>
                        <a href="/qa" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>Q&A</a>
                        <a href="/community" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>커뮤니티</a>
                        <a href="/info-share" className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                        }`}>정보 공유</a>
                        
                        <div className="border-t pt-3 mt-3 space-y-3">
                        {isLoggedIn ? (
                            <button 
                            onClick={logout}
                            className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation w-full text-left ${
                                isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                            }`}
                            >
                            로그아웃
                            </button>
                        ) : (
                            <>
                            <button 
                                onClick={openLoginModal}
                                className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation w-full text-left ${
                                isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                                }`}
                            >
                                로그인
                            </button>
                            <button 
                                onClick={openSignupModal}
                                className={`block py-3 px-2 rounded-lg transition-colors touch-manipulation w-full text-left ${
                                isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                                }`}
                            >
                                회원가입
                            </button>
                            </>
                        )}
                        <a href="/my" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-md touch-manipulation text-center block">
                            MY
                        </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}