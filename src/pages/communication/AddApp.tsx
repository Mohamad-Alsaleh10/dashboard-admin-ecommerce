
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function AddApp() {


    const [formData, setFormData] = useState({
        name: '',
        icon: '',
    });
    const [responseStatus, setResponseStatus] = useState<string | null>(null);

    const getToken = () => {
        return localStorage.getItem('token') || '';
    };
    const getHeaders = () => {
        return {
            Accept: 'application/json',
            Authorization: `Bearer ${getToken()}`,
        };
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           const formDataToSend = new FormData();
           Object.keys(formData).forEach((key) => {
             if (formData[key] instanceof File) {
               // Append file
               formDataToSend.append(key, formData[key]);
             } else {
               // Append text fields
               formDataToSend.append(key, formData[key]);
             }
           });
       
           const response = await axios.post(
             'https://api.alorfi-store.com/superAdmin_api/add_app',
             formDataToSend,
             { headers: getHeaders() }
           );
           console.log('Response:', response.data);
           setResponseStatus(response.data);
        } catch (error) {
           console.error('Error:', error);
        }
       };



       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
           // Handle file input
           setFormData({
             ...formData,
             [name]: files[0], // Set the file
           });
        } else {
           // Handle text input
           setFormData({
             ...formData,
             [name]: value,
           });
        }
       };


    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Add App
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label htmlFor="nameapp" className="mb-3 block text-black dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="nameapp"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name in Arabic"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="icon" className="mb-3 block text-black dark:text-white">
                                    Icon
                                </label>
                                <input
                                    type="file"
                                    id="icon"
                                    name="icon"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
                </div>
                {responseStatus && <Alerts responseStatus={responseStatus} />}
            </form>


        </DefaultLayout>
    );
}
