
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from "react"; // Fixed import location
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { EnquireModal } from "./EnquireModal";

export default function Layout() {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={() => {}}
        onSelectSchool={() => {}}
        onNavigate={() => {}}
        selectedSchoolId={null}
        onOpenApplyModal={() => {}}
        onOpenEnquireModal={() => setIsEnquireOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Rendered at the root layout level so it is accessible on every page view */}
      <EnquireModal 
        isOpen={isEnquireOpen} 
        onClose={() => setIsEnquireOpen(false)} 
      />
    </div>
  );
}