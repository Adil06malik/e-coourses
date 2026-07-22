/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  schoolId: string;
  duration: string; // e.g., "4 Months" or "6 Months"
  mode: string; // e.g., "Classroom & Live Online" or "Live Online Only"
  audience: string[]; // e.g., "Working Professionals", "Students"
  highlights: string[];
  syllabus: {
    module: string;
    topics: string[];
  }[];
  topSkills: string[];
  bannerImage: string;
  rating: number;
  popular: boolean;
}

export interface School {
  id: string;
  name: string;
  description: string;
  tagline: string;
  iconName: string; // Dynamic icon rendering name from Lucide
  stats: {
    students: string;
    experts: string;
    partners: string;
  };
}

export interface Campus {
  id: string;
  city: string;
  country: string;
  type: 'Global Hub' | 'Regional Center';
  address: string;
  phone: string;
  email: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  courseName: string;
  feedback: string;
  rating: number;
  avatar: string;
}

export interface InquiryForm {
  fullName: string;
  email: string;
  phone: string;
  selectedSchool: string;
  selectedCourse: string;
  mode: 'Classroom' | 'Online';
  experienceLevel: string;
  message: string;
}
