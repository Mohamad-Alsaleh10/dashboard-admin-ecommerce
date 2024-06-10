
import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import Alerts from "../UiElements/Alerts";
import SelectCardAdd from "../../components/Forms/SelectGroup/SelectCardAdd";
import SelectCardAddSub from "../../components/Forms/SelectGroup/SelectCardAddSub";

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

export default function AddSubCat() {


  const [categories, setCategories] = useState<Category[]>([]);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    card_category_id: "",
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    image: "",
  });

  useEffect(() => {
    // Fetch token from localStorage
    const getToken = () => {
      return localStorage.getItem('token');
    };

    const headers = {
      Accept: 'application/json',
      language:'en',
      Authorization: `Bearer ${getToken()}`, // Add token to headers
    };

    const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_card_categories';

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
      const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/add_card_sub_category';
      console.log(formData);

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('card_category_id', formData.card_category_id);
      formDataToSend.append('name_ar', formData.name_ar);
      formDataToSend.append('name_en', formData.name_en);
      formDataToSend.append('description_ar', formData.description_ar);
      formDataToSend.append('description_en', formData.description_en);
      formDataToSend.append('image', formData.image);
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
                Add Card Sub Category
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectCardAddSub name="card category" items={categories} formData={formData} setFormData={setFormData} />
              <div>
                <label htmlFor="cardsubNameAr" className="mb-3 block text-black dark:text-white">
                  Name in Arabic:
                </label>
                <input
                  type="text"
                  id="cardsubNameAr"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="cardsubNameEn" className="mb-3 block text-black dark:text-white">
                   Name in English:
                </label>
                <input
                  type="text"
                  id="cardsubNameEn"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="CardsubDescAr" className="mb-3 block text-black dark:text-white">
                   Description in Arabic:
                </label>
                <input
                  type="text"
                  id="CardsubDescAr"
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="CardsubDescEn" className="mb-3 block text-black dark:text-white">
                  Description in English:
                </label>
                <input
                  type="text"
                  id="CardsubDescEn"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="Cardsubimage" className="mb-3 block text-black dark:text-white">
                  Card Image:
                </label>
                <input
                  type="file"
                  id="Cardsubimage"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      </form>
      {responseStatus && <Alerts responseStatus={responseStatus} />}

    </DefaultLayout>
  );
}
