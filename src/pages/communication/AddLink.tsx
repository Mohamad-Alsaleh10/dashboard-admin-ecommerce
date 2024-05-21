
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';
type FormDataType = {
    app_id: string;
    icon: string;
};
export default function AddLink() {
    const [responseData, setResponseData] = useState(null);
    useEffect(() => {
        // دالة لجلب التوكين من localStorage
        const getToken = () => {
            return localStorage.getItem('token');
        };

        // الهيدر الذي يجب إرساله مع الطلب
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
        };

        // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
        const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_apps';

        // إرسال طلب GET لجلب المنتجات باستخدام التوكين
        axios.get(apiUrl, { headers })
            .then(response => {
                // يتم معالجة الاستجابة هنا
                console.log(response.data.data);
                setResponseData(response.data.data);

            })
            .catch(error => {
                // يتم معالجة الخطأ هنا
                console.error('Error fetching products:', error);
            });
    }, []);

    const [formData, setFormData] = useState<FormDataType>({
        app_id: '',
        url: '',
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
            formDataToSend.append('app_id', formData.app_id);
            formDataToSend.append('url', formData.url);

            const response = await axios.post(
                'https://api.alorfi-store.com/superAdmin_api/add_link',
                formDataToSend,
                { headers: getHeaders() }
            );
            console.log('Response:', response.data);
            setResponseStatus(response.data);
        } catch (error) {
            console.error('Error:', error);

        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <DefaultLayout>
            {responseData && <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Add links
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label htmlFor="categoryNameAr" className="mb-3 block text-black dark:text-white">
                                    App
                                </label>
                                <select
                                    name="app_id"
                                    value={formData.app_id}
                                    onChange={handleChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                >
                                    <option value="" >Select app</option>
                                    {responseData.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="url" className="mb-3 block text-black dark:text-white">
                                url
                                </label>
                                <input
                                    type="text"
                                    id="url"
                                    name="url"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
                </div>
                {responseStatus && <Alerts responseStatus={responseStatus} />}
            </form>}


        </DefaultLayout>
    );
}
