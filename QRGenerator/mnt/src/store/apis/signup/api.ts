// import { axiosInstance } from "@src/store";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { SignupInfo } from "@src/shared";

// export const signupApi = createAsyncThunk(
//   "auth/signup",
//   async (
//     {
//       endpoint,
//       method,
//       data,
//       headers = {},
//     }: {
//       endpoint: string;
//       method: string;
//       data: SignupInfo;
//       headers?: Record<string, string>;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.request({
//         url: endpoint,
//         method: method,
//         headers: {
//           ...headers,
//           "Content-Type": "application/json",
//         },
//         data: data,
//         withCredentials: true,
//       });
//       const responseData = response.data;
//       // Ensure the success response has a consistent structure
//       return {
//         process: responseData.process || "signup",
//         status: responseData.status || true,
//         data: responseData.data || null,
//         error: responseData.error || null,
//         statusCode: responseData.statusCode || 200,
//       };
//     } catch (error: any) {
//       // Return a consistent error structure
//       return rejectWithValue({
//         process: error.response?.data?.process || "signup",
//         status: false,
//         data: null,
//         error: error.response?.data?.error || error.message,
//         statusCode: error.response?.status || 500,
//       });
//     }
//   }
// );
