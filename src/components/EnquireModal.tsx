// import React, { useRef, useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { InputField } from './InputField'; // Ensure the path to your InputField is correct

// interface EnquireModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
  
//   const [formData, setFormData] = useState({
//     course: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     country: '',
//     city: '',
//     campus: ''
//   });

//   // Form field definitions
//   const formFields = [
//     { name: 'course', type: 'select' as const, placeholder: 'Select Course', options: ['Data Science', 'AI Development'] },
//     { name: 'fullName', type: 'text' as const, placeholder: 'Full Name' },
//     { name: 'email', type: 'email' as const, placeholder: 'Email' },
//     { name: 'phone', type: 'tel' as const, placeholder: 'Phone' },
//     { name: 'country', type: 'select' as const, placeholder: 'Select Your Country', options: ['India', 'USA'] },
//     { name: 'city', type: 'select' as const, placeholder: 'Select Your City', options: ['Delhi', 'Mumbai'] },
//     { name: 'campus', type: 'select' as const, placeholder: 'Nearest Campus', options: ['Main Campus'] }
//   ];

//   // Handle outside click to close
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen, onClose]);

//   // Prevent background scroll when open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isOpen]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     alert("Thank you! We will reach out soon.");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
//       <div 
//         ref={modalRef} 
//         className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
//       >
//         {/* Header */}
//         <div className="px-6 pt-6 pb-2 text-center relative shrink-0">
//           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
//             <X className="h-5 w-5 stroke-[3]" />
//           </button>
//           <h3 className="text-xl font-bold text-[#0c1e43]">Talk to our expert</h3>
//           <p className="text-[12px] text-slate-500 mt-1">Please share your details and we will reach out to you soon.</p>
//         </div>

//         {/* Form Body */}
//         <form onSubmit={handleFormSubmit} className="px-8 py-2 space-y-2.5 overflow-y-auto">
//           {formFields.map((field) => (
//             <InputField
//               key={field.name}
//               name={field.name}
//               type={field.type}
//               placeholder={field.placeholder}
//               value={formData[field.name as keyof typeof formData]}
//               onChange={handleInputChange}
//               options={field.options}
//             />
//           ))}
//         </form>

//         {/* Footer */}
//         <div className="p-5 pt-2 flex justify-center shrink-0">
//           <button 
//             type="submit" 
//             className="bg-[#121641] text-white text-[13px] font-bold px-10 py-3 rounded-xl hover:bg-[#0a0d2e] transition-colors shadow-lg active:scale-95"
//           >
//             Enquire Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };





// import React, { useRef, useEffect, useState, ChangeEvent } from "react";
// import { X } from "lucide-react";
// import api from "../api/api";
// import { InputField } from "./InputField"; // Adjust path as necessary

// // ================= Interfaces =================
// interface Course {
//   id: number;
//   course_name: string;
// }

// interface CourseGroup {
//   title: string;
//   courses: Course[];
// }

// interface Country {
//   id: number;
//   country_name: string;
// }

// interface City {
//   id: number;
//   city_name: string;
// }

// interface Campus {
//   id: number;
//   campus_name: string;
// }

// interface EnquireModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   // ================= State Variables =================
//   const [courseGroups, setCourseGroups] = useState<CourseGroup[]>([]);
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [cities, setCities] = useState<City[]>([]);
//   const [campuses, setCampuses] = useState<Campus[]>([]);

//   const [form, setForm] = useState({
//     course_id: 0,
//     country_id: 0,
//     city_id: 0,
//     campus_id: 0,
//     full_name: "",
//     email: "",
//     phone_number: "",
//     lead_type: "",
//   });

//   // ================= API Request Methods =================
//   const loadCourses = async () => {
//     try {
//       const res = await api.get("/course-categories/course-title");
//       setCourseGroups(res.data.data || []);
//     } catch (error) {
//       console.error("Error loading courses:", error);
//     }
//   };

//   const loadCountries = async () => {
//     try {
//       const res = await api.get("/countries/all");
//       const incomingData = res.data.data ? res.data.data : res.data;
//       setCountries(incomingData || []);
//     } catch (error) {
//       console.error("Error loading countries:", error);
//     }
//   };

//   const loadCities = async (countryId: number) => {
//     try {
//       const res = await api.get(`/countries/${countryId}`);
//       setCities(res.data.data || []);
//     } catch (error) {
//       console.error(`Error loading cities for country ID [${countryId}]:`, error);
//       setCities([]);
//     }
//   };

//   const loadCampuses = async (cityId: number) => {
//     try {
//       const res = await api.get(`/cities/${cityId}/campuses`);
//       setCampuses(res.data.data || []);
//     } catch (error) {
//       console.error(`Error loading campuses for city ID [${cityId}]:`, error);
//       setCampuses([]);
//     }
//   };

//   // ================= Setup Initialization =================
//   useEffect(() => {
//     if (isOpen) {
//       loadCourses();
//       loadCountries();
//     }
//   }, [isOpen]);

//   // ================= Modal Window Event Listeners =================
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isOpen]);

//   // ================= Cascading Control Form Handlers =================
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setForm((prev) => ({ ...prev, course_id: Number(e.target.value) }));
//   };

//   const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const selectedCountryId = Number(e.target.value);
//     setForm((prev) => ({
//       ...prev,
//       country_id: selectedCountryId,
//       city_id: 0,
//       campus_id: 0,
//     }));
//     setCities([]);
//     setCampuses([]);

//     if (selectedCountryId > 0) {
//       loadCities(selectedCountryId);
//     }
//   };

//   const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const selectedCityId = Number(e.target.value);
//     setForm((prev) => ({
//       ...prev,
//       city_id: selectedCityId,
//       campus_id: 0,
//     }));
//     setCampuses([]);

//     if (selectedCityId > 0) {
//       loadCampuses(selectedCityId);
//     }
//   };

//   const handleCampusChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setForm((prev) => ({ ...prev, campus_id: Number(e.target.value) }));
//   };

//   // ================= Form Submission Handling =================
//   const submitLead = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.course_id === 0 || form.country_id === 0 || form.city_id === 0) {
//       alert("Please fill out all drop-down options.");
//       return;
//     }

//     try {
//       const res = await api.post("/lead-form", form);
//       alert(`Lead Submitted Successfully as "${form.lead_type}"!`);
//       console.log("Server Response:", res.data);

//       setForm({
//         course_id: 0,
//         country_id: 0,
//         city_id: 0,
//         campus_id: 0,
//         full_name: "",
//         email: "",
//         phone_number: "",
//         lead_type: "",
//       });
//       setCities([]);
//       setCampuses([]);
//       onClose();
//     } catch (error) {
//       console.error("Form Submit Failure:", error);
//       alert("Failed to submit lead data.");
//     }
//   };

//   if (!isOpen) return null;

//   // Transform nested courses for select elements if InputField requires objects/flat elements
//   // We handle layout cleanly matching the structure of your field schema
//   const countryOptions = countries.map((c) => ({ value: c.id, label: c.country_name }));
//   const cityOptions = cities.map((c) => ({ value: c.id, label: c.city_name }));
//   const campusOptions = campuses.map((c) => ({ value: c.id, label: c.campus_name }));

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
//       <div
//         ref={modalRef}
//         className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
//       >
//         {/* Header */}
//         <div className="px-6 pt-6 pb-2 text-center relative shrink-0">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <X className="h-5 w-5 stroke-[3]" />
//           </button>
//           <h3 className="text-xl font-bold text-[#0c1e43]">Talk to our expert</h3>
//           <p className="text-[12px] text-slate-500 mt-1">
//             Please share your details and we will reach out to you soon.
//           </p>
//         </div>

//         {/* Form Body */}
//         <form id="leadModalForm" onSubmit={submitLead} className="px-8 py-2 space-y-2.5 overflow-y-auto">
          
//           {/* Full Name */}
//           <InputField
//             name="full_name"
//             type="text"
//             placeholder="Full Name"
//             value={form.full_name}
//             onChange={handleInputChange}
//             required
//           />

//           {/* Email */}
//           <InputField
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleInputChange}
//             required
//           />

//           {/* Phone Number */}
//           <InputField
//             name="phone_number"
//             type="tel"
//             placeholder="Phone Number"
//             value={form.phone_number}
//             onChange={handleInputChange}
//             required
//           />

//           {/* Course Selector */}
//           <div className="relative">
//             <select
//               name="course_id"
//               value={form.course_id}
//               onChange={handleCourseChange}
//               required
//               className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none"
//             >
//               <option value={0}>Select Course</option>
//               {courseGroups.map((group) => (
//                 <optgroup key={group.title} label={group.title}>
//                   {group.courses.map((course) => (
//                     <option key={course.id} value={course.id}>
//                       {course.course_name}
//                     </option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           {/* Country Selector */}
//           <div className="relative">
//             <select
//               name="country_id"
//               value={form.country_id}
//               onChange={handleCountryChange}
//               required
//               className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none"
//             >
//               <option value={0}>Select Your Country</option>
//               {countryOptions.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* City Selector */}
//           <div className="relative">
//             <select
//               name="city_id"
//               value={form.city_id}
//               onChange={handleCityChange}
//               disabled={form.country_id === 0 || cities.length === 0}
//               required
//               className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none disabled:opacity-60"
//             >
//               <option value={0}>
//                 {form.country_id === 0 ? "Choose Country First" : "Select Your City"}
//               </option>
//               {cityOptions.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Campus Selector */}
//           <div className="relative">
//             <select
//               name="campus_id"
//               value={form.campus_id}
//               onChange={handleCampusChange}
//               disabled={form.city_id === 0 || campuses.length === 0}
//               className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none disabled:opacity-60"
//             >
//               <option value={0}>
//                 {form.city_id === 0
//                   ? "Choose City First"
//                   : campuses.length === 0
//                   ? "No Campuses Available"
//                   : "Nearest Campus"}
//               </option>
//               {campusOptions.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>

//         {/* Footer with Double Action Submission buttons structured as styled in original */}
//         <div className="p-5 pt-2 flex gap-3 justify-center shrink-0">
//           <button
//             type="submit"
//             form="leadModalForm"
//             onClick={() => setForm((prev) => ({ ...prev, lead_type: "Talk to Expert" }))}
//             className="flex-1 bg-[#28a745] text-white text-[13px] font-bold py-3 rounded-xl hover:bg-[#218838] transition-colors shadow-lg active:scale-95 text-center"
//           >
//             Talk to Expert
//           </button>
//           <button
//             type="submit"
//             form="leadModalForm"
//             onClick={() => setForm((prev) => ({ ...prev, lead_type: "Brochure Download" }))}
//             className="flex-1 bg-[#007bff] text-white text-[13px] font-bold py-3 rounded-xl hover:bg-[#0056b3] transition-colors shadow-lg active:scale-95 text-center"
//           >
//             Download Brochure
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import api from "../api/api";
import { InputField } from "./InputField"; // Adjust path as necessary

// 1. IMPORT YOUR PDF FILE HERE
// Change "./brochure.pdf" to the actual relative path where your PDF file is stored
// import brochurePdf from "./assets/coursepdf.pdf";// Ensure this path is correct

// ================= Interfaces =================
interface Course {
  id: number;
  course_name: string;
}

interface CourseGroup {
  title: string;
  courses: Course[];
}

interface Country {
  id: number;
  country_name: string;
}

interface City {
  id: number;
  city_name: string;
}

interface Campus {
  id: number;
  campus_name: string;
}

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ================= State Variables =================
  const [courseGroups, setCourseGroups] = useState<CourseGroup[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [campuses, setCampuses] = useState<Campus[]>([]);

  const [form, setForm] = useState({
    course_id: 0,
    country_id: 0,
    city_id: 0,
    campus_id: 0,
    full_name: "",
    email: "",
    phone_number: "",
    lead_type: "",
  });

  // ================= API Request Methods =================
  const loadCourses = async () => {
    try {
      const res = await api.get("/course-categories/course-title");
      setCourseGroups(res.data.data || []);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadCountries = async () => {
    try {
      const res = await api.get("/countries/all");
      const incomingData = res.data.data ? res.data.data : res.data;
      setCountries(incomingData || []);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadCities = async (countryId: number) => {
    try {
      const res = await api.get(`/countries/${countryId}`);
      setCities(res.data.data || []);
    } catch (error) {
      console.error(`Error loading cities for country ID [${countryId}]:`, error);
      setCities([]);
    }
  };

  const loadCampuses = async (cityId: number) => {
    try {
      const res = await api.get(`/cities/${cityId}/campuses`);
      setCampuses(res.data.data || []);
    } catch (error) {
      console.error(`Error loading campuses for city ID [${cityId}]:`, error);
      setCampuses([]);
    }
  };

  // ================= Setup Initialization =================
  useEffect(() => {
    if (isOpen) {
      loadCourses();
      loadCountries();
    }
  }, [isOpen]);

  // ================= Modal Window Event Listeners =================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // ================= Cascading Control Form Handlers =================
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, course_id: Number(e.target.value) }));
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      country_id: selectedCountryId,
      city_id: 0,
      campus_id: 0,
    }));
    setCities([]);
    setCampuses([]);

    if (selectedCountryId > 0) {
      loadCities(selectedCountryId);
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      city_id: selectedCityId,
      campus_id: 0,
    }));
    setCampuses([]);

    if (selectedCityId > 0) {
      loadCampuses(selectedCityId);
    }
  };

  const handleCampusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, campus_id: Number(e.target.value) }));
  };

  // ================= Form Submission & Download Handling =================
  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.course_id === 0 || form.country_id === 0 || form.city_id === 0) {
      alert("Please fill out all drop-down options.");
      return;
    }

    // Capture the current lead type locally before resetting form state
    const currentLeadType = form.lead_type;

    try {
      const res = await api.post("/lead-form", form);
      alert(`Lead Submitted Successfully as "${currentLeadType}"!`);
      console.log("Server Response:", res.data);

      // Explicit download action triggers if user submitted via "Brochure Download" path
      if (currentLeadType === "Brochure Download") {
        triggerBrochureDownload();
      }

      // Reset Form State
      setForm({
        course_id: 0,
        country_id: 0,
        city_id: 0,
        campus_id: 0,
        full_name: "",
        email: "",
        phone_number: "",
        lead_type: "",
      });
      setCities([]);
      setCampuses([]);
      onClose();
    } catch (error) {
      console.error("Form Submit Failure:", error);
      alert("Failed to submit lead data.");
    }
  };

  // Helper function to force native download behavior on any device browser
  const triggerBrochureDownload = () => {
    const link = document.createElement("a");
    // link.href = brochurePdf; 
    link.setAttribute("download", "Course_Brochure.pdf"); // Explicitly forces file save dialog
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const countryOptions = countries.map((c) => ({ value: c.id, label: c.country_name }));
  const cityOptions = cities.map((c) => ({ value: c.id, label: c.city_name }));
  const campusOptions = campuses.map((c) => ({ value: c.id, label: c.campus_name }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5 stroke-[3]" />
          </button>
          <h3 className="text-xl font-bold text-[#0c1e43]">Talk to our expert</h3>
          <p className="text-[12px] text-slate-500 mt-1">
            Please share your details and we will reach out to you soon.
          </p>
        </div>

        {/* Form Body */}
        <form id="leadModalForm" onSubmit={submitLead} className="px-8 py-2 space-y-2.5 overflow-y-auto">
          
          {/* Full Name */}
          <InputField
            name="full_name"
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleInputChange}
            required
          />

          {/* Email */}
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />

          {/* Phone Number */}
          <InputField
            name="phone_number"
            type="tel"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleInputChange}
            required
          />

          {/* Course Selector */}
          <div className="relative">
            <select
              name="course_id"
              value={form.course_id}
              onChange={handleCourseChange}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none"
            >
              <option value={0}>Select Course</option>
              {courseGroups.map((group) => (
                <optgroup key={group.title} label={group.title}>
                  {group.courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Country Selector */}
          <div className="relative">
            <select
              name="country_id"
              value={form.country_id}
              onChange={handleCountryChange}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none"
            >
              <option value={0}>Select Your Country</option>
              {countryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* City Selector */}
          <div className="relative">
            <select
              name="city_id"
              value={form.city_id}
              onChange={handleCityChange}
              disabled={form.country_id === 0 || cities.length === 0}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none disabled:opacity-60"
            >
              <option value={0}>
                {form.country_id === 0 ? "Choose Country First" : "Select Your City"}
              </option>
              {cityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Campus Selector */}
          <div className="relative">
            <select
              name="campus_id"
              value={form.campus_id}
              onChange={handleCampusChange}
              disabled={form.city_id === 0 || campuses.length === 0}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 appearance-none disabled:opacity-60"
            >
              <option value={0}>
                {form.city_id === 0
                  ? "Choose City First"
                  : campuses.length === 0
                  ? "No Campuses Available"
                  : "Nearest Campus"}
              </option>
              {campusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Footer with Double Action Submission buttons */}
        <div className="p-5 pt-2 flex gap-3 justify-center shrink-0">
          <button
            type="submit"
            form="leadModalForm"
            onClick={() => setForm((prev) => ({ ...prev, lead_type: "Talk to Expert" }))}
            className="flex-1 bg-[#28a745] text-white text-[13px] font-bold py-3 rounded-xl hover:bg-[#218838] transition-colors shadow-lg active:scale-95 text-center"
          >
            Talk to Expert
          </button>
          <button
            type="submit"
            form="leadModalForm"
            onClick={() => setForm((prev) => ({ ...prev, lead_type: "Brochure Download" }))}
            className="flex-1 bg-[#007bff] text-white text-[13px] font-bold py-3 rounded-xl hover:bg-[#0056b3] transition-colors shadow-lg active:scale-95 text-center"
          >
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};