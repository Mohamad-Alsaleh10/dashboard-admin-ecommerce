import { useEffect, useState } from "react";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import ColorPicker from "../../components/ColorPicker";
import SelectedCurrency from "../../components/Forms/SelectGroup/SelectedCurrency";
import Alerts from "../UiElements/Alerts";
import SelectBrand from "../../components/Forms/SelectGroup/SelectBrand";
import SelectStorage from "../../components/Forms/SelectGroup/SelectStorage";
import { useParams } from "react-router-dom";
import ColorPickerUpdate from "../../components/ColorPickerUpdate";
import DeleteAlert from "../UiElements/DeleteAlert";
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import translations from './../../MultiLanguge/translations';

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
export default function UpdateProduct() {
  const { itemId } = useParams();
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
  const [ProductDetails, setProductDetails] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [deletedItem, setdeletedItem] = useState(false);
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
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
    const getToken = () => {
      return localStorage.getItem('token');
    };

    const headers = {
      Accept: 'application/json',
      language: 'ar',
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`,
    };

    const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_one_item?itemId=${itemId}`;

    axios.get(apiUrl, { headers })
      .then(response => {
        const data = response.data.data || {}; // Provide a fallback empty object if data is undefined
        setProductDetails(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [deletedItem]);

  // When setting form data, check if ProductDetails is not null
  useEffect(() => {
    if (ProductDetails) {
      setFormData({
        category_id: ProductDetails.category_id,
        currency_id: ProductDetails.currency.id,
        name_en: ProductDetails.name2,
        name_ar: ProductDetails.name,
        description_en: ProductDetails.description2,
        description_ar: ProductDetails.description,
        price: ProductDetails.price,
        brand_id: ProductDetails.brand.id,
        storage_id: ProductDetails.storage.id,
        images: [] as File[],
        colors: [],
      });
    }
  }, [ProductDetails]); // Add ProductDetails as a dependency to re-run this effect when it changes

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
      const apiUrl = `https://api.alorfi-store.com/superAdmin_api/update_item?itemId=${itemId}`;
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
      formData.colors.forEach((colorId, index) => {
        formDataToSend.append(`colors[${index}]`, colorId.id);
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
                {translations[language].update}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo name={translations[language].Category} items={categories} formData={formData} setFormData={setFormData} ProductDetails={ProductDetails} />
              <SelectedCurrency name={translations[language].currency} items={currencies} formData={formData} setFormData={setFormData} ProductDetails={ProductDetails} />
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
                <label htmlFor="descriptionar" className="mb-3 block text-black dark:text-white">
                {translations[language].descinarabic}
                </label>
                <input
                  type="text"
                  id="descriptionar"
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="descriptionen" className="mb-3 block text-black dark:text-white">
                 {translations[language].descinenglish}
                </label>
                <input
                  type="text"
                  id="descriptionen"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productprice" className="mb-3 block text-black dark:text-white">
                {translations[language].price}
                </label>
                <input
                  type="text"
                  id="productprice"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <SelectBrand name={translations[language].brand} items={brands} formData={formData} setFormData={setFormData} ProductDetails={ProductDetails} />
              <SelectStorage name={translations[language].storage} items={storages} formData={formData} setFormData={setFormData} ProductDetails={ProductDetails} />
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: "17px" }} >
                  {ProductDetails && ProductDetails.images.map((image, index) => (


                    <div key={index}>
                      <img style={{ width: "40%" }} src={`https://api.alorfi-store.com/storage/${image.url}`} alt={`Image ${index + 1}`} />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="hover:text-primary "
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>

                  ))}
                </div>
              </div>
            </div>
          </div>

          <ColorPickerUpdate name={translations[language].selectColor} formData={formData} setFormData={setFormData} />

          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Update</button>
        </div>
        {responseStatus && <Alerts responseStatus={responseStatus} />}
        {deletedItem && <DeleteAlert deletedItem={deletedItem} />}
      </form>

    </DefaultLayout>
  )
}
