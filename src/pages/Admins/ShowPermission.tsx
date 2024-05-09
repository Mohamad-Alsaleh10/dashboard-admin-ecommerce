
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DeleteAlert from '../UiElements/DeleteAlert';

export default function ShowPermission({selectedPermissions, setSelectedPermissions }) {
    const [responseData, setResponseData] = useState(null);
    const [deletedItem, setdeletedItem] = useState(false);

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
        <>
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
                    {deletedItem && <DeleteAlert deletedItem={deletedItem} />}
                </div>
            </div>}

        </>
    )
}
