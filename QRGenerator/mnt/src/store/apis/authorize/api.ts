// import {axiosInstance} from '@src/store'
// import { createAsyncThunk } from '@reduxjs/toolkit';


// export const authorizeApi = createAsyncThunk(
//  'auth/authorize',
//  async ({ endpoint, headers = {} }: 
//     { endpoint: string, headers?: Record<string, string> },
//     { rejectWithValue }
// ) => {

//         const response = await axiosInstance.get(endpoint, {
//             headers: {
//                 ...headers,
//                 'Content-Type': 'application/json',
//             },
//             withCredentials: true,
//         });
//         const responseData = response.data;
//         console.log(responseData.error)
//         // Ensure the success response has a consistent structure
//         if (responseData.error) {
//           // Handle the error case based on the response
//           return rejectWithValue({
//             process: responseData.process || "authorize",
//             status: false,
//             data: null,
//             error: responseData.error || "Unknown error",
//             statusCode: responseData.statusCode || 500,
//           });
//         }
//         return {
//           process: responseData.process || "authorize",
//           status: responseData.status || true,
//           data: responseData.data || null,
//           error: responseData.error || null,
//           statusCode: responseData.statusCode || 200,
//         };
        
// }
// )


