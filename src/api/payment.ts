
import api from "../api/api";

export interface PaymentPayload {
  full_name: string;
  email: string;
  phone_number: string;
  amount: number;
  payment_method: string;
  campus_id: number;
  course_id: number;
}

export const getCampuses = async () => {
  const response = await api.get("/campuses");
  return response.data;
};



export const createPayment = async (data: PaymentPayload) => {
  const response = await api.post("/payments", data);
  return response.data;
};


export const getCourses = async () => {
    const response = await api.get("/courses");
    return response.data;
    }