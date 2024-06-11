import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import './OrderStyle.css'
interface OrderDetailsType {
    id: string;
    item_name: string;
    quantity: string;
    total_price: string;
    color: string;
    item_image: {
        url: string;
    };
}

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetailsType[]>([]);
    const { language } = useLanguage();
    const { orderId } = useParams();

    useEffect(() => {
        const getToken = () => localStorage.getItem('token');

        const headers = {
            Accept: 'application/json',
            language: language,
            Authorization: `Bearer ${getToken()}`,
        };

        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_order_detail?orderId=${orderId}`;

        axios.get(apiUrl, { headers })
            .then(response => {
                console.log(response.data.data);
                setOrderDetails(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [orderId, language]);

    const handlePrint = () => {
        window.print();
    };

    if (!orderDetails) {
        return null;
    }

    return (
        <DefaultLayout>
            <div className="order-details-container">
                {
                    orderDetails.map((orderDetail, key) => {
                        return (
                            <div key={key} className='order-card'>
                                <h2 className='order-item-name'>{orderDetail.item_name}</h2>
                                <h2 className='order-quantity'>Quantity: {orderDetail.quantity}</h2>
                                <h2 className='order-total-price'>Total Price: {orderDetail.total_price}</h2>
                                <div className='order-color'>
                                    <h2>Colors:</h2>
                                    <div className='color-box' style={{ background: orderDetail.color , width:"50px" , height:"50px"}}></div>
                                </div>
                                <div className='order-images'>
                                    <h2>Images:</h2>
                                    <img src={`https://api.alorfi-store.com/storage/${orderDetail.item_image.url}`} alt="Item" />
                                </div>
                            </div>
                        )
                    })
                }
                                <button onClick={handlePrint} className="print-button">Print Invoice</button>

            </div>
        </DefaultLayout>
    );
};

export default OrderDetails;
