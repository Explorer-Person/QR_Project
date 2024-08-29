import './style.css';
import { AdminInfo } from '@src/interfaces';
import { CustomButton } from '@src/components';
import profileImage from '../../assets/images.png';

interface AdminBoxProps {
  adminInfo: AdminInfo;
}
const AdminBox = ({ adminInfo }: AdminBoxProps) => {

  const styleUpdateButton = {
    width: `100%`,
    height: `75%`,
    backgroundColor: `#10a094`,
    padding: `0px 10px`,
    fontSize: `100%`,
    color: `white`
  }
  const styleDeleteButton = {
    width: `100%`,
    height: `75%`,
    backgroundColor: `#b70b30`,
    padding: `0px 10px`,
    fontSize: `100%`,
    color: `white`
  }
  return (
    <div className="admin-box">
      <img src={profileImage} alt={adminInfo.info.username} />
      <div className="admin-info">
        <p>Username: {adminInfo.info.username}</p>
        <div>
          <p>Email: {adminInfo.info.email}</p>
          <p>Role: {adminInfo.info.role}</p>
        </div>
      </div>
      <div className="admin-actions">
        <CustomButton style={styleUpdateButton} process={'updateOne'} content={'Update'} type={'action'} method={'PUT'} param={adminInfo.id} inheritor={'admin'} />
        <CustomButton style={styleDeleteButton} process={'deleteOne'} content={'Delete'} type={'request'} method={'DELETE'} param={adminInfo.id} inheritor={'admin'} />
      </div>
    </div>
  );
};

export default AdminBox;
