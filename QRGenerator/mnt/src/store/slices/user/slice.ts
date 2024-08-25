import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInfo } from "@src/data";
import { StateResponse, UserInfo } from "@src/interfaces";
import { userApi } from "@src/store/apis/info";

interface InitialState {
  infos: {
    userInfo: UserInfo;
    userInfoArray: UserInfo[];
    fileInfo: Blob | null | File;
  };
  response: StateResponse;
}
const initialState: InitialState = {
  infos: {
    userInfo: userInfo,
    userInfoArray: [],
    fileInfo: null,
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

const userSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.infos.userInfo = action.payload;
    },
    setFileInfo: (state, action: PayloadAction<Blob | File>) => {
      state.infos.fileInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle abilityApi
      .addCase(userApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        const { data, process } = action.payload;
        state.response.loading = false;
        state.response.data = data;
        state.response.process = process;

        if (Array.isArray(data)) {
          const parsedData = data.map((item) => {
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
          state.infos.userInfoArray = parsedData;
        } else {
          state.infos.userInfoArray = [];
        }
      })
      .addCase(userApi.rejected, (state, action) => {
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

export const { setUserInfo, setFileInfo } = userSlice.actions;

export default userSlice.reducer;
