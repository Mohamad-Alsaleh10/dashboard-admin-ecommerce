import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';
import { SketchPicker } from 'react-color'; // Import the color picker component
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import translations from './../../MultiLanguge/translations';
export default function AddColor() {
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState("#ffffff"); // Initialize with a default color
    const { language } = useLanguage();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/add_color';
            console.log(selectedColor); // Use selectedColor directly
            const formDataToSend = new FormData();
            formDataToSend.append('color', selectedColor);

            console.log(formDataToSend);
            const response = await axios.post(apiUrl, formDataToSend, { headers });
            console.log('Response:', response.data);
            setResponseStatus(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleColorChange = (newColor: string) => {
        setSelectedColor(newColor.hex); // Update the state with the new color
    };

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-9">
                    <div className='className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"'>
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {translations[language].AddNewcolor}
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} /> {/* Use the color picker */}
                        </div>
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add </button>
                    {responseStatus && <Alerts responseStatus={responseStatus} />}
                </div>
            </form>
        </DefaultLayout>
    );
}