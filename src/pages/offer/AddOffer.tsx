import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import SelectAddOffer from '../../components/Forms/SelectGroup/SelectAddOffer';
import Alerts from '../UiElements/Alerts';

export default function AddOffer() {


  const [formData, setFormData] = useState({
    item_id: "",
    offer_price: "",
    from_date: "",
    to_date: "",
  });
  const [categories, setCategories] = useState([]);
  const [added, setAdded] = useState(false);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  useEffect(() => {
    // دالة لجلب التوكين من localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: 'en',
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`, // إضافة التوكين إلى الهيدر
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_items';

    // إرسال طلب GET لجلب المنتجات باستخدام التوكين
    axios.get(apiUrl, { headers })
      .then(response => {
        // يتم معالجة الاستجابة هنا
        console.log(response.data.data);
        setCategories(response.data.data);

      })
      .catch(error => {
        // يتم معالجة الخطأ هنا
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    console.log(added);
  }, [added]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/add_offer';
      console.log(formData);
      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('item_id', formData.item_id);
      formDataToSend.append('offer_price', formData.offer_price);
  
      // Format dates to YYYY-MM-DD before appending
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      formDataToSend.append('from_date', formatDate(formData.from_date));
      formDataToSend.append('to_date', formatDate(formData.to_date));
  
      console.log(formDataToSend);
      const response = await axios.post(apiUrl, formDataToSend, { headers });
      console.log('Response:', response.data);
      setResponseStatus(response.data);
      setAdded(true);
      // Handle success, redirect, or show a success message
    } catch (error) {
      setAdded(!added);
      console.error('Error adding product:', error);
      // Handle error, show an error message, etc.
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <DefaultLayout>
      add  offer
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add offer
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectAddOffer name="item" items={categories} formData={formData} setFormData={setFormData} />
              <div>
                <label htmlFor="offerprice" className="mb-3 block text-black dark:text-white">
                  offer price
                </label>
                <input
                  type="text"
                  id="offerprice"
                  name="offer_price"
                  value={formData.offer_price}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fromdate" className="mb-3 block text-black dark:text-white">
                  from date
                </label>
                <input
                  type="date"
                  id="fromdate"
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="todate" className="mb-3 block text-black dark:text-white">
                  to date
                </label>
                <input
                  type="date"
                  id="todate"
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
          </div>
        </div>
        <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
      </div>
      {responseStatus && <Alerts responseStatus={responseStatus} />}
    </form>
    </DefaultLayout >
  )
}
