import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Color {
  id: number;
  name: string;
  color: string;
}

interface Props {
  formData: { colors: Color[] };
  setFormData: React.Dispatch<React.SetStateAction<{ colors: Color[] }>>;
  name:string;
}

const ColorPicker: React.FC<Props> = ({ formData, setFormData,name }) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Accept: 'application/json',
          language: 'en',
          Authorization: `Bearer ${token}`,
        };

        const apiUrl = 'https://api.alorfi-store.com/superAdmin_api/show_colors';
        const response = await axios.get(apiUrl, { headers });
        setColors(response.data.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  const handleColorSelection = (color: Color) => {
    const isSelected = formData.colors.some(c => c.id === color.id);

    if (isSelected) {
      setFormData({
        ...formData,
        colors: formData.colors.filter(c => c.id !== color.id),
      });
    } else {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      });
    }
  };

  return (
    <div>
      <h3 className="font-medium text-black dark:text-white">{name}</h3>
      <div className="flex flex-wrap mt-2">
        {colors.map(color => (
          <div
            key={color.id}
            onClick={() => handleColorSelection(color)}
            className="w-10 h-10 rounded-full mr-2 mb-2 cursor-pointer"
            style={{
              backgroundColor: color.color,
              border: formData.colors.some(c => c.id === color.id) ? '2px solid #000' : 'none',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
