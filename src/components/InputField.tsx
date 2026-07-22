/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[]; // Required only if type is 'select'
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  options = [],
  required = true,
}) => {
  if (type === 'select') {
    return (
      <div className="relative w-full">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-500 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer font-medium"
          required={required}
        >
          <option value="" className="text-slate-300">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '-')} className="text-slate-800">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-300 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500"
        required={required}
      />
    </div>
  );
};