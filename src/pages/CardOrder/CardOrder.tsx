import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { Link } from 'react-router-dom';

export default function CardOrder() {
    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200';
            case 'canceled':
                return 'bg-red-200';
            case 'accepted':
                return 'bg-green-200';
            default:
                return '';
        }
    };

    const { language } = useLanguage();
    const [responseData, setResponseData] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isChangeStatus, setIsChangeStatus] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleShowClick = (id) => {
        setSelectedOrderId(id);
    };

    const changeOrderStatus = async (orderId, newStatus) => {
        const url = `https://api.alorfi-store.com/superAdmin_api/change_card_order_status?cardOrderId=${orderId}`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        try {
            await axios.post(url, { status: newStatus }, { headers });
            console.log('Order status updated successfully');
            setIsChangeStatus(isChangeStatus + 1);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    useEffect(() => {
        const getToken = () => {
            return localStorage.getItem('token');
        };

        const headers = {
            Accept: 'application/json',
            language: language,
            currency: 'Dinar',
            Authorization: `Bearer ${getToken()}`,
        };

        const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_card_orders?page=${currentPage}`;

        axios.get(apiUrl, { headers })
            .then(response => {
                console.log(response.data.data);
                setResponseData(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [isChangeStatus, language, currentPage]);

    return (
        <DefaultLayout>
            {responseData && (
                <>
                    <h1>Orders</h1>
                    {selectedOrderId == null && (
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                ID
                                            </th>
                                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                Customer
                                            </th>
                                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                Card Name
                                            </th>
                                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                Order Price
                                            </th>
                                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                                Status
                                            </th>
                                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                                Currency
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {responseData.map((order) => (
                                            <tr key={order.id}>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {order.id}
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {order.customer_name}
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {order.card_name}
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {order.price} {order.currency.symbol}
                                                    </h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => changeOrderStatus(order.id, e.target.value)}
                                                        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${getStatusClass(order.status)}`}
                                                    >
                                                        <option className='bg-white' value="pending">Pending</option>
                                                        <option className='bg-white' value="canceled">Canceled</option>
                                                        <option className='bg-white ' value="accepted">Accepted</option>
                                                    </select>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                                                        {order.currency.name}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mt-4">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </DefaultLayout>
    );
}
