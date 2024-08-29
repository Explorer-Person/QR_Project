import './style.css';
import React from 'react';
import { CustomButton } from '@src/components';
import { useFormHook } from '@src/hooks';
import { useAppSelector } from '@src/store/hook';
import { NotFoundPage } from '@src/error';
import { RootState } from '@src/store/store';

const LoginPage: React.FC = () => {
  const { functions: { setReducerInfo } } = useFormHook();
  const { loading, status } = useAppSelector((state: RootState) => state.info.response)
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target as HTMLInputElement;
    setReducerInfo('login', name, value);
  }
  const styleLoginButton = {
    width: `75%`,
    height: `50%`,
    backgroundColor: `#0D6EFD`,
    padding: `1px 20px`,
    fontSize: `100%`,
    color: `white`
  }

  

  
  if(status === true && !loading){
    return <NotFoundPage/>
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name='username' onChange={handleChange} placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name='password' onChange={handleChange} placeholder="Enter your password" />
        </div>
      <CustomButton inheritor='auth' style={styleLoginButton} process='login' type='request' param={''} content={'Login'} method={'POST'}/>
      </div>
    </div>
  );
};

export default LoginPage;

