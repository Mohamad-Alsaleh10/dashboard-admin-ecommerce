import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableThree = ({ responseData ,changecharge ,changeactive }) => {
  const [triggerRerender, setTriggerRerender] = useState(false);

 if (!responseData) {
    return null;
 }

 // Function to get the token from localStorage
 const getToken = () => {
    return localStorage.getItem('token');
 };

 // Function to handle the click event
// Function to handle the click event
const handleClick = (customerId) => {
  // Construct the URL
  const apiUrl = `https://api.alorfi-store.com/superAdmin_api/active_or_not_customer?customerId=${customerId}`;
 
  // Set up the headers
  const headers = {
     Accept: 'application/json',
     Authorization: `Bearer ${getToken()}`, // Add the token to the headers
  };
 
  // Set up the request body
  const requestBody = {
     customerId: customerId,
     // Add any other required fields here
  };
 
  // Make the API request
  axios.post(apiUrl, requestBody, { headers })
     .then(response => {
       // Handle the response here
       console.log(response.data);
       setTriggerRerender(customerId);
       changeactive(10+customerId);

     })
     .catch(error => {
       // Handle the error here
       console.error('Error fetching data:', error);
     });
 };
 const handleClick2 = (customerId) => {
  // Construct the URL
  const apiUrl = `https://api.alorfi-store.com/superAdmin_api/trader_or_not_customer?customerId=${customerId}`;
 
  // Set up the headers
  const headers = {
     Accept: 'application/json',
     Authorization: `Bearer ${getToken()}`, // Add the token to the headers
  };
 
  // Set up the request body
  const requestBody = {
     customerId: customerId,
     // Add any other required fields here
  };
 
  // Make the API request
  axios.post(apiUrl, requestBody, { headers })
     .then(response => {
       // Handle the response here
       console.log(response.data);
       setTriggerRerender(customerId);
       changecharge(10+customerId);

     })
     .catch(error => {
       // Handle the error here
       console.error('Error fetching data:', error);
     });
 };

 return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                User Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                phone
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                balance
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                is active
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                is trader
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Recharge
              </th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <h5 className="font-medium text-black dark:text-white">
                    {packageItem.user_name}
                 </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <h5 className="font-medium text-black dark:text-white">
                    {packageItem.email}
                 </h5>
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
                    {packageItem.balance}
                 </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                 <button
                    onClick={() => handleClick(packageItem.id)}
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.is_active === '1'
                        ? 'bg-success text-success'
                        : packageItem.is_active === '0'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                 >
                    {packageItem.is_active === '1' ? "active" : "not active"}
                 </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                 <button
                    onClick={() => handleClick2(packageItem.id)}
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.is_trader === '1'
                        ? 'bg-success text-success'
                        : packageItem.is_trader === '0'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                 >
                    {packageItem.is_trader === '1' ? "trader" : "not trader"}
                 </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                 <Link to={`/charge/${packageItem.id}`}
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium
                      }`}
                 >
                    Recharge
                 </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 );
};

export default TableThree;