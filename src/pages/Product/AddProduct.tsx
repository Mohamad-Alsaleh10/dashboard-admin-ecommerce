import { useEffect, useState } from "react";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import ColorPicker from "../../components/ColorPicker";
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
export default function AddProduct() {  
  const color: Color[] = [
    {
      id: 1,
      name: "green",

    },
    {
      id: 2,
      name: "red",
    },
  ];
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
  const [formData, setFormData] = useState({
    category_id: "",
    currency_id: "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    price: "",
    images: [] as File[],
    colors: [],
  });
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    // دالة لجلب التوكين من localStorage
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
       formDataToSend.append('sname', JSON.stringify({
         category_id: formData.category_id,
         currency_id: formData.currency_id,
         name_en: formData.name_en,
         name_ar: formData.name_ar,
         description_en: formData.description_en,
         description_ar: formData.description_ar,
         price: formData.price,
         // Assuming 'colors' is an array of color IDs or names as strings
         colors: formData.colors.join(','), // Convert array to comma-separated string if necessary
       }));
   
       // Append each image file
       formData.images.forEach((image, index) => {
         formDataToSend.append(`images[${index}]`, image);
       });
   
       const response = await axios.post(apiUrl, formDataToSend, { headers });
       console.log('Response:', response.data);
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
                Add Products
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo name="category" items={categories} formData={formData} setFormData={setFormData} />
              <SelectGroupTwo name="currency" items={currencies} formData={formData} setFormData={setFormData} />
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in Arabic:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in English:
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
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in Arabic:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in English:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Price:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Photo upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  First Photo
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <ColorPicker formData={formData} setFormData={setFormData} />

          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
        </div>
      </form>

    </DefaultLayout>
  )
}
