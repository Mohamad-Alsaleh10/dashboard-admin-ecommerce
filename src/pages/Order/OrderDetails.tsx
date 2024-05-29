
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { useParams } from 'react-router-dom';
interface OrderDetailsType {
    item_name: string;
    quantity: string;
    total_price: string;
    color: string;
    item_image: {
        url: string;
    };
}
const OrderDetails = () => {
    const [orderDetails, setorderDetails] = useState<OrderDetailsType[]>([]);
    const { language } = useLanguage();
    const { orderId } = useParams();
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
        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_order_detail?orderId=${orderId}`;

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
    }, [orderId, language]);

    if (!orderDetails) {
        return null;
    }

    return (
        <DefaultLayout>
            {
                orderDetails.map((orderDetails, key) => {
                    return (
                        <div id={key} className='mb-4 p-10' style={{ background: "#80808030", borderRadius: "20px" }} >
                            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>id : {orderDetails.id} </h2>
                            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>item name : {orderDetails.item_name} </h2>
                            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>quantity : {orderDetails.quantity} </h2>
                            <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>total price : {orderDetails.total_price} </h2>

                            <div style={{ marginBottom: "20px" }}>
                                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>colors : </h2>
                                <div style={{ display: "flex", gap: "4px" }}>

                                    <div style={{ background: orderDetails.color, width: "60px", height: "60px" }}></div>

                                </div>
                            </div>
                            <div>
                                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white' >images : </h2>
                                <div style={{ width: "40%" }} >
                                    <img src={`https://api.alorfi-store.com/storage/${orderDetails.item_image.url}`} />
                                </div>
                            </div>
                            {/* Display other category details as needed */}
                        </div>
                    )
                })
            }

        </DefaultLayout>
    );
};

export default OrderDetails;
