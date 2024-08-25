// import { axiosInstance } from '@src/store';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { LoginInfo } from '@src/shared';

// export const loginApi = createAsyncThunk(
//   'auth/login',
//   async (
//     { endpoint, data, method, headers = {} }: 
//     { endpoint: string, data: LoginInfo, method: string, headers?: Record<string, string> },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post(endpoint, data, {
//         headers: {
//           ...headers,
//           'Content-Type': 'application/json',
//         },
//         method: method,
//         withCredentials: true,
//       });
//       const responseData = response.data;

//       // Ensure the success response has a consistent structure
//       return {
//         process: responseData.process || "login",
//         status: responseData.status || true,
//         data: responseData.data || null,
//         error: responseData.error || null,
//         statusCode: responseData.statusCode || 200,
//       };
//     } catch (error: any) {
//       // Return a consistent error structure
//       return rejectWithValue({
//         process: error.response?.data?.process || "login",
//         status: false,
//         data: null,
//         error: error.response?.data?.error || error.message,
//         statusCode: error.response?.status || 500,
//       });
//     }
//   }
// );
