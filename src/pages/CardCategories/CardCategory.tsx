
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import TableTwo from '../../components/Tables/TableTwo'
import TableOne from '../../components/Tables/TableOne'
import axios from 'axios';
import CardCategoryTable from '../../components/Tables/CardCategoryTable';

export default function CardCategory() {
  const [isactive,setIsActive] = useState(1);
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: 'en',
      perPage:'10',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_card_categories';

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
  }, [isactive]);
  return (
    <DefaultLayout>
        <CardCategoryTable responseData={responseData} isactive={isactive} setIsActive={setIsActive} />
    </DefaultLayout>
  )
}

