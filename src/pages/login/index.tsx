import { IconBuguang } from '@/assets/icons/buguang';
import { t } from '@/utils/i18n';

import { defaultSetting } from '@/default-setting';
import { useState } from 'react';
import ForgetPasswordModal from './components/forget-password-modal';
import LoginForm from './components/login-form';
import RightContent from './components/right-content';

import './index.css';

function Login() {
  const [emailResetPasswordOpen, setEmailResetPasswordOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className='flex justify-center flex-[2.5]'>
        <div className='dark:bg-[rgb(33,41,70)] w-[400px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-lg'>
          <div className='text-center'>
            <div className='flex justify-center gap-2'>
              <IconBuguang className='text-[20px] text-primary' />
              <span className='dark:text-white text-[28px] font-bold mb-1'>{defaultSetting.title}</span>
            </div>
            <h3
              className='dark:text-white text-[rgba(0,0,0,.45)] mb-[1em] text-[16px] font-normal'
            >
              {t("wbTMzvDM" /* 一个高颜值后台管理系统 */)}
            </h3>
          </div>
          <LoginForm onForgetPasswordClick={() => { setEmailResetPasswordOpen(true) }} />
        </div>
      </div>
      <RightContent />
      <ForgetPasswordModal
        open={emailResetPasswordOpen}
        setOpen={setEmailResetPasswordOpen}
      />
    </div>
  );
}

export default Login;
