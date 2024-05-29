import React, { useEffect, useState } from 'react';
import DefaultLayout from './../../layout/DefaultLayout';
import TableTwo from './../../components/Tables/TableTwo';
import axios from 'axios';
import { useLanguage } from '../../MultiLanguge/LanguageProvider ';


export default function ViewProduct() {
  const { language } = useLanguage();
  const [responseData, setResponseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deletedItem, setDeletedItem] = useState(false);
  const [currency, setcurrency] = useState('');


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

    const fetchProducts = async (page) => {
      const apiUrl = `https://api.alorfi-store.com/superAdmin_api/show_items?page=${page}`;
      try {
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;
        if (data.success) {
          
          setResponseData(prev => {
            const updated = [...prev];
            updated[page - 1] = data.data;
            return updated;
          });
          setTotalPages(data.last_page);
        
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    for (let i = 1; i <= totalPages || i === 1; i++) {
      fetchProducts(i);
    }
  }, [deletedItem, totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <DefaultLayout>
      <TableTwo
        responseData={responseData[currentPage - 1] || []}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </DefaultLayout>
  );
}
