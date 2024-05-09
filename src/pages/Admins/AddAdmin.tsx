
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Alerts from '../UiElements/Alerts';
import ShowPermission from './ShowPermission';

export default function AddAdmin() {

    const [selectedPermissions, setSelectedPermissions] = useState<Array<boolean>>([]);

  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    password: '',
    permissions:['']
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


// In AddAdmin.tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        name: formData.name,
        user_name: formData.user_name,
        password: formData.password,
        permissions: selectedPermissions.filter((isChecked, index) => isChecked).map((isChecked, index) => String(index + 1)) // Convert indices to strings
    };
       console.log(formDataToSend);
      const response = await axios.post(
        'https://api.alorfi-store.com/superAdmin_api/add_admin',
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
                Add admin
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="adminname" className="mb-3 block text-black dark:text-white">
                  Name :
                </label>
                <input
                  type="text"
                  id="adminname"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name in Arabic"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="username" className="mb-3 block text-black dark:text-white">
                 User Name:
                </label>
                <input
                  type="text"
                  id="username"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Name in English"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="passwordadmin" className="mb-3 block text-black dark:text-white">
                  password:
                </label>
                <input
                  type="password"
                  id="passwordadmin"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Name in English"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="passwordadmin" className="mb-3 block text-black dark:text-white">
                  permissions:
                </label>
                <ShowPermission selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions}/>
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
