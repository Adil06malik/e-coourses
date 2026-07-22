
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import HomePage from "./components/Home";
import FeesPayment from "./components/FeesStations";
import Council from "./components/Council";
import Campus from "./components/Campus";
import Layout from "./components/Layout";
import CourseDetailView from "./components/CourseDetailView";
import CourseDashboard from "./components/DetailedCourse";
import ScrollToTop from "./components/ScrollToTop";
// 1. Import your course dataset array here
import { COURSES } from "./data"; 

// 2. Create a mini wrapper component to pass the required props automatically
function CourseDetailWrapper({ onOpenApplyModal }: { onOpenApplyModal: (course: any) => void }) {
  const { id } = useParams<{ id: string }>(); // Reads ":id" from the URL path
  const navigate = useNavigate();             // Used to program back button behavior

  // Look up the active course data profile matching the URL param string
  const currentCourse = COURSES.find((c) => c.id === id);

  // Fallback state if a user refreshes an invalid path manually
  if (!currentCourse) {
    return (
      <div className="p-12 text-center bg-white rounded-xl shadow-sm border border-slate-200 my-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-800">Course Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested program profile does not exist or has moved.</p>
        <button 
          onClick={() => navigate("/")} 
          className="mt-5 px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-md hover:bg-blue-900/90 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Pass down all 3 properties that CourseDetailView demands
  return (
    <CourseDetailView
      course={currentCourse}
      onBackToCatalog={() => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onOpenApplyModal={onOpenApplyModal}
    />
  );
}

function App() {
  // Global modal layout handlers
  const handleOpenApplyModal = (course?: any) => {
    console.log("Opening application modal for:", course?.title || "General Advisement");
    // Connect your global state modal window toggle engines here if required
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/fees-payment" element={<FeesPayment />} />
          <Route path="/advisory-council" element={<Council />} />
          <Route path="/campuses" element={<Campus />} />
          
          {/* FIXED: Changed handleGlobalModalTrigger to handleOpenApplyModal */}
          <Route 
            path="/CourseDetiled/:schoolId" 
            element={<CourseDashboard />} 
          />
          
          <Route 
            path="/course/:id" 
            element={<CourseDetailWrapper onOpenApplyModal={handleOpenApplyModal} />} 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;



// import PaymentForm from "./pages/LeadForm";

// function App() {
//   return (
//     <div>
//       <PaymentForm />
//     </div>
//   );
// }

// export default App;