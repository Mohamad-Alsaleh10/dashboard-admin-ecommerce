import React, { useEffect, useState } from 'react';
import DefaultLayout from './../../layout/DefaultLayout';
import TableTwo from './../../components/Tables/TableTwo';
import axios from 'axios';

export default function ViewProduct() {
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
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_items';

    // إرسال طلب GET لجلب المنتجات باستخدام التوكين
    axios.get(apiUrl, { headers })
      .then(response => {
        // يتم معالجة الاستجابة هنا
        console.log(response.data);
        setResponseData(response.data.data);

      })
      .catch(error => {
        // يتم معالجة الخطأ هنا
        console.error('Error fetching products:', error);
      });
  }, []); // تم تحديد اعتماديات فارغة لتنفيذ الطلب مرة واحدة عند تحميل المكون

  return (
    <DefaultLayout>
        <TableTwo   responseData={responseData}/>
    </DefaultLayout>
  )
}
