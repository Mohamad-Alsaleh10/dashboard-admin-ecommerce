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


    return (
        <DefaultLayout>

            {
                productDetails &&
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-5 pb-5">
                        <div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "17px" }} >
                                {productDetails.images.map((image, index) => (
                                    <img style={{ width: "40%" }} key={index} src={`https://api.alorfi-store.com/storage/${image.url}`} alt={`Image ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{productDetails.name}</h5>
                        </a>
                        <div className="flex items-center mt-2.5 mb-5">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                {productDetails.description}
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{productDetails.category_name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{productDetails.price} {productDetails.currency.name}</span>
                            <p className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Brand : {productDetails?.brand?.name ? productDetails.brand.name : "N/A"}</p>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">offer price : {productDetails.offer_price} </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            Storage : {productDetails?.storage?.size && productDetails?.storage?.unit ? `${productDetails.storage.size} ${productDetails.storage.unit}` : "N/A"}
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <div className='className="flex items-center space-x-1 rtl:space-x-reverse"'>colors : </div>
                            <div style={{ display: "flex", gap: "4px" }}>
                                {productDetails.colors.map((color, index) => (
                                    <div style={{ background: color.color, width: "40px", height: "40px" , borderRadius:"50%"}}></div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            }



        </DefaultLayout >

    );
};

export default ProductDetails;
