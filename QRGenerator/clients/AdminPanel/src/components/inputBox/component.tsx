import { CustomButton } from '@src/components';
import './style.css'
import { useFormHook } from '@src/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';


const InputBox = () => {
   
  const { functions: { setReducerInfo, handleFileChange }, datas: { processInfo, userInfo } } = useFormHook();
  const navigate = useNavigate();
  const { status } = useAppSelector((state: RootState) => state.info.response)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setReducerInfo('user', name, value);
  }

  const styleAddButton = {
    width: `75%`,
    height: `50%`,
    backgroundColor: `#0D6EFD`,
    padding: `1px 20px`,
    fontSize: `100%`,
    color: `white`
  }
  const styleUpdateButton = {
    width: `75%`,
    height: `50%`,
    backgroundColor: `darkblue`,
    padding: `1px 20px`,
    fontSize: `100%`,
    color: `white`
  }
  const styleLogoutButton = {
    width: `100%`,
    height: `50%`,
    backgroundColor: `#BB2D3B`,
    padding: `0px 10px`,
    fontSize: `100%`,
    color: `white`
  }

  const formattedDate = (date: string) => {
    return date.split('T')[0];
  }
  const toAdminManagement = () => {
    return navigate('/adminOperations');
  }
  return (
    <div className="input-box">
      <div className='header'>
        <h2>Registration Form</h2>
        {status === true ?
          <div className='navButtons'>
            <button className='directionButton' onClick={toAdminManagement}>Manage Admins</button>
            <CustomButton style={styleLogoutButton} process={'logout'} content={'Logout'} type={'request'} method={'POST'} param={''} inheritor={'user'} />
          </div>
          : null}
      </div>
      <div className="form">
        <div className="form-element">
          <label>Full Name:</label>
          <input
            type="text"
            value={userInfo.info.name}
            name='name'
            onChange={handleChange}
            placeholder="Enter your full name..."
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Surname:</label>
          <input
            type="text"
            value={userInfo.info.surname}
            name='surname'
            onChange={handleChange}
            placeholder="Enter your surname..."
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={userInfo.info.phone}
            name='phone'
            onChange={handleChange}
            placeholder="Enter your phone number..."
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Role:</label>
          <input
            type="text"
            value={userInfo.info.role}
            name='role'
            onChange={handleChange}
            placeholder="Enter Role..."
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Email:</label>
          <input
            type="email"
            value={userInfo.info.email}
            name='email'
            onChange={handleChange}
            placeholder="Enter your email address..."
            className="form-control"
          />
        </div>
        <div className="form-element">
          <label>TC Number:</label>
          <input
            type="text"
            value={userInfo.info.tcNumber}
            name='tcNumber'
            onChange={handleChange}
            placeholder="Enter your TC Number..."
            className="form-control"
          />
        </div>
        <div className="form-element">
          <label>Born Date:</label>
          <input
            type="date"
            value={formattedDate(userInfo.info.bornDate)}
            name='bornDate'
            onChange={handleChange}
            placeholder="Born Date: "
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Image:</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name='img'
            onChange={handleFileChange}
            placeholder="Choose an image..."
            className="form-control"
          />
        </div>

        <div className="form-element">
          <label>Target URL:</label>
          <input
            type="url"
            value={processInfo === 'updateOne' ? userInfo.info.targetUrl : window.location.origin}
            name='targetUrl'
            onChange={handleChange}
            placeholder="Enter the target URL..."
            className="form-control"       
          ></input>
        </div>

        {/* Button */}

        <div className='buttons'>
          <CustomButton inheritor='user' type='request' style={processInfo === 'updateOne' ? styleUpdateButton : styleAddButton} process={processInfo === 'updateOne' ? 'updateOne' : 'addOne'} content={processInfo === 'updateOne' ? 'UpdateOne' : 'Add User'} method={processInfo === 'updateOne' ? 'PUT' : 'POST'} param={''} />
        </div>

      </div>
    </div>
  );
};

export default InputBox;
