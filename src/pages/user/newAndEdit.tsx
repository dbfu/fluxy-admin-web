import { t } from '@/utils/i18n';
import { Form, Input, Radio, App, FormInstance } from 'antd'
import { forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'
import { useRequest } from 'ahooks';

import userService, { User } from './service';

interface PropsType {
  open: boolean;
  editData?: any;
  onSave: () => void;
  setSaveLoading: (loading: boolean) => void;
}

const NewAndEditForm: ForwardRefRenderFunction<FormInstance, PropsType> = ({
  editData,
  onSave,
  setSaveLoading,
}, ref) => {

  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { runAsync: updateUser } = useRequest(userService.updateUser, { manual: true });
  const { runAsync: addUser } = useRequest(userService.addUser, { manual: true });

  useImperativeHandle(ref, () => form, [form])

  const finishHandle = async (values: User) => {
    try {
      setSaveLoading(true);
      if (editData) {
        await updateUser({ ...editData, ...values });
        message.success(t("NfOSPWDa" /* 更新成功！ */));
      } else {
        await addUser(values);
        message.success(t("JANFdKFM" /* 创建成功！ */));
      }
      onSave();
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
    setSaveLoading(false);
  }

  return (
    <Form
      labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
      wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
      form={form}
      onFinish={finishHandle}
      initialValues={editData}
    >
      <Form.Item
        label={t("qYznwlfj" /* 用户名 */)}
        name="userName"
        rules={[{
          required: true,
          message: t("jwGPaPNq" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("rnyigssw" /* 昵称 */)}
        name="nickName"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("SPsRnpyN" /* 手机号 */)}
        name="phoneNumber"
        rules={[{
          required: true,
          message: t("UdKeETRS" /* 不能为空 */),
        }, {
          pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[89])\d{8}$/,
          message: t("AnDwfuuT" /* 手机号格式不正确 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("XWVvMWig" /* 邮箱 */)}
        name="email"
        rules={[{
          required: true,
          message: t("QFkffbad" /* 不能为空 */),
        }, {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: t("EfwYKLsR" /* 邮箱格式不正确 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("ykrQSYRh" /* 性别 */)}
        name="sex"
        initialValue={1}
      >
        <Radio.Group>
          <Radio value={1}>{t("AkkyZTUy" /* 男 */)}</Radio>
          <Radio value={0}>{t("yduIcxbx" /* 女 */)}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  )
}

export default forwardRef(NewAndEditForm);