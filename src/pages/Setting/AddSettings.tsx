
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function AddSettings() {


  const [formData, setFormData] = useState({
    key_ar: '',
    value_ar: '',
    key_en: '',
    value_en: '',

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
      formDataToSend.append('key_ar', formData.key_ar);
      formDataToSend.append('value_ar', formData.value_ar);
      formDataToSend.append('key_en', formData.key_en);
      formDataToSend.append('value_en', formData.value_en);


      const response = await axios.post(
        'https://api.alorfi-store.com/superAdmin_api/add_setting',
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
                Add settings
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="key_ar" className="mb-3 block text-black dark:text-white">
                key in arabic                </label>
                <input
                  type="text"
                  id="key_ar"
                  name="key_ar"
                  value={formData.key_ar}
                  onChange={handleChange}
                  placeholder="key in Arabic"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="value_ar" className="mb-3 block text-black dark:text-white">
                  value in arabic
                </label>
                <input
                  type="text"
                  id="value_ar"
                  name="value_ar"
                  value={formData.value_ar}
                  onChange={handleChange}
                  placeholder="value in arabic"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="key_en" className="mb-3 block text-black dark:text-white">
                  Key in English:
                </label>
                <input
                  type="text"
                  id="key_en"
                  name="key_en"
                  value={formData.key_en}
                  onChange={handleChange}
                  placeholder="key in English"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="value_en" className="mb-3 block text-black dark:text-white">
                  value in English:
                </label>
                <input
                  type="text"
                  id="value_en"
                  name="value_en"
                  value={formData.value_en}
                  onChange={handleChange}
                  placeholder="value in English"
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

