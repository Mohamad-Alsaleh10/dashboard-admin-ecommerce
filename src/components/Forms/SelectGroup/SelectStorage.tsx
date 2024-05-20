
interface Item {
  id: number;
  size: string;
}

interface Props {
  name: string;
  items: Item[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SelectStorage: React.FC<Props> = ({ name, items, formData, setFormData }) => {
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
        name="storage_id"
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
      >
        <option value="" >Select Storage</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStorage;
