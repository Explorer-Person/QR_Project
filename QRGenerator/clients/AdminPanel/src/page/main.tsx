import { InputBox, UserBox } from '@src/components'
import { userApi } from '@src/store/apis/info';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { useEffect } from 'react';

const MainPage = () => {

  const dispatch = useAppDispatch();
  const { userInfoArray, userInfo } = useAppSelector((state: RootState) => state.user.infos)
  useEffect(() => {
    dispatch(userApi({
      endpoint: `/api/admin/user/getAll`,
      method: 'GET',
      process: 'getAll',
      data: userInfo,
      imageFile: null,
    }));
  }, [])
  return (
    <div>
      <div>
        <InputBox />

        <div>
          {/* <CustomButton/> */}
        </div>
      </div>

      <div>
        {
          userInfoArray.map(userInfo => (
            <UserBox key={userInfo.id} userInfo={userInfo} />
          ))
        }
      </div>
    </div>
  )
}

export default MainPage
