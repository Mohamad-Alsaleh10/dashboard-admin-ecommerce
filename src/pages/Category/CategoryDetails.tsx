import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { Link, useParams } from 'react-router-dom';
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
                  <li style={{display:"flex" , gap:"10px"}} key={key} className="py-2">{product.name} 
                              <button className="hover:text-primary ">
              <Link to={`/updateproducts/${product.id}`}>
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                    fill=""
                  />
                  <path
                    d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                    fill=""
                  />
                </svg>
              </Link>
            </button>
                  
                   </li>
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
