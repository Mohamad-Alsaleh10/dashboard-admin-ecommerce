import DefaultLayout from '../../layout/DefaultLayout'
import CardSubCategoryTable from '../../components/Tables/CardSubCategoryTable'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSubCat() {
  const [isactive,setIsActive] = useState(1);
  const [deletedItem, setdeletedItem] = useState(false);
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
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_card_sub_categories';

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
  }, [isactive , deletedItem]);
  return (
    <DefaultLayout>
       <CardSubCategoryTable setdeletedItem={setdeletedItem} deletedItem={deletedItem} responseData={responseData} isactive={isactive} setIsActive={setIsActive}/>
    </DefaultLayout>
  )
}
