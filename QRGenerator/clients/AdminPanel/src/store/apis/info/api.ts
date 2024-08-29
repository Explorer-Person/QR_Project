import { axiosInstance } from '@src/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminInfo, LoginInfo, UserInfo } from '@src/interfaces';
import { downloadQR } from '@src/utils';

export const requestApi = createAsyncThunk(
  'info/request',
  async (
    { endpoint, data, method, headers = {}, process, imageFile }: 
    { endpoint: string, data: UserInfo | AdminInfo | LoginInfo, method: string, headers?: Record<string, string>, process: string, imageFile?: File | null | Blob },
    { rejectWithValue }
  ) => {
    try {
      let requestData;

      if (imageFile) {
        // If there's a file, create a FormData object
        const formData = new FormData();
        console.log(imageFile);
        // Append UserInfo data to the FormData object
        formData.append("file", imageFile);
        formData.append("data", JSON.stringify(data)); // Attach JSON data as a string

        headers['Content-Type'] = 'multipart/formdata'; // Set Content-Type for JSON
        
        requestData = formData;
      } else {
        // If no file, send the data as JSON
        requestData = { data: data};
        headers['Content-Type'] = 'application/json'; // Set Content-Type for JSON
      }

      const response = await axiosInstance.request({
        url: endpoint,
        headers: {
          ...headers,
          // Content-Type is automatically set for FormData
        },
        method: method,
        data: requestData,
        responseType: process === 'download' ? 'blob' : 'json',
        withCredentials: true,
      });

      if (process === 'download') {
        const qrPathArray = decodeURI(endpoint).split(`\\`);
        const fileName = qrPathArray[qrPathArray.length - 1];
        downloadQR(fileName, response);
      }

      const responseData = response.data;

      // Ensure the success response has a consistent structure
      return {
        process: responseData.process || "user",
        status: responseData.status || true,
        data: responseData.data || null,
        error: responseData.error || null,
        statusCode: responseData.statusCode || 200,
      };
    } catch (error: any) {
      // Return a consistent error structure
      return rejectWithValue({
        process: error.response?.data?.process || "user",
        status: false,
        data: null,
        error: error.response?.data?.error || error.message,
        statusCode: error.response?.status || 500,
      });
    }
  }
);
