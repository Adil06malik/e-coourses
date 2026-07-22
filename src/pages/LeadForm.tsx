

// import React, { useState, useEffect } from 'react';
// import { getCampuses, getCourses, createPayment, PaymentPayload } from '../api/payment';

// interface Campus {
//   id: number;
//   campus_name: string;
//   city: { city_name: string };
// }

// interface Course {
//   id: number;
//   course_name: string;
//   courseGroup: { title: string };
// }

// const PaymentForm = () => {
//   const [campuses, setCampuses] = useState<Campus[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);
  
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     phone_number: '',
//     amount: '',
//     payment_method: 'Credit Card',
//     campus_id: '',
//     course_id: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [campusData, courseData] = await Promise.all([
//           getCampuses(),
//           getCourses()
//         ]);
//         setCampuses(Array.isArray(campusData) ? campusData : []);
//         setCourses(Array.isArray(courseData) ? courseData : []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload: PaymentPayload = {
//         full_name: formData.full_name,
//         email: formData.email,
//         phone_number: formData.phone_number,
//         amount: parseFloat(formData.amount),
//         payment_method: formData.payment_method,
//         campus_id: parseInt(formData.campus_id),
//         course_id: parseInt(formData.course_id),
//       };
//       await createPayment(payload);
//       alert('Payment and Lead created successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.pageWrapper}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <div style={styles.iconBox}>💳</div>
//           <h2 style={styles.title}>Fees Payment</h2>
//         </div>
//         <p style={styles.subtitle}>
//           Please enter your details. If your mobile number is already registered, your details will be fetched automatically.
//         </p>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Mobile Number <span style={styles.required}>*</span></label>
//             <input 
//               name="phone_number" 
//               value={formData.phone_number} 
//               placeholder="Enter Mobile Number" 
//               required 
//               onChange={handleChange} 
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.row}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
//               <input 
//                 name="full_name" 
//                 value={formData.full_name} 
//                 placeholder="Full Name" 
//                 required 
//                 onChange={handleChange} 
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Email ID <span style={styles.required}>*</span></label>
//               <input 
//                 name="email" 
//                 type="email" 
//                 value={formData.email} 
//                 placeholder="something@example.com" 
//                 required 
//                 onChange={handleChange} 
//                 style={styles.input}
//               />
//             </div>
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Campus <span style={styles.required}>*</span></label>
//             <select 
//               name="campus_id" 
//               value={formData.campus_id} 
//               required 
//               onChange={handleChange}
//               style={styles.select}
//             >
//               <option value="">Select Campus</option>
//               {campuses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.campus_name} - {c.city?.city_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div style={styles.row}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Course <span style={styles.required}>*</span></label>
//               <select 
//                 name="course_id" 
//                 value={formData.course_id} 
//                 required 
//                 onChange={handleChange}
//                 style={styles.select}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.course_name} ({c.courseGroup.title})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Payment Method</label>
//               <select 
//                 name="payment_method" 
//                 value={formData.payment_method} 
//                 onChange={handleChange}
//                 style={styles.select}
//               >
//                 <option value="Credit Card">Credit Card</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//               </select>
//             </div>
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
//             <div style={styles.amountWrapper}>
//               <span style={styles.currencyPrefix}>₹</span>
//               <input 
//                 name="amount" 
//                 type="number" 
//                 value={formData.amount} 
//                 placeholder="Enter Amount" 
//                 required 
//                 onChange={handleChange} 
//                 style={styles.amountInput}
//               />
//               <span style={styles.currencySuffix}>.00</span>
//             </div>
//           </div>

//           <p style={styles.termsText}>
//             By clicking, you are confirming that you have read, understood and agreed to <a href="#terms" style={styles.link}>Terms and Conditions</a>.
//           </p>

//           <button type="submit" disabled={loading} style={styles.button}>
//             {loading ? 'Processing...' : 'Continue Payment'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f4f7fc',
//     minHeight: '100vh',
//     padding: '20px',
//     fontFamily: 'Inter, sans-serif',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: '40px',
//     borderRadius: '16px',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
//     width: '100%',
//     maxWidth: '520px',
//     boxSizing: 'border-box' as const,
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     marginBottom: '10px',
//   },
//   iconBox: {
//     fontSize: '28px',
//   },
//   title: {
//     margin: 0,
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   subtitle: {
//     fontSize: '13px',
//     color: '#666',
//     lineHeight: '1.5',
//     marginBottom: '24px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '16px',
//   },
//   row: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '16px',
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '6px',
//     flex: 1,
//   },
//   label: {
//     fontSize: '13px',
//     fontWeight: '600',
//     color: '#333',
//   },
//   required: {
//     color: '#e53e3e',
//   },
//   input: {
//     padding: '12px 14px',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0',
//     backgroundColor: '#f8fafc',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'border-color 0.2s',
//   },
//   select: {
//     padding: '12px 14px',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0',
//     backgroundColor: '#f8fafc',
//     fontSize: '14px',
//     outline: 'none',
//     cursor: 'pointer',
//   },
//   amountWrapper: {
//     display: 'flex',
//     alignItem: 'center',
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     backgroundColor: '#f8fafc',
//     overflow: 'hidden',
//   },
//   currencyPrefix: {
//     padding: '12px 0 12px 14px',
//     color: '#64748b',
//     fontWeight: '500',
//   },
//   amountInput: {
//     flex: 1,
//     border: 'none',
//     backgroundColor: 'transparent',
//     padding: '12px 8px',
//     fontSize: '14px',
//     outline: 'none',
//   },
//   currencySuffix: {
//     padding: '12px 14px 12px 0',
//     color: '#64748b',
//     fontWeight: '500',
//   },
//   termsText: {
//     fontSize: '12px',
//     color: '#64748b',
//     lineHeight: '1.4',
//     margin: '4px 0',
//   },
//   link: {
//     color: '#2563eb',
//     textDecoration: 'underline',
//   },
//   button: {
//     marginTop: '10px',
//     backgroundColor: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '14px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s',
//   },
// };

// export default PaymentForm;

////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { getCampuses, getCourses, createPayment, PaymentPayload } from '../api/payment';

// interface Campus {
//   id: number;
//   campus_name: string;
//   city: { city_name: string };
// }

// interface Course {
//   id: number;
//   course_name: string;
//   courseGroup: { title: string };
// }

// const PaymentForm = () => {
//   const [campuses, setCampuses] = useState<Campus[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);
  
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     phone_number: '',
//     amount: '',
//     payment_method: 'Credit Card',
//     campus_id: '',
//     course_id: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [campusData, courseData] = await Promise.all([
//           getCampuses(),
//           getCourses()
//         ]);
//         setCampuses(Array.isArray(campusData) ? campusData : []);
//         setCourses(Array.isArray(courseData) ? courseData : []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload: PaymentPayload = {
//         full_name: formData.full_name,
//         email: formData.email,
//         phone_number: formData.phone_number,
//         amount: parseFloat(formData.amount),
//         payment_method: formData.payment_method,
//         campus_id: parseInt(formData.campus_id),
//         course_id: parseInt(formData.course_id),
//       };
//       await createPayment(payload);
//       alert('Payment and Lead created successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.pageWrapper}>
//       <div style={styles.container}>
//         {/* Left Form Section */}
//         <div style={styles.formCard}>
//           <div style={styles.header}>
//             <span style={styles.icon}>💳</span>
//             <h2 style={styles.title}>Fees Payment</h2>
//           </div>
//           <p style={styles.subtitle}>
//             Please enter your mobile number. If it is already registered, your details will be fetched automatically.
//           </p>

//           <form onSubmit={handleSubmit} style={styles.form}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Mobile Number <span style={styles.required}>*</span></label>
//               <input 
//                 name="phone_number" 
//                 value={formData.phone_number} 
//                 placeholder="Enter Mobile Number" 
//                 required 
//                 onChange={handleChange} 
//                 style={styles.input}
//               />
//             </div>

//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
//                 <input 
//                   name="full_name" 
//                   value={formData.full_name} 
//                   placeholder="Full Name" 
//                   required 
//                   onChange={handleChange} 
//                   style={styles.input}
//                 />
//               </div>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Email ID <span style={styles.required}>*</span></label>
//                 <input 
//                   name="email" 
//                   type="email" 
//                   value={formData.email} 
//                   placeholder="something@example.com" 
//                   required 
//                   onChange={handleChange} 
//                   style={styles.input}
//                 />
//               </div>
//             </div>

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Campus <span style={styles.required}>*</span></label>
//               <select 
//                 name="campus_id" 
//                 value={formData.campus_id} 
//                 required 
//                 onChange={handleChange}
//                 style={styles.select}
//               >
//                 <option value="">Select</option>
//                 {campuses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.campus_name} - {c.city?.city_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Course <span style={styles.required}>*</span></label>
//                 <select 
//                   name="course_id" 
//                   value={formData.course_id} 
//                   required 
//                   onChange={handleChange}
//                   style={styles.select}
//                 >
//                   <option value="">Select</option>
//                   {courses.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.course_name} ({c.courseGroup.title})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Payment Method</label>
//                 <select 
//                   name="payment_method" 
//                   value={formData.payment_method} 
//                   onChange={handleChange}
//                   style={styles.select}
//                 >
//                   <option value="Credit Card">Credit Card</option>
//                   <option value="Bank Transfer">Bank Transfer</option>
//                 </select>
//               </div>
//             </div>

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
//               <div style={styles.amountWrapper}>
//                 <span style={styles.currencyPrefix}>₹</span>
//                 <input 
//                   name="amount" 
//                   type="number" 
//                   value={formData.amount} 
//                   placeholder="Enter Amount" 
//                   required 
//                   onChange={handleChange} 
//                   style={styles.amountInput}
//                 />
//                 <span style={styles.currencySuffix}>.00</span>
//               </div>
//             </div>

//             <p style={styles.termsText}>
//               By clicking, you are confirming that you have read, understood and agreed to <a href="#terms" style={styles.link}>BIA® Terms and Conditions</a>.
//             </p>

//             <button type="submit" disabled={loading} style={styles.button}>
//               {loading ? 'Processing...' : 'Continue Payment'}
//             </button>
//           </form>
//         </div>

//         {/* Right Image Banner Section */}
//         <div style={styles.imageCard}>
//           <div style={styles.blueCircle}></div>
//           <img 
//             src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" 
//             alt="Graduate Student" 
//             style={styles.graduateImage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f5fc',
//     minHeight: '100vh',
//     padding: '20px',
//     fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
//     boxSizing: 'border-box' as const,
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'row' as const,
//     backgroundColor: '#ffffff',
//     borderRadius: '20px',
//     boxShadow: '0 12px 35px rgba(0, 0, 0, 0.06)',
//     width: '100%',
//     maxWidth: '960px',
//     overflow: 'hidden',
//     '@media (max-width: 850px)': {
//       flexDirection: 'column' as const,
//     },
//   },
//   formCard: {
//     flex: 1,
//     padding: '40px',
//     boxSizing: 'border-box' as const,
//     display: 'flex',
//     flexDirection: 'column' as const,
//     justifyContent: 'center',
//   },
//   imageCard: {
//     flex: 1,
//     backgroundColor: '#eaf1fc',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     position: 'relative' as const,
//     overflow: 'hidden',
//     minHeight: '400px',
//   },
//   blueCircle: {
//     position: 'absolute' as const,
//     width: '320px',
//     height: '320px',
//     backgroundColor: '#9abcf8',
//     borderRadius: '50%',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -55%)',
//     zIndex: 1,
//   },
//   graduateImage: {
//     position: 'relative' as const,
//     zIndex: 2,
//     maxHeight: '480px',
//     objectFit: 'contain' as const,
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     marginBottom: '8px',
//   },
//   icon: {
//     fontSize: '24px',
//   },
//   title: {
//     margin: 0,
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   subtitle: {
//     fontSize: '13px',
//     color: '#666',
//     lineHeight: '1.5',
//     marginBottom: '24px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '16px',
//   },
//   row: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '14px',
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '6px',
//     flex: 1,
//   },
//   label: {
//     fontSize: '13px',
//     fontWeight: '600',
//     color: '#2d3748',
//   },
//   required: {
//     color: '#e53e3e',
//   },
//   input: {
//     padding: '12px 14px',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0',
//     backgroundColor: '#f8fafc',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'border-color 0.2s',
//   },
//   select: {
//     padding: '12px 14px',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0',
//     backgroundColor: '#f8fafc',
//     fontSize: '14px',
//     outline: 'none',
//     cursor: 'pointer',
//   },
//   amountWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     backgroundColor: '#f8fafc',
//     overflow: 'hidden',
//   },
//   currencyPrefix: {
//     padding: '12px 0 12px 14px',
//     color: '#64748b',
//     fontWeight: '500',
//   },
//   amountInput: {
//     flex: 1,
//     border: 'none',
//     backgroundColor: 'transparent',
//     padding: '12px 8px',
//     fontSize: '14px',
//     outline: 'none',
//   },
//   currencySuffix: {
//     padding: '12px 14px 12px 0',
//     color: '#64748b',
//     fontWeight: '500',
//   },
//   termsText: {
//     fontSize: '12px',
//     color: '#64748b',
//     lineHeight: '1.4',
//     margin: '4px 0',
//   },
//   link: {
//     color: '#2563eb',
//     textDecoration: 'underline',
//   },
//   button: {
//     marginTop: '6px',
//     backgroundColor: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '14px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s',
//   },
// };

// export default PaymentForm;




import React, { useState, useEffect } from 'react';
import { getCampuses, getCourses, createPayment, PaymentPayload } from '../api/payment';

interface Campus {
  id: number;
  campus_name: string;
  city: { city_name: string };
}

interface Course {
  id: number;
  course_name: string;
  courseGroup: { title: string };
}

const PaymentForm = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    amount: '',
    payment_method: 'Credit Card',
    campus_id: '',
    course_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campusData, courseData] = await Promise.all([
          getCampuses(),
          getCourses()
        ]);
        setCampuses(Array.isArray(campusData) ? campusData : []);
        setCourses(Array.isArray(courseData) ? courseData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: PaymentPayload = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method,
        campus_id: parseInt(formData.campus_id),
        course_id: parseInt(formData.course_id),
      };
      await createPayment(payload);
      alert('Payment and Lead created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left Form Section */}
        <div style={styles.formCard}>
          <div style={styles.header}>
            <span style={styles.icon}>💳</span>
            <h2 style={styles.title}>Fees Payment</h2>
          </div>
          <p style={styles.subtitle}>
            Please enter your mobile number. If it is already registered, your details will be fetched automatically.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number <span style={styles.required}>*</span></label>
              <input 
                name="phone_number" 
                value={formData.phone_number} 
                placeholder="Enter Mobile Number" 
                required 
                onChange={handleChange} 
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
                <input 
                  name="full_name" 
                  value={formData.full_name} 
                  placeholder="Full Name" 
                  required 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email ID <span style={styles.required}>*</span></label>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  placeholder="something@example.com" 
                  required 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Campus <span style={styles.required}>*</span></label>
              <select 
                name="campus_id" 
                value={formData.campus_id} 
                required 
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Select</option>
                {campuses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.campus_name} - {c.city?.city_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Course <span style={styles.required}>*</span></label>
                <select 
                  name="course_id" 
                  value={formData.course_id} 
                  required 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.course_name} ({c.courseGroup.title})
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Payment Method</label>
                <select 
                  name="payment_method" 
                  value={formData.payment_method} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
              <div style={styles.amountWrapper}>
                <span style={styles.currencyPrefix}>₹</span>
                <input 
                  name="amount" 
                  type="number" 
                  value={formData.amount} 
                  placeholder="Enter Amount" 
                  required 
                  onChange={handleChange} 
                  style={styles.amountInput}
                />
                <span style={styles.currencySuffix}>.00</span>
              </div>
            </div>

            <p style={styles.termsText}>
              By clicking, you are confirming that you have read, understood and agreed to <a href="#terms" style={styles.link}>BIA® Terms and Conditions</a>.
            </p>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Processing...' : 'Continue Payment'}
            </button>
          </form>
        </div>

        {/* Right Image Banner Section with responsive hide/show support */}
        <div className="image-banner-container" style={styles.imageCard}>
          <div style={styles.blueCircle}></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" 
            alt="Graduate Student" 
            style={styles.graduateImage}
          />
        </div>
      </div>

      {/* Media query styling injected dynamically for full layout responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="max-width: 980px"] {
            flex-direction: column !important;
            max-width: 520px !important;
          }
          .image-banner-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    padding: '16px',
    boxSizing: 'border-box' as const,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '980px',
    overflow: 'hidden',
    boxSizing: 'border-box' as const,
  },
  formCard: {
    flex: 1,
    padding: '36px',
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  imageCard: {
    flex: 1,
    backgroundColor: '#eaf1fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative' as const,
    overflow: 'hidden',
    minHeight: '450px',
  },
  blueCircle: {
    position: 'absolute' as const,
    width: '300px',
    height: '300px',
    backgroundColor: '#9abcf8',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
    zIndex: 1,
  },
  graduateImage: {
    position: 'relative' as const,
    zIndex: 2,
    maxHeight: '460px',
    objectFit: 'contain' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  icon: {
    fontSize: '24px',
  },
  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
    flex: 1,
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2d3748',
  },
  required: {
    color: '#e53e3e',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
  },
  amountWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  currencyPrefix: {
    padding: '10px 0 10px 12px',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '13px',
  },
  amountInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    padding: '10px 6px',
    fontSize: '13px',
    outline: 'none',
  },
  currencySuffix: {
    padding: '10px 12px 10px 0',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '13px',
  },
  termsText: {
    fontSize: '11px',
    color: '#64748b',
    lineHeight: '1.4',
    margin: '2px 0',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
  },
  button: {
    marginTop: '4px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default PaymentForm;