
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useParams } from 'react-router-dom';

const ShowCardCategory = () => {
    const [categoryDetails, setCategoryDetails] = useState(null);
    const { cardCategoryId } = useParams();
    const [deletedItem, setdeletedItem] = useState(false);
    const handleDeleteCategory = async (categoryId) => {
        try {
            // Get the authorization token
            const token = localStorage.getItem('token') || '';

            // Set up the headers
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            };

            // Send DELETE request to delete the category with headers
            const response = await axios.delete(`https://api.alorfi-store.com/superAdmin_api/delete_image?imageId=${categoryId}`, {
                headers: headers
            });

            // Check if deletion was successful
            if (response.status === 200) {
                setdeletedItem(true);
                console.log('success');
                window.location.reload()
            } else {
                setdeletedItem(false);
                console.error("Deletion failed");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
    useEffect(() => {
        // دالة لجلب التوكين من localStorage
        const getToken = () => {
            return localStorage.getItem('token');
        };

        // الهيدر الذي يجب إرساله مع الطلب
        const headers = {
            Accept: 'application/json',
            language: 'en',
            perPage:'40',
            Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
        };

        // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_card_categories?cardCategoryId=${cardCategoryId}`;

        // إرسال طلب GET لجلب المنتجات باستخدام التوكين
        axios.get(apiUrl, { headers })
            .then(response => {
                // يتم معالجة الاستجابة هنا
                console.log(response.data.data);
                setCategoryDetails(response.data.data);
            })
            .catch(error => {
                // يتم معالجة الخطأ هنا
                console.error('Error fetching products:', error);
            });
    }, [deletedItem]);


    return (
        <DefaultLayout>
            {
           categoryDetails  &&   <div className='mb-4'>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>Name 1 : {categoryDetails.name} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>Name 2: {categoryDetails.name2} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white' >images : </h2>
                <div style={{ width: '30%' }}>
                    { <img  src={`https://api.alorfi-store.com/storage/${categoryDetails.images}`} />}
                </div>

                {/* Display other category details as needed */}
            </div>
            }
        </DefaultLayout>

    );
};

export default ShowCardCategory;
