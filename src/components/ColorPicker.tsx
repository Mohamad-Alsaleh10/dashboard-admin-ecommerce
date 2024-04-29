import React, { useEffect, useState } from 'react';
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

const ColorPicker: React.FC<Props> = ({ formData, setFormData }) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

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
    setSelectedColor(color);
    setFormData({
      ...formData,
      selectedColor: color, // Update the selectedColor property in formData
    });
  };

  return (
    <div>
      <h3 className="font-medium text-black dark:text-white">Select Color:</h3>
      <div className="flex flex-wrap mt-2">
        {colors.map(color => (
          <div
            key={color.id}
            onClick={() => handleColorSelection(color)}
            className="w-10 h-10 rounded-full mr-2 mb-2 cursor-pointer"
            style={{
              backgroundColor: color.color,
              border: selectedColor === color ? '2px solid #000' : 'none',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
