import { useState, useEffect } from 'react';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';

const SwitcherOne = () => {
 const { language, changeLanguage } = useLanguage();
 const [enabled, setEnabled] = useState<boolean>(language === 'ar');

 // Sync the enabled state with the current language
 useEffect(() => {
    setEnabled(language === 'ar');
    console.log(language);
 }, [language]);

 const toggleLanguage = () => {
    const newLanguage = enabled ? 'en' : 'ar';
    changeLanguage(newLanguage);
 };

 return (
    <div style={{direction:"ltr" , display:"flex" , gap:"2px" , alignItems:"center",flexDirection:"row"}}>
      <label
        htmlFor="toggle1"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            checked={enabled}
            onChange={toggleLanguage}
          />
          
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled ? '!right-1 !translate-x-full !bg-primary dark:!bg-white' : ''
            }`}
          ></div>
        </div>
      </label>
      {language == 'ar' ? 'العربية' : 'English'}
    </div>
 );
};

export default SwitcherOne;