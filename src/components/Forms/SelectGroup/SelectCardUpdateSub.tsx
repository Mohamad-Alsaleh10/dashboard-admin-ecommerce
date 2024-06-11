import React, { useEffect } from 'react';

interface Item {
  id: number;
  name: string;
}

interface Props {
  name: string;
  items: Item[];
  formData: any;
  ProductDetails:any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SelectCardUpdateSub: React.FC<Props> = ({ name, items, formData, setFormData,ProductDetails }) => {
  


  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name: inputName, value } = event.target;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };


  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {name}
      </label>
      <select
        name="card_category_id"
        value={formData.card_category_id}
        onChange={handleInputChange}
        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
      >
        <option value="" >Select category</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCardUpdateSub;
