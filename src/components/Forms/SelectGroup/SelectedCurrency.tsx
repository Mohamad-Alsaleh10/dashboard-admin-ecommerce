import React from 'react';

interface Item {
  id: number;
  name: string;
}

interface Props {
  name: string;
  items: Item[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SelectedCurrency: React.FC<Props> = ({ name, items, formData, setFormData }) => {
  console.log(items);
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
        name="currency_id"
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
      >
        <option value="" >Select currency</option>
        {items.map(element => (
          <option key={element.id} value={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectedCurrency;
