import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminInfo, loginInfo, userInfo } from "@src/data";
import { AdminInfo, LoginInfo, StateResponse, UserInfo } from "@src/interfaces";
import { requestApi } from "@src/store/apis/info";

interface InitialState {
  infos: {
    userInfo: UserInfo;
    userInfoArray: UserInfo[];
    loginInfo: LoginInfo;
    adminInfo: AdminInfo;
    adminInfoArray: AdminInfo[];
    fileInfo: Blob | null | File;
    processInfo: string;
    adminRoleInfo: string;
  };
  response: StateResponse;
}
const initialState: InitialState = {
  infos: {
    userInfo: userInfo,
    userInfoArray: [],
    loginInfo: loginInfo,
    adminInfo: adminInfo,
    adminInfoArray: [],
    fileInfo: null,
    processInfo: "",
    adminRoleInfo: '',
  },
  response: {
    data: null,
    loading: false,
    process: "",
    error: [],
    status: false,
    statusCode: null,
  },
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.infos.userInfo = action.payload;
    },
    setUserInfoArray: (state, action: PayloadAction<UserInfo[]>) => {
      state.infos.userInfoArray = action.payload;
    },
    setAdminInfo: (state, action: PayloadAction<AdminInfo>) => {
      state.infos.adminInfo = action.payload;
    },
    setLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.infos.loginInfo = action.payload;
    },
    setFileInfo: (state, action: PayloadAction<Blob | File>) => {
      state.infos.fileInfo = action.payload;
    },
    setProcessInfo: (state, action: PayloadAction<string>) => {
      state.infos.processInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle abilityApi
      .addCase(requestApi.pending, (state) => {
        state.response.loading = true;
        state.response.statusCode = 201;
        state.response.status = true;
      })
      .addCase(requestApi.fulfilled, (state, action) => {
        const { data, process, status, statusCode } = action.payload;
        state.response.error = [];
        state.response.loading = false;
        state.response.status = status;
        state.response.data = data;
        state.response.process = process;
        state.response.statusCode = statusCode;

    
        if (process === "authorization" || process === "login") {
          state.infos.processInfo = process;
          state.infos.adminRoleInfo = action.payload.data.access ? action.payload.data.access : 'none';
        } else {
          const parsedData = data.map((item: any) => {
          let imgData = item.info.img;
            try {
              imgData =
                typeof imgData === "string" ? JSON.parse(imgData) : imgData;
            } catch (e) {
              console.error("JSON parsing error:", e);
              imgData = null; // or set a default value if necessary
            }

            return {
              ...item,
              info: {
                ...item.info,
                img: imgData,
              },
            };
          });
          if (parsedData[0].info.username) {
            state.infos.adminInfoArray = parsedData;
          }
          state.infos.userInfoArray = parsedData;
        }
      })
      .addCase(requestApi.rejected, (state, action) => {
        const { status, process, error, statusCode } =
          action.payload as StateResponse;
        state.response.loading = false;
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Ability Operations";
      });
  },
});

export const {
  setAdminInfo,
  setLoginInfo,
  setProcessInfo,
  setUserInfoArray,
  setUserInfo,
  setFileInfo,
} = infoSlice.actions;

export default infoSlice.reducer;
