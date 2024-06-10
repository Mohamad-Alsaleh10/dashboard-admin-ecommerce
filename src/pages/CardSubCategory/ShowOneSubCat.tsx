import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowOneSubCat() {
  const { cardSubId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [deletedItem, setdeletedItem] = useState(false);

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
    const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_card_sub_category?cardSubId=${cardSubId}`;

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
      <div className="container mx-auto p-4">
        {categoryDetails && (
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{categoryDetails.name_ar}</h1>
            <h1 className="text-2xl font-bold mb-4">{categoryDetails.name_en}</h1>
            <p className="mb-2"><strong>Arabic Description:</strong> {categoryDetails.description_ar}</p>
            <p className="mb-2"><strong>English Description :</strong> {categoryDetails.description_en}</p>
            <p className="mb-2"><strong>Active:</strong> {categoryDetails.is_active == 1 ? 'Yes' : 'No'}</p>

            <div style={{ width: '30%' }}>
              {<img src={`https://api.alorfi-store.com/storage/${categoryDetails.image}`} />}
            </div>
            {/* <button
                            onClick={() => handleDeleteImage(productDetails.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Card
                        </button> */}
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
