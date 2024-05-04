import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import TableThree from '../../components/Tables/TableThree'
import axios from 'axios';

export default function Customer() {
    const [active, setactive] = useState(0);
    const [charge, setcharge] = useState(0);
    const [deleteItem, setdeleteItem] = useState(false);
    const [responseData, setResponseData] = useState(null);
    useEffect(() => {
        // دالة لجلب التوكين من localStorage
        const getToken = () => {
          return localStorage.getItem('token');
        };
    
        // الهيدر الذي يجب إرساله مع الطلب
        const headers = {
          Accept: 'application/json',
          perPage:'10',
          Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
        };
    
        // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
        const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_customers';
    
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
      }, [active,charge,deleteItem]);

  return (
    <DefaultLayout>
        <TableThree responseData={responseData} changeactive={setactive} changecharge={setcharge} changedeleteitem={setdeleteItem}/>
    </DefaultLayout>
  )
}
