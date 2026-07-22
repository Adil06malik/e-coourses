/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { EnquireModal } from '../components/EnquireModal'; // Path to your modal component

export default function TargetSpecificPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has already popped up *on this page* during this session
    const hasTriggeredOnThisPage = sessionStorage.getItem('has_seen_modal_on_target_page');

    if (!hasTriggeredOnThisPage) {
      // 500ms slight delay for an ultra-smooth entrance after page animation settles
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        // Save flag to storage so it never auto-triggers again on this page session
        sessionStorage.setItem('has_seen_modal_on_target_page', 'true');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900">Premium AI Masterclass</h1>
      <p className="text-slate-600 mt-2">
        This is your dedicated page contents. The pop-up window opened automatically because you haven't filled out your inquiry details yet!
      </p>

      {/* Manual option fallback button if they close it and want it back */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-[#ff9800] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#e68a00]"
      >
        Enquire Now
      </button>

      {/* Renders safely only inside this specific layout file */}
      <EnquireModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}