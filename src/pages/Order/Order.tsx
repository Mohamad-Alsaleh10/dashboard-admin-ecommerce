import { useEffect, useState, createContext } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import OrderDetails from './OrderDetails';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import { Link } from 'react-router-dom';

export default function Order() {
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
    const [responseData, setResponseData] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [ischangeStatus, setischangeStatus] = useState(0);
    const handleShowClick = (id: number) => {
        setSelectedOrderId(id);
    };
    const changeOrderStatus = async (orderId: number, newStatus: string) => {
        const url = `https://api.alorfi-store.com/superAdmin_api/change_order_status?orderId=${orderId}`;
        const headers = {
            Accept: 'application/json',
            language: language,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        try {
            await axios.post(url, { status: newStatus }, { headers });
            // Optionally, update the UI or notify the user that the status has been updated
            console.log('Order status updated successfully');
            setischangeStatus(ischangeStatus + 1);
        } catch (error) {
            console.error('Error updating order status:', error);
            // Optionally, notify the user that the status update failed
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
            Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
        };

        // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
        const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_orders';

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
    }, [ischangeStatus, language]);



    // if (!responseData) {
    //     return null;
    // }
    return (
        <DefaultLayout>
            {responseData && <>             <h1>orders</h1>
                {selectedOrderId !== null && <OrderDetails id={selectedOrderId} />}
                {selectedOrderId == null && <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        id
                                    </th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        name
                                    </th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        email
                                    </th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        order price
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        payment method
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        country
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        city
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        address
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Bulding num
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        phone
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Created at
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        status
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        currency
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {responseData.map((packageItem, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {packageItem.id}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {packageItem.customer_name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {packageItem.customer_email}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {packageItem.order_price}  {packageItem.currency.symbol}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {packageItem.payment_method}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.country}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.city}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.address}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.building_num}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.phone}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.created_at}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <select
                                                value={packageItem.status}
                                                onChange={(e) => changeOrderStatus(packageItem.id, e.target.value)}
                                                className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${getStatusClass(packageItem.status)}`}
                                                >
                                                <option value="pending">Pending</option>
                                                <option value="canceled">Canceled</option>
                                                <option value="accepted">accepted</option>

                                            </select>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                                            >
                                                {packageItem.currency.name}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <Link to={`/showorder/${packageItem.id}`}
                                                className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium "
                                            >
                                                show
                                            </Link>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </>}
        </DefaultLayout>
    )
}
