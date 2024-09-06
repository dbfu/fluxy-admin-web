import { IconBuguang } from '@/assets/icons/buguang';
import IconButton from '@/components/icon-button';
import { router } from '@/router/router-utils';
import { useUserStore } from '@/stores/user';
import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown } from 'antd';

interface Props {
  darkMode: boolean;
}

function UserInfo({
  darkMode
}: Props) {

  const { currentUser } = useUserStore();

  function logout() {
    router.navigate('/user/login');
  }

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      getPopupContainer={node => node.parentElement!}
      dropdownRender={() => {
        return (
          <div
            style={{
              boxShadow: darkMode ?
                'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px'
                : 'rgba(0, 0, 0, 0.08) 0px 6px 30px',
            }}
            className='dark:bg-[rgb(33,41,70)] bg-white rounded-lg w-[200px]'
          >
            <div className='p-[16px]'>
              <p className='text-[16px] dark:text-[rgb(237,242,247)] text-[rgb(17,25,39)] '>
                {currentUser?.nickName}
              </p>
              <p className='text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[10px]'>
                {currentUser?.phoneNumber}
              </p>
              <p className='text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[0px]'>
                {currentUser?.email}
              </p>
            </div>
            <hr style={{ borderWidth: '0 0 thin' }} className='m-[0] border-solid dark:border-[rgb(45,55,72)] border-[rgb(242,244,247)]' />
            <div className='p-[16px] text-center'>
              <Button onClick={logout} type='text' size='small'>退出登录</Button>
            </div>
          </div>
        )
      }}
    >
      <div>
        <IconButton className='rounded-[27px] pl-[6px] pr-[14px] justify-between h-[48px] w-[92px] text-[20px]'>
          {currentUser?.avatarPath ? (
            <Avatar style={{ verticalAlign: 'middle' }} src={currentUser.avatarPath} />
          ) : (
            <Avatar style={{ backgroundColor: 'gold', verticalAlign: 'middle' }} icon={<IconBuguang />} />
          )}
          <SettingOutlined />
        </IconButton>
      </div>
    </Dropdown>
  );
}

export default UserInfo;
