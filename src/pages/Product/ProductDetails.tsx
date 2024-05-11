import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { itemId } = useParams();
    const [productDetails, setproductDetails] = useState(null);
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
            currency: 'Dinar',
            Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
        };

        // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_item?itemId=${itemId}`;

        // إرسال طلب GET لجلب المنتجات باستخدام التوكين
        axios.get(apiUrl, { headers })
            .then(response => {
                // يتم معالجة الاستجابة هنا
                console.log(response.data.data);
                setproductDetails(response.data.data);
            })
            .catch(error => {
                // يتم معالجة الخطأ هنا
                console.error('Error fetching products:', error);
            });
    }, [itemId, language]);

    if (!productDetails) {
        return null;
    }

    return (
        <DefaultLayout>
            <div className='mb-4 p-10'>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>Name : {productDetails.name} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>category : {productDetails.category_name} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>description : {productDetails.description} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>price : {productDetails.price} {productDetails.currency.name}</h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>offer price : {productDetails.offer_price} </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>
                    Brand : {productDetails?.brand?.name ? productDetails.brand.name : "N/A"}
                </h2>
                <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>
                    Storage : {productDetails?.storage?.size && productDetails?.storage?.unit ? `${productDetails.storage.size} ${productDetails.storage.unit}` : "N/A"}
                </h2>
                <div style={{ marginBottom: "20px" }}>
                    <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>colors : </h2>
                    <div style={{ display: "flex", gap: "4px" }}>
                        {productDetails.colors.map((color, index) => (
                            <div style={{ background: color.color, width: "60px", height: "60px" }}></div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='mb-6 text-xl font-semibold text-black dark:text-white' >images : </h2>
                    <div style={{ width: "40%" }} >
                        {productDetails.images.map((image, index) => (
                            <img key={index} src={`https://api.alorfi-store.com/storage/${image.url}`} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
                {/* Display other category details as needed */}
            </div>
        </DefaultLayout>

    );
};

export default ProductDetails;
