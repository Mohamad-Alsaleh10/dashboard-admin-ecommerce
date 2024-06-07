import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { useParams } from 'react-router-dom';
import DeleteAlert from '../UiElements/DeleteAlert';

const ShowOneCard = () => {
    const [deletedItem, setdeletedItem] = useState(false);
    const { cardId } = useParams();
    const [productDetails, setproductDetails] = useState(null);
    const { language } = useLanguage();

    const handleDeleteImage = async (ProductId) => {
        try {
            // Get the authorization token
            const token = localStorage.getItem('token') || '';

            // Set up the headers
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            };

            // Send DELETE request to delete the category with headers
            const response = await axios.delete(`https://api.alorfi-store.com/superAdmin_api/delete_image?imageId=${ProductId}`, {
                headers: headers
            });

            // Check if deletion was successful
            if (response.status === 200) {
                setdeletedItem(!deletedItem);
                console.log('success');
            } else {
                setdeletedItem(!deletedItem);
                console.error("Deletion failed");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
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
        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_card?cardId=${cardId}`;

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
    }, [cardId, language,deletedItem]);


    return (
        <DefaultLayout>
           <div className="container mx-auto p-4">
                {productDetails && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">{productDetails.name}</h1>
                        <p className="mb-2"><strong>Type:</strong> {productDetails.type}</p>
                        <p className="mb-2"><strong>Category:</strong> {productDetails.card_category_name}</p>
                        <p className="mb-2"><strong>Description:</strong> {productDetails.description}</p>
                        <p className="mb-2"><strong>Price:</strong> {productDetails.price} {productDetails.currency.symbol}</p>
                        <p className="mb-2"><strong>Quantity:</strong> {productDetails.quantity}</p>
                        <p className="mb-2"><strong>Active:</strong> {productDetails.is_active === '1' ? 'Yes' : 'No'}</p>
                        <div className="mb-4">
                            <strong>Codes:</strong>
                            <ul className="list-disc list-inside">
                                {productDetails.codes.map(code => (
                                    <li key={code.id} className="ml-4">{code.code}</li>
                                ))}
                            </ul>
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
    
        </DefaultLayout >

    );
};

export default ShowOneCard;
