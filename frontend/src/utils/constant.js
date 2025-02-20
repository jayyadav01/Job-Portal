const isProduction = process.env.NODE_ENV === "production";

console.log("user api end point =>",process.env.REACT_APP_MAIN_URL)

const BASE_URL = process.env.REACT_APP_MAIN_URL

// Set BASE_URL based on environment
// const BASE_URL = isProduction
//   ? "https://backend-pi-eight-54.vercel.app"
//   : "http://localhost:5000"; 


export const USER_API_END_POINT = `${BASE_URL}/api/user`
export const COMPANY_API_END_POINT = `${BASE_URL}/api/company`
export const JOB_API_END_POINT = `${BASE_URL}/api/job`
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/application`