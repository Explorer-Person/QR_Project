import { UserInfo } from '@src/interfaces';
import React from 'react';
import './style.css';
import CustomButton from '../customButton/component';
import FileDisplay from '../fileDisplay';

interface UserBoxProps {
    userInfo: UserInfo;
}

const UserBox = ({ userInfo }: UserBoxProps) => {
    const [showDetails, setShowDetails] = React.useState(false);

    const styleQRButton = {
        width: `100%`,
        height: `75%`,
        backgroundColor: `#007C00`,
        padding: `0px 10px`,
        fontSize: `100%`,
        color: `white`
    }
    const styleDeleteButton = {
        width: `100%`,
        height: `75%`,
        backgroundColor: `red`,
        padding: `0px 10px`,
        fontSize: `100%`,
        color: `white`
    }
    return (
        <div className='user-container'>
            <div className="user-box">
                <h3>{userInfo.info.name} {userInfo.info.surname}</h3>
                <div className="img-container">
                    
                    <FileDisplay mediaInfo={userInfo} />

                    <CustomButton method='GET' process='download' type='request' style={styleQRButton} content={'See QR'} param={userInfo.info.qrPath}  />
                    <CustomButton method='DELETE' process='deleteOne' type='request' style={styleDeleteButton} content={'Delete User'} param={userInfo.id}  />
                </div>
                <div className="info-container">
                    <div>
                        <p className='label'>ID:</p>
                        <p className='info'>{userInfo.id}</p>
                    </div>
                    <div>
                        <p className='label'>Phone:</p>
                        <p className='info'>{userInfo.info.phone}</p>
                    </div>
                    <div>
                        <p className='label'>E-mail:</p>
                        <p className='info'>{userInfo.info.email}</p>
                    </div>
                    <div>
                        <p className='label'>Role:</p>
                        <p className='info'>{userInfo.info.role}</p>
                    </div>
                </div>
            </div>
            <div className='detail-container'>
                <button className="see-details-btn" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'Hide Details' : 'See More Details'}
                </button>
                {showDetails && (
                    <div className="detail-box">
                        <div>
                            <p className='label'>Born Date:</p>
                            <p className='info'>{userInfo.info.bornDate}</p>
                        </div>
                        <div>
                            <p className='label'>TC Number:</p>
                            <p className='info'>{userInfo.info.tcNumber}</p>
                        </div>
                        <div>
                            <p className='label'>Target URL:</p>
                            <p className='info'>{userInfo.info.targetUrl}</p>
                        </div>
                        <div>
                            <p className='label'>Short URL:</p>
                            <p className='info'>{userInfo.info.shortUrl}</p>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBox;
