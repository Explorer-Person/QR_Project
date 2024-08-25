// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { authorizeApi, loginApi, signupApi } from "@src/store";



// const initialState = {

// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     storeSignupData: (state, action: PayloadAction<SignupInfo>) => {
//       state.infos.signupData = action.payload;
//     },
//     storeLoginData: (state, action: PayloadAction<LoginInfo>) => {
//       state.infos.loginData = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle loginApi
//       .addCase(loginApi.pending, (state) => {
//         state.response.loading = true;
//         state.response.error = false;
//       })
//       .addCase(
//         loginApi.fulfilled,
//         (state, action: PayloadAction<RegularResponse>) => {
//           state.response.loading = false;
//           state.response.data = action.payload.data;
//           state.response.process = action.payload.process;
//         }
//       )
//       .addCase(loginApi.rejected, (state, action) => {
//         const {status, process, error, statusCode} = action.payload;
//         state.response.loading = false;
//         console.log(action)
//         state.response.status = status;
//         state.response.process = process;
//         state.response.statusCode = statusCode;
//         state.response.error = error ?? "Failed to login";
//       })
//       // Handle signupApi
//       .addCase(signupApi.pending, (state) => {
//         state.response.loading = true;
//         state.response.error = [];
//         state.response.statusCode = 201;
//       })
//       .addCase(
//         signupApi.fulfilled,
//         (state, action: PayloadAction<RegularResponse>) => {
//           state.response.loading = false;
//           state.response.data = action.payload.data;
//           state.response.process = action.payload.process;
//         }
//       )
//       .addCase(signupApi.rejected, (state, action) => {
//         const {status, process, error, statusCode} = action.payload;
//         state.response.loading = false;
//         console.log(action)
//         state.response.status = status;
//         state.response.process = process;
//         state.response.statusCode = statusCode;
//         state.response.error = error ?? "Failed to Signup";
//       })
//       // Handle authorizeApi
//       .addCase(authorizeApi.pending, (state) => {
//         state.response.loading = true;
//         state.response.error = [];
//         state.response.statusCode = 201;
//       })
//       .addCase(
//         authorizeApi.fulfilled,
//         (state, action: PayloadAction<RegularResponse>) => {
//           state.response.loading = false;
//           state.response.process = action.payload.process;
//           state.response.status = action.payload.status;
//         }
//       )
//       .addCase(authorizeApi.rejected, (state, action) => {
//         const {status, process, error, statusCode} = action.payload;
//         state.response.loading = false;
//         console.log(action)
//         state.response.status = status;
//         state.response.process = process;
//         state.response.statusCode = statusCode;
//         state.response.error = error ?? "Failed to Authorize";   
//       });
//   },
// });

// export default authSlice.reducer;
// export const { storeSignupData, storeLoginData } = authSlice.actions;
