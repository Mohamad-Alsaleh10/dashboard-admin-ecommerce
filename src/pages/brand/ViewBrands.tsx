import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';
import translations from './../../MultiLanguge/translations';
interface Color {
    id: number;
    name: string;
    color: string;
}

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
export default function ViewBrands() {
    const [brands, setBrands] = useState<Color[]>([]);
    const { language } = useLanguage();
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                };

                const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_brands';
                const response = await axios.get(apiUrl, { headers });
                setBrands(response.data.data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchColors();
    }, []);
    return (
        <DefaultLayout>
            <h1 className='font-medium text-black dark:text-white'>{translations[language].brands}</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    padding:"29px",

                }}
            >
                {
                    brands.map(brand => (

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center"
                            }}
                            key={brand.id}>
                            <span> {brand.id} :  </span>
                            <span>
                              {brand.name}
                            </span>
                        </div>
                    )

                    )
                }

            </div>

  

        </DefaultLayout>
    )
}
