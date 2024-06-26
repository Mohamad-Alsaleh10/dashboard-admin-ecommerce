import { useEffect, useState } from "react";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import ColorPicker from "../../components/ColorPicker";
import SelectedCurrency from "../../components/Forms/SelectGroup/SelectedCurrency";
import Alerts from "../UiElements/Alerts";
import SelectBrand from "../../components/Forms/SelectGroup/SelectBrand";
import SelectStorage from "../../components/Forms/SelectGroup/SelectStorage";
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import translations from './../../MultiLanguge/translations';

interface FormData {
  category_id: string;
  currency_id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: string;
  brand_id: string;
  storage_id: string;
  images: File[];
  colors: Color[]; // Specify that colors is an array of Color objects
}

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
interface Color {
  id: number;
  name: string;
}
interface Brand {
  id: number;
  name: string;
}
interface Storage {
  id: number;
  size: string;
}
export default function AddProduct() {
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

  const { language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);

  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category_id: "",
    currency_id: "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    price: "",
    brand_id: "",
    storage_id: "",
    images: [] as File[],
    colors: [],
  });
  useEffect(() => {
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      language: 'en',
      Authorization: `Bearer ${getToken()}`,
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_categories';
    axios.get(apiUrl, { headers })
      .then(response => {
        console.log(response.data.data);
        setCategories(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching :', error);
      });


  }, []);

  useEffect(() => {
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_brands';
    axios.get(apiUrl, { headers })
      .then(response => {
        console.log(response.data.data);
        setBrands(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching :', error);
      });


  }, []);

  useEffect(() => {
    const getToken = () => {
      return localStorage.getItem('token');
    };

    // الهيدر الذي يجب إرساله مع الطلب
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };

    // الرابط الذي سنرسل إليه الطلب لجلب المنتجات
    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_storages';
    axios.get(apiUrl, { headers })
      .then(response => {
        console.log(response.data.data);
        setStorages(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching :', error);
      });


  }, []);
  // handle submit 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/add_item';
      console.log(formData);
      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('currency_id', formData.currency_id);
      formDataToSend.append('name_en', formData.name_en);
      formDataToSend.append('name_ar', formData.name_ar);
      formDataToSend.append('description_en', formData.description_en);
      formDataToSend.append('description_ar', formData.description_ar);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('brand_id', formData.brand_id);
      formDataToSend.append('storage_id', formData.storage_id);

      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });
      formData.colors.forEach((color, index) => {
        formDataToSend.append(`colors[${index}]`, String(color.id));
      });

      console.log(formDataToSend);
      const response = await axios.post(apiUrl, formDataToSend, { headers });
      console.log('Response:', response.data);
      setResponseStatus(response.data);
      // Handle success, redirect, or show a success message
    } catch (error) {
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


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = Array.from(files);
      setFormData({
        ...formData,
        images: selectedImages,
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
                {translations[language].AddNewProduct}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo name={translations[language].Category} items={categories} formData={formData} setFormData={setFormData} />
              <SelectedCurrency name={translations[language].currency} items={currencies} formData={formData} setFormData={setFormData} />
              <div>
                <label htmlFor="productNamear" className="mb-3 block text-black dark:text-white">
                {translations[language].nameinarabic}
                </label>
                <input
                  type="text"
                  id="productNamear"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  {translations[language].nameinenglish}
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="descriptioninArabic" className="mb-3 block text-black dark:text-white">
                {translations[language].descinarabic}
                </label>
                <input
                  type="text"
                  id="descriptioninArabic"
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="descriptioninEnglish" className="mb-3 block text-black dark:text-white">
                  {translations[language].descinenglish}
                </label>
                <input
                  type="text"
                  id="descriptioninEnglish"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="price" className="mb-3 block text-black dark:text-white">
                  {translations[language].price}
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <SelectBrand name={translations[language].brand} items={brands} formData={formData} setFormData={setFormData} />
              <SelectStorage name={translations[language].storage} items={storages} formData={formData} setFormData={setFormData} />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {translations[language].Photoupload}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                   {translations[language].SelectPhotos}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <ColorPicker name={translations[language].selectColor} formData={formData} setFormData={setFormData} />

          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
        </div>
        {responseStatus && <Alerts responseStatus={responseStatus} />}
      </form>

    </DefaultLayout>
  )
}
