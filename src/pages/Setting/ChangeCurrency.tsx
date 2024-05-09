import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';

export default function ChangeCurrency() {


  const [formData, setFormData] = useState({
    Dinar_price: '',
    Dollar_price: '',

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
      formDataToSend.append('Dinar_price', formData.Dinar_price);
      formDataToSend.append('Dollar_price', formData.Dollar_price);



      const response = await axios.post(
        'https://api.alorfi-store.com/superAdmin_api/update_currencies_price',
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
                Change currency
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="Dinar_price" className="mb-3 block text-black dark:text-white">
                Dinar Price               </label>
                <input
                  type="text"
                  id="Dinar_price"
                  name="Dinar_price"
                  value={formData.Dinar_price}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="Dollar_price" className="mb-3 block text-black dark:text-white">
                Dollar price                </label>
                <input
                  type="text"
                  id="Dollar_price"
                  name="Dollar_price"
                  value={formData.Dollar_price}
                  onChange={handleChange}
                  placeholder=""
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

