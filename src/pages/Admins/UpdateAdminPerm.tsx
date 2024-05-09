
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DeleteAlert from '../UiElements/DeleteAlert';
import DefaultLayout from './../../layout/DefaultLayout';
import Alerts from '../UiElements/Alerts';

export default function UpdateAdminPerm() {
    const [responseStatus, setResponseStatus] = useState<string | null>(null);

    const [responseData, setResponseData] = useState(null);
    const [deletedItem, setdeletedItem] = useState(false);
    const { adminId } = useParams();
    const [selectedPermissions, setSelectedPermissions] = useState<Array<boolean>>([]);
    const [formData, setFormData] = useState({
        permissions:['']
      });

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
            permissions: selectedPermissions.filter((isChecked, index) => isChecked).map((isChecked, index) => String(index + 1)) // Convert indices to strings
        };
           console.log(formDataToSend);
          const response = await axios.post(
            `https://api.alorfi-store.com/superAdmin_api/update_admin_permissions?adminId=${adminId}`,
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
        const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_permissions';

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

    // if (!responseData) {
    //   return null;
    // }
    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
            {responseData && <div>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <tbody>
                                
                                {responseData.map((packageItem, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <input
                                                type="checkbox"
                                                className="font-medium text-black dark:text-white mr-4"
                                                onChange={(e) => {
                                                    const index = responseData.findIndex((item) => item.name === e.target.name);
                                                    setSelectedPermissions((prev) => {
                                                        const newSelectedPermissions = [...prev];
                                                        newSelectedPermissions[index] = e.target.checked;
                                                        return newSelectedPermissions;
                                                    });
                                                }}
                                                name={packageItem.name}
                                                checked={selectedPermissions[key] || false} // Ensure checkbox state reflects selectedPermissions
                                            />
                                            {packageItem.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>}
            <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">update</button>
            {responseStatus && <Alerts responseStatus={responseStatus} />}
            </form>
        </DefaultLayout>
    )
}
