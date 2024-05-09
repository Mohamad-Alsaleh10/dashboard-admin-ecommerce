import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations'; // Adjust the path as necessary

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
 // Read the language from local storage or default to 'en'
 const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
 });

 // Update local storage whenever the language changes
 useEffect(() => {
    localStorage.setItem('language', language);
 }, [language]);

 const changeLanguage = (lang) => {
    setLanguage(lang);
 };

 return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
 );
};

export const useLanguage = () => useContext(LanguageContext);