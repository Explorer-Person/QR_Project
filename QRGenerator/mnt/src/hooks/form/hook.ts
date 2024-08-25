


import { ButtonInfo } from "@src/interfaces";
import { userApi } from "@src/store/apis/info";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { setFileInfo, setUserInfo } from "@src/store/slices/user/slice";
import { RootState } from "@src/store/store";
import React from "react";


const useFormHook = () => {
    const dispatch = useAppDispatch();
    const {userInfo, fileInfo} = useAppSelector((state:RootState)=>state.user.infos)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        
            dispatch(setUserInfo({
                ...userInfo,
                info: {
                    ...userInfo.info,
                    [name]: value,

                }
            }));
     }

     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {files} = event.target as HTMLInputElement;
        if(files){
            dispatch(setFileInfo(files[0]))
        }
     }  
    const handleSubmit = (commonData: ButtonInfo) => {
        const { process, param, method } = commonData;
        
        if (process === 'addOne') {
            dispatch(userApi({
                endpoint: `/api/admin/user/addOne`,
                method: method,
                data: userInfo,
                process: process,
                imageFile: fileInfo
            }));
        }
        if (process === 'download') {
            dispatch(userApi({
                endpoint: `/api/admin/qr/download/${encodeURI(param)}`,
                method: method,
                data: userInfo,
                process: process,
                imageFile: null
            }));
        }
        if (process === 'deleteOne') {
            dispatch(userApi({
                endpoint: `/api/admin/user/deleteOne/${param}`,
                method: method,
                data: userInfo,
                process: process,
                imageFile: null
            }));
        }

    }


    return {
        functions: {
            handleChange,
            handleSubmit,
            handleFileChange
        }
    }
}

export default useFormHook;