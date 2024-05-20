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
}

const ColorPickerUpdate: React.FC<Props> = ({ formData, setFormData }) => {
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
    
    let updatedColors: Color[];
    
    if (isSelected) {
      updatedColors = formData.colors.filter(c => c.id !== color.id);
    } else {
      updatedColors = [...formData.colors, color];
    }
    
    // Format colors as colors[0]="1", colors[1]="2", etc.
    const formattedColors = updatedColors.map((color, index) => ({
      [`colors[${index}]`]: color.id.toString() // Ensure color ID is converted to string
    }));
    
    // Update formData with formatted colors
    setFormData({
      ...formData,
      colors: updatedColors,
      ...formattedColors.reduce((prev, current) => ({ ...prev, ...current }), {})
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
              border: formData.colors.some(c => c.id === color.id) ? '2px solid #000' : 'none',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerUpdate;
