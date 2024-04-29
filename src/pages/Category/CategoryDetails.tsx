import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';

const CategoryDetails = ({ categoryId }) => {
  const [categoryDetails, setCategoryDetails] = useState(null);


useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: 'en',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_category?categoryId=${categoryId}`;

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
    }, [categoryId]);

  if (!categoryDetails) {
    return null;
  }

  return (
    <div className='mb-4'>
      <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>Name : {categoryDetails.name} </h2>
      <h2 className='mb-6 text-xl font-semibold text-black dark:text-white' >images : </h2>
      <div >
        {categoryDetails.images.map((image, index) => (
          <img key={index} src={`https://api.alorfi-store.com/storage/${image.url}`} alt={`Image ${index + 1}`} />
        ))}
      </div>
      {/* Display other category details as needed */}
    </div>
  );
};

export default CategoryDetails;
