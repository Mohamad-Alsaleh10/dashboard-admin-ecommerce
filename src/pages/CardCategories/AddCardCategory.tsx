
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function AddCardCategory() {


    const [formData, setFormData] = useState({
        name_ar: '',
        name_en: '',
        images: [] as File[],
    });
    const [responseStatus, setResponseStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name_ar', formData.name_ar);
            formDataToSend.append('name_en', formData.name_en);
            formData.images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });

            const response = await axios.post(
                'https://api.alorfi-store.com/superAdmin_api/add_card_category',
                formDataToSend,
                { headers: getHeaders() }
            );
            console.log('Response:', response.data);
            setResponseStatus(response.data);
        } catch (error) {
            console.error('Error:', error);
         
        }
    };

    const getHeaders = () => {
        return {
            Accept: 'application/json',
            Authorization: `Bearer ${getToken()}`,
        };
    };

    const getToken = () => {
        return localStorage.getItem('token') || '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedImages = Array.from(files);
            setFormData({
                ...formData,
                images: selectedImages,
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
                                Add Card Category
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label htmlFor="categoryCardNameAr" className="mb-3 block text-black dark:text-white">
                                    Name in Arabic:
                                </label>
                                <input
                                    type="text"
                                    id="categoryCardNameAr"
                                    name="name_ar"
                                    value={formData.name_ar}
                                    onChange={handleChange}
                                    placeholder="Name in Arabic"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="categoryCardNameEn" className="mb-3 block text-black dark:text-white">
                                    Name in English:
                                </label>
                                <input
                                    type="text"
                                    id="categoryCardNameEn"
                                    name="name_en"
                                    value={formData.name_en}
                                    onChange={handleChange}
                                    placeholder="Name in English"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Photo upload
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Select Photos
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    multiple
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
