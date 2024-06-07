
import React, { useEffect, useState } from 'react';
import DefaultLayout from './../../layout/DefaultLayout';
import axios from 'axios';
import TableCard from '../../components/Tables/TableCard';

export default function Card() {
  const [responseData, setResponseData] = useState(null);
  const [deletedItem, setdeletedItem] = useState(false);
  const [isactive ,setIsActive] = useState('');
  useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: 'en',
      perPage:'100',
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_cards';

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
  }, [deletedItem , isactive]); // تم تحديد اعتماديات فارغة لتنفيذ الطلب مرة واحدة عند تحميل المكون

  return (
    <DefaultLayout>
        <TableCard isactive={isactive} setIsActive={setIsActive} deletedItem={deletedItem} setdeletedItem={setdeletedItem}  responseData={responseData}/>
    </DefaultLayout>
  )
}
