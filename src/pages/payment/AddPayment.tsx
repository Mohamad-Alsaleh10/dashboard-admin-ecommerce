

import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function AddPayment() {


  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    content: '',
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
      formDataToSend.append('name_ar', formData.name_ar);
      formDataToSend.append('name_en', formData.name_en);
      formDataToSend.append('content', formData.content);

      const response = await axios.post(
        'https://api.alorfi-store.com/superAdmin_api/add_payment_method',
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Payment
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="paymentNameAr" className="mb-3 block text-black dark:text-white">
                  Name in Arabic:
                </label>
                <input
                  type="text"
                  id="paymentNameAr"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                  placeholder="Name in Arabic"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="paymentNameEn" className="mb-3 block text-black dark:text-white">
                  Name in English:
                </label>
                <input
                  type="text"
                  id="paymentNameEn"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  placeholder="Name in English"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="content" className="mb-3 block text-black dark:text-white">
                  content:
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Name in English"
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
