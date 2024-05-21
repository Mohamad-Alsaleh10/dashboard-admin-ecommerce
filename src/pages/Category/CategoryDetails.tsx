import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { useParams } from 'react-router-dom';
import translations from './../../MultiLanguge/translations';

const CategoryDetails = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [categoryProducts, setcategoryProducts] = useState(null);
  const { language } = useLanguage();
  const { categoryId } = useParams();
  useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: language,
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
  }, [categoryId, language]);
  useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: language,
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_items?categoryId=${categoryId}`;

    // إرسال طلب GET لجلب المنتجات باستخدام التوكين
    axios.get(apiUrl, { headers })
      .then(response => {
        // يتم معالجة الاستجابة هنا
        console.log(response.data.data);
        setcategoryProducts(response.data.data);
      })
      .catch(error => {
        // يتم معالجة الخطأ هنا
        console.error('Error fetching products:', error);
      });
  }, [categoryId, language]);

  return (
    <DefaultLayout>
      {
        categoryDetails &&
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
            <h2 className='text-2xl font-bold mb-4'>{categoryDetails.name}</h2>
            <p className='text-gray-600 mb-4'>{translations[language].images}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {categoryDetails.images.map((image, index) => (
                <img key={index} src={`https://api.alorfi-store.com/storage/${image.url}`} alt={`Image ${index + 1}`} className='w-full h-auto rounded-lg shadow-sm' />
              ))}
            </div>
            <h2 className='text-xl font-medium mt-8 mb-4'>{translations[language].Products}</h2>
            <ul className='list-disc pl-5 space-y-2'>
              {categoryProducts ?
                categoryProducts.map((product, key) => (
                  <li key={key} className="py-2">{product.name}</li>
                )) :
                <li className="py-2">Not Found</li>
              }

            </ul>
          </div>
        </div>
      }

    </DefaultLayout>

  );
};

export default CategoryDetails;
