import {CustomButton} from '@src/components';
import './style.css'
import { useFormHook } from '@src/hooks';


const InputBox = () => {

  const { functions: { handleChange, handleFileChange } } = useFormHook();

  const styleAddButton = {
    width: `75%`,
    height: `50%`,
    backgroundColor: `#0D6EFD`,
    padding: `1px 20px`,
    fontSize: `100%`,
    color: `white`
  }
  const styleGenerateButton = {
    width: `100%`,
    height: `50%`,
    backgroundColor: `#BB2D3B`,
    padding: `0px 10px`,
    fontSize: `100%`,
    color: `white`
  }
  return (
    <div className="input-box">
      <h2>Registration Form</h2>
      <div className="form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            // value={name}
            name='name'
            onChange={handleChange}
            placeholder="Enter your full name..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Surname:</label>
          <input
            type="text"
            // value={surname}
            name='surname'
            onChange={handleChange}
            placeholder="Enter your surname..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            // value={phone}
            name='phone'
            onChange={handleChange}
            placeholder="Enter your phone number..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            // value={phone}
            name='role'
            onChange={handleChange}
            placeholder="Enter Role..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            // value={email}
            name='email'
            onChange={handleChange}
            placeholder="Enter your email address..."
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>TC Number:</label>
          <input
            type="text"
            // value={email}
            name='tcNumber'
            onChange={handleChange}
            placeholder="Enter your TC Number..."
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Born Date:</label>
          <input
            type="date"
            // value={email}
            name='bornDate'
            onChange={handleChange}
            placeholder="Born Date: "
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            // value={img}
            name='img'
            onChange={handleFileChange}
            placeholder="Choose an image..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Target URL:</label>
          <input
            type="url"
            // value={targetUrl}
            name='targetUrl'
            onChange={handleChange}
            placeholder="Enter the target URL..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Short URL:</label>
          <input
            type="text"
            // value={shortUrl}
            onChange={handleChange}
            name='shortUrl'
            placeholder="Enter the short URL..."
            className="form-control"
          />
        </div>

        {/* Button */}

        <CustomButton type='submit' style={styleAddButton} process={'addOne'} content={'Add User'} method={'POST'} param={''}/>
        <CustomButton type='action' style={styleGenerateButton} process={'generateUrl'} content={'Generate Short Url'} method={'null'} param={''}/>
          
      </div>
    </div>
  );
};

export default InputBox;