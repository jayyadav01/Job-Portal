const isProduction = process.env.NODE_ENV === "production";

// Set BASE_URL based on environment
const BASE_URL = isProduction
  ? "https://frontend-b6qzs7c3t-jayyadav01s-projects.vercel.app" // Production URL
  : "http://localhost:5000"; // Local development URL


export const USER_API_END_POINT = `${BASE_URL}/api/user`
export const COMPANY_API_END_POINT = `${BASE_URL}/api/company`
export const JOB_API_END_POINT = `${BASE_URL}/api/job`
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/application`
