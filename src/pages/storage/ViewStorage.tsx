import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios';
interface Color {
    id: number;
    name: string;
    color: string;
}

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
export default function ViewStorage() {
    const [storages, setStorages] = useState<Color[]>([]);
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                };

                const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_storages';
                const response = await axios.get(apiUrl, { headers });
                setStorages(response.data.data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchColors();
    }, []);
    return (
        <DefaultLayout>
            <h1 className='font-medium text-black dark:text-white'>Storages:</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    padding:"29px",

                }}
            >
                {
                    storages.map(storage => (

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center"
                            }}
                            key={storage.id}>
                            <span> {storage.id} -  </span>
                            <span style={{color:'#c3352b' , fontWeight:"bold"}}>
                              {storage.size}
                            </span>
                        </div>
                    )

                    )
                }

            </div>

        </DefaultLayout>
    )
}
