import { AdminInfo, ButtonInfo, UserInfo } from "@src/interfaces";
import { requestApi } from "@src/store";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import {
  setAdminInfo,
  setFileInfo,
  setLoginInfo,
  setProcessInfo,
  setUserInfo,
} from "@src/store/slices/info/slice";
import { RootState } from "@src/store/store";
import React from "react";

const useFormHook = () => {
  const dispatch = useAppDispatch();
  const { processInfo, userInfo, fileInfo, userInfoArray, adminInfo, adminInfoArray, loginInfo } = useAppSelector((state: RootState) => state.info.infos);
    
  const setReducerInfo = (
   inheritor:string, name:string, value:string
  ) => {

    if(inheritor === 'user'){
      dispatch(
        setUserInfo({
          ...userInfo,
          info: {
            ...userInfo.info,
            [name]: value,
          },
        })
      );  
    }
    if(inheritor === 'admin'){
      dispatch(
        setAdminInfo({
          ...adminInfo,
          info: {
            ...adminInfo.info,
            [name]: value,
          },
        })
      );  
    }
    if(inheritor === 'login'){
      dispatch(
        setLoginInfo({
          ...loginInfo,
            [name]: value,
        })
      );  
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      dispatch(setFileInfo(files[0]));
    }
  };
  const handleSubmit = (commonData: ButtonInfo) => {
    const { process, param, method, buttonType, inheritor } = commonData;
    dispatch(setProcessInfo(process));
    if(buttonType === 'action' && process === 'updateOne'){
      if(inheritor === 'user'){
        const userInfo = userInfoArray.find(
          (userInfo) => userInfo.id === param
        );
        dispatch(setUserInfo(userInfo as UserInfo));
      }
      if(inheritor === 'admin'){
        const adminInfo = adminInfoArray.find(
          (adminInfo) => adminInfo.id === param
        );
        const editedAdminInfo = {...adminInfo,
          info:{
            ...adminInfo?.info,
            password: '',
          }
        }
        dispatch(setAdminInfo(editedAdminInfo as AdminInfo));
      }
    }
    if(buttonType === 'request'){
      dispatch(
        requestApi({
          endpoint: inheritor === 'auth' ? `/api/public/login` : `/api/authorized/${inheritor}/${process}${param !== '' ? `/${encodeURIComponent(param)}` : ''}`,
          method: method,
          data: inheritor === 'auth' ? loginInfo : inheritor === 'user' ? userInfo : adminInfo,
          process: process,
          imageFile: fileInfo,
        })
      );
    }
    
  };

  return {
    functions: {
      setReducerInfo,
      handleSubmit,
      handleFileChange,
    },
    datas: {
        userInfo, 
        userInfoArray,
        fileInfo,
        processInfo
    }
  };
};

export default useFormHook;
