/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function StatsSection() {
  return (
    <section className="relative py-20 text-white scroll-mt-20 overflow-hidden" id="placements">
      {/* Immersive background office illustration covered by screen mask overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')" 
        }}
      />
      <div className="absolute inset-0 bg-slate-950/85 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Title Banner in the Center */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3.5xl md:text-4xl font-extrabold tracking-tight text-white">
            Global Leader in Professional Training Courses
          </h2>
        </div>

        {/* Dynamic Inner Grid with custom division border masks */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center">
            
            {/* Cell 1: Countries */}
            <div className="pb-8 md:pb-12 md:pr-4 border-b border-slate-800 md:border-r">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                7+
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                Countries
              </span>
            </div>

            {/* Cell 2: BIA Campus */}
            <div className="py-8 md:py-0 md:pb-12 md:px-4 border-b border-slate-800 md:border-r">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                107+
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                BIA<sup>®</sup> Campus
              </span>
            </div>

            {/* Cell 3: Partners */}
            <div className="py-8 md:py-0 md:pb-12 md:pl-4 border-b border-slate-800">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                350+
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                Global Corporate Partners
              </span>
            </div>

            {/* Cell 4: Trained Students */}
            <div className="py-8 md:py-0 md:pt-12 md:pr-4 border-b md:border-b-0 border-slate-800 md:border-r">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                500,000+
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                BIA<sup>®</sup> Trained Students
              </span>
            </div>

            {/* Cell 5: Training Hours */}
            <div className="py-8 md:py-0 md:pt-12 md:px-4 border-b md:border-b-0 border-slate-800 md:border-r">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                15+ Million
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                Training Hours Completed
              </span>
            </div>

            {/* Cell 6: Trainers */}
            <div className="pt-8 md:pt-12 md:pl-4">
              <span className="block font-sans text-4xl sm:text-5xl font-black text-[#00c5ff] tracking-tight">
                7,000+
              </span>
              <span className="block text-white text-xs sm:text-sm font-extrabold mt-3">
                Industry Trainers
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
