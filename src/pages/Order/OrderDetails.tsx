
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
interface OrderDetailsType {
    item_name: string;
    quantity: string;
    total_price: string;
    color: string;
    item_image: {
       url: string;
    };
   }
const OrderDetails = ({ id }) => {
    const [orderDetails, setorderDetails] = useState<OrderDetailsType | null>(null);
    const { language } = useLanguage();

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
        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_order_detail?orderId=${id}`;

        // إرسال طلب GET لجلب المنتجات باستخدام التوكين
        axios.get(apiUrl, { headers })
            .then(response => {
                // يتم معالجة الاستجابة هنا
                console.log(response.data.data);
                setorderDetails(response.data.data);
            })
            .catch(error => {
                // يتم معالجة الخطأ هنا
                console.error('Error fetching products:', error);
            });
    }, [id,language]);

    if (!orderDetails) {
        return null;
    }

    return (
        <div className='mb-4 p-10'>
            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>item name : {orderDetails[0].item_name} </h2>
            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>quantity : {orderDetails[0].quantity} </h2>
            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>total price : {orderDetails[0].total_price} </h2>

            <div style={{ marginBottom: "20px" }}>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>colors : </h2>
                <div style={{ display: "flex", gap: "4px" }}>
                    
                        <div style={{ background: orderDetails[0].color, width: "60px", height: "60px" }}></div>
                    
                </div>
            </div>
            <div>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white' >images : </h2>
                <div style={{ width: "40%" }} >          
                <img src={`https://api.alorfi-store.com/storage/${orderDetails[0].item_image.url}`}/>
                </div>
            </div>
            {/* Display other category details as needed */}
        </div>
    );
};

export default OrderDetails;
