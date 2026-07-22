/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { InputField } from './InputField'; // Adjust file path based on your directory structure

interface ModalContextType {
  openEnquireModal: () => void;
  closeEnquireModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    course: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    campus: ''
  });

  const openEnquireModal = () => setIsOpen(true);
  const closeEnquireModal = () => {
    setIsOpen(false);
    // Reset form field values on dismiss
    setFormData({ course: '', fullName: '', email: '', phone: '', country: '', city: '', campus: '' });
  };

  // Close popup modal on clicking outside container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeEnquireModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent parent body background scrolling when modal window overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Global Inquiry Submission Success:", formData);
    alert("Inquiry Sent Successfully!");
    closeEnquireModal();
  };

  const formFields = [
    { name: 'course', type: 'select' as const, placeholder: 'Select Course', options: ['Data Science', 'AI Development'] },
    { name: 'fullName', type: 'text' as const, placeholder: 'Full Name' },
    { name: 'email', type: 'email' as const, placeholder: 'Email' },
    { name: 'phone', type: 'tel' as const, placeholder: 'Phone' },
    { name: 'country', type: 'select' as const, placeholder: 'Select Your Country', options: ['India', 'USA'] },
    { name: 'city', type: 'select' as const, placeholder: 'Select Your City', options: ['Delhi', 'Mumbai'] },
    { name: 'campus', type: 'select' as const, placeholder: 'Nearest Campus', options: ['Main Campus'] }
  ];

  return (
    <ModalContext.Provider value={{ openEnquireModal, closeEnquireModal }}>
      {children}

      {/* RENDER MODAL OVERLAY GLOBALLY AT APP ROOT LAYER */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            ref={modalRef} 
            className="relative w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Header Structure */}
            <div className="px-6 pt-6 pb-2 text-center relative shrink-0">
              <button onClick={closeEnquireModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5 stroke-[3]" />
              </button>
              <h3 className="text-xl font-bold text-[#0c1e43]">Talk to our expert</h3>
              <p className="text-[12px] text-slate-500 mt-1">Please share your details and we will reach out to you soon.</p>
            </div>

            {/* Inputs Dynamic Body */}
            <form onSubmit={handleFormSubmit} className="px-8 py-2 space-y-2.5 overflow-y-auto custom-scrollbar">
              {formFields.map((field) => (
                <InputField
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  options={field.options}
                />
              ))}
            </form>

            {/* Centered Submit Footer */}
            <div className="p-5 pt-2 flex justify-center shrink-0">
              <button 
                type="submit" 
                onClick={handleFormSubmit}
                className="bg-[#121641] text-white text-[13px] font-bold px-10 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Custom Hook to invoke state functions from any layout component tree view
export const useEnquireModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useEnquireModal must be used inside a ModalProvider wrapper');
  }
  return context;
};