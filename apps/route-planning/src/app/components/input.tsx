import React, { ChangeEvent } from 'react';
import '../app.module.css'

interface InputProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputComponent: React.FC<InputProps> = ({ label, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default InputComponent;
