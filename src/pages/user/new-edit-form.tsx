import { t } from '@/utils/i18n';
import { Form, Input, Radio, Select } from 'antd';
import { useEffect } from 'react';

import FModalForm from '@/components/modal-form';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Role } from '../role/service';
import Avatar from './avatar';
import EmailInput from './email-input';
import userService from './service';

interface PropsType {
  open: boolean;
  editData?: any;
  title: string;
  onClose: () => void;
  onSaveSuccess: () => void;
}

function NewAndEditForm({
  open,
  editData,
  onSaveSuccess,
  onClose,
  title,
}: PropsType) {
  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(
    userService.updateUser, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(
    userService.addUser, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
      onSaveSuccess();
    },
  });

  const { data: roles, loading: getRolesLoading } = useRequest(userService.getRoles);

  const finishHandle = async (values: any) => {
    if (values?.avatar?.[0]?.response?.id) {
      values.avatar = values?.avatar?.[0]?.response?.id;
    } else {
      values.avatar = null;
    }

    if (editData) {
      updateUser({ ...editData, ...values })
    } else {
      addUser(values)
    }
  }

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        avatar: editData.avatarEntity ? [{
          uid: '-1',
          name: editData.avatarEntity.fileName,
          states: 'done',
          url: editData.avatarEntity.filePath,
          response: {
            id: editData.avatarEntity.id,
          },
        }] : [],
        roleIds: (editData.roles || []).map((role: Role) => role.id),
      })
    } else {
      clearFormValues(form);
    }
  }, [editData]);

  return (
    <FModalForm
      labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
      wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
      form={form}
      onFinish={finishHandle}
      initialValues={{ sex: 1 }}
      open={open}
      title={title}
      width={640}
      loading={updateLoading || createLoading}
      onOpenChange={open => !open && onClose && onClose()}
      layout="horizontal"
      modalProps={{ forceRender: true }}
    >
      <Form.Item label={t("YxQffpdF" /* 头像 */)} name="avatar">
        <Avatar />
      </Form.Item>
      <Form.Item
        label={t("qYznwlfj" /* 用户名 */)}
        name="userName"
        rules={[{
          required: true,
          message: t("jwGPaPNq" /* 不能为空 */),
        }]}
      >
        <Input disabled={!!editData} />
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
        name="email"
        label={t("XWVvMWig" /* 邮箱 */)}
        rules={[{
          required: true,
          message: t("QFkffbad" /* 不能为空 */),
        }, {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: t("EfwYKLsR" /* 邮箱格式不正确 */),
        }]}
      >
        <EmailInput disabled={!!editData} />
      </Form.Item>
      {!editData && (
        <Form.Item
          name="emailCaptcha"
          label={t("baHVcbPK" /* 邮箱验证码 */)}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label={t("PnmzVovn" /* 角色 */)}
        name="roleIds"
      >
        <Select
          options={(roles || []).map(role => ({
            label: role.name,
            value: role.id,
          }))}
          mode='multiple'
          loading={getRolesLoading}
        />
      </Form.Item>
      <Form.Item
        label={t("ykrQSYRh" /* 性别 */)}
        name="sex"
      >
        <Radio.Group>
          <Radio value={1}>{t("AkkyZTUy" /* 男 */)}</Radio>
          <Radio value={0}>{t("yduIcxbx" /* 女 */)}</Radio>
        </Radio.Group>
      </Form.Item>
    </FModalForm>
  )
}

export default NewAndEditForm;