// import { StyleProps } from "@src/shared";
// import { setSignupData } from "@src/store";
// import { useAppDispatch, useAppSelector } from "@src/store/hook";
// import { RootState } from "@src/store/store";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useSignupHook = () =>
//     {
//         const signupData = useAppSelector((state:RootState)=> state.auth.infos.signupData); 
//         const {status, loading} = useAppSelector((state:RootState)=> state.auth.response); 
//         const dispatch = useAppDispatch();
//         const navigate = useNavigate()

//         const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
//            const {name, value} = event.target
//            dispatch(setSignupData({...signupData, [name]: value}))
//         } 
        
//         useEffect(()=>{
//               if(status === true){
//                navigate(`/admin/login`);
//               }
//         },[status, navigate]);

//         const styleButton:StyleProps = {
//            width: `75%`,
//            height: `100%`,
//            backgroundColor: `green`,
//            padding: `5px`,
//            fontSize: `150%`,
//            color: `white`
//         }
//          return{
//             data:{
//                loading,
//                styleButton
//             },
//             functions:{
//                 handleChange,
//             }
//          }
//     }

//     export default useSignupHook;