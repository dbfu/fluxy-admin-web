import { user_sendEmailCaptcha } from '@/api/user';
import { t } from '@/utils/i18n';
import { useRequest } from 'ahooks';
import { Button, Form, Input } from 'antd';
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

interface PropsType {
  value?: string;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
}

function EmailInput({
  value,
  onChange,
  disabled,
}: PropsType) {

  const [timer, setTimer] = useState<number>(0);
  const form = Form.useFormInstance();
  const intervalTimerRef = useRef<number>();

  const { runAsync } = useRequest(user_sendEmailCaptcha, { manual: true });

  const sendEmailCaptcha = async () => {
    const values = await form.validateFields(['email']);
    setTimer(180);

    await runAsync(values.email);

    intervalTimerRef.current = window.setInterval(() => {
      setTimer(prev => {
        if (prev - 1 === 0) {
          window.clearInterval(intervalTimerRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  }


  useEffect(() => {
    return () => {
      if (intervalTimerRef.current) {
        window.clearInterval(intervalTimerRef.current);
      }
    }
  }, []);


  return (
    <div className='flex items-center gap-[12px]'>
      <Input disabled={disabled} onChange={onChange} value={value} className='flex-1' />
      {!disabled && (
        <Button
          disabled={timer > 0}
          onClick={sendEmailCaptcha}>
          {timer > 0 ? `${t("uMzBAbdE" /* 重新发送( */)}${timer}${t("isruHRIs" /* 秒) */)}` : t("JekywPnc" /* 发送邮箱验证码 */)}
        </Button>
      )}
    </div>
  )
}

export default EmailInput;