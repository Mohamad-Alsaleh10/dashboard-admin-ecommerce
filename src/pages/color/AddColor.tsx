import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function AddColor() {
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        color: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/add_color';
            console.log(formData);
            // Prepare FormData
            const formDataToSend = new FormData();
            formDataToSend.append('color', formData.color);

            console.log(formDataToSend);
            const response = await axios.post(apiUrl, formDataToSend, { headers });
            console.log('Response:', response.data);
            setResponseStatus(response.data);
            // Handle success, redirect, or show a success message
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error, show an error message, etc.
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-9">
                    <div className='className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"'>
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Add color
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                                    color code:
                                </label>
                                <input
                                    type="text"
                                    id="colorName"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    placeholder="Default Input"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                        </div>
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add </button>
                    {responseStatus && <Alerts responseStatus={responseStatus} />}

                </div>
            </form>
        </DefaultLayout >
    )
}
