import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import SelectedCurrency from "../../components/Forms/SelectGroup/SelectedCurrency";
import Alerts from "../UiElements/Alerts";
import SelectCardAdd from "../../components/Forms/SelectGroup/SelectCardAdd";
import { useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
  is_active: string;
}

interface Currency {
  id: number;
  name: string;
  symbol: string;
  price: string;
}

export default function UpdateCard() {


  const currencies: Currency[] = [
    {
      id: 1,
      name: "Dollar",
      symbol: "USD",
      price: "1"
    },
    {
      id: 2,
      name: "Dinar",
      symbol: "JOD",
      price: "1"
    }
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  const { cardId } = useParams();
  const [productDetails, setproductDetails] = useState(null);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (productDetails) {
        setFormData({
            ...formData,
            name_ar: productDetails.name,
            name_en: productDetails.name,
            description_ar: productDetails.description,
            description_en: productDetails.description,
            price:productDetails.price,
        });
    }
}, [productDetails]);
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
}, [cardId]);
  useEffect(() => {
    // Fetch token from localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    const headers = {
      Accept: 'application/json',
      language: 'en',
      Authorization: `Bearer ${getToken()}`, // Add token to headers
    };

    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_card_sub_categories';

    // Fetch categories
    axios.get(apiUrl, { headers })
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const apiUrl = `https://api.alorfi-store.com/superAdmin_api/update_card?cardId=${cardId}`;
      console.log(formData);

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('name_ar', formData.name_ar);
      formDataToSend.append('name_en', formData.name_en);
      formDataToSend.append('description_ar', formData.description_ar);
      formDataToSend.append('description_en', formData.description_en);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('price', formData.price);
      console.log(formDataToSend);
      const response = await axios.post(apiUrl, formDataToSend, { headers });
      console.log('Response:', response.data);
      setResponseStatus(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...formData.codes];
    newCodes[index] = value;
    setFormData({
      ...formData,
      codes: newCodes,
    });
  };

  const addCodeField = () => {
    setFormData({
      ...formData,
      codes: [...formData.codes, ""],
    });
  };

  const removeCodeField = (index: number) => {
    const newCodes = formData.codes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      codes: newCodes,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = Array.from(files);
      setFormData({
        ...formData,
        image: selectedImages[0],
      });
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                update Cards
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="cardNameAr" className="mb-3 block text-black dark:text-white">
                  Card Name in Arabic:
                </label>
                <input
                  type="text"
                  id="cardNameAr"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="cardNameEn" className="mb-3 block text-black dark:text-white">
                  Card Name in English:
                </label>
                <input
                  type="text"
                  id="cardNameEn"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="CardDescAr" className="mb-3 block text-black dark:text-white">
                  Card Description in Arabic:
                </label>
                <input
                  type="text"
                  id="CardDescAr"
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="CardDescEn" className="mb-3 block text-black dark:text-white">
                  Card Description in English:
                </label>
                <input
                  type="text"
                  id="CardDescEn"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="Cardimage" className="mb-3 block text-black dark:text-white">
                  Card Image:
                </label>
                <input
                  type="file"
                  id="Cardimage"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="cardPrice" className="mb-3 block text-black dark:text-white">
                  Card Price:
                </label>
                <input
                  type="text"
                  id="cardPrice"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              {/* <SelectedCurrency name="currency" items={currencies} formData={formData} setFormData={setFormData} /> */}


              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                update Card
              </button>
            </div>
          </div>
        </div>
      </form>
      {responseStatus && <Alerts responseStatus={responseStatus} />}

    </DefaultLayout>
  );
}
