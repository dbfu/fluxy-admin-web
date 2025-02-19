import { t } from '@/utils/i18n';
import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';

import { role_create, role_update } from '@/api/role';
import LinkButton from '@/components/link-button';
import FModalForm from '@/components/modal-form';
import { antdUtils } from '@/utils/antd';
import { clearFormValues } from '@/utils/utils';
import { useRequest } from 'ahooks';
import RoleMenu from './role-menu';

interface PropsType {
  open: boolean;
  editData?: API.RoleVO | null;
  title: string;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}

function NewAndEditRoleForm({
  editData,
  open,
  title,
  onOpenChange,
  onSaveSuccess,
}: PropsType) {

  const [form] = Form.useForm();
  const { runAsync: updateUser, loading: updateLoading } = useRequest(role_update, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
      onSaveSuccess();
    },
  });
  const { runAsync: addUser, loading: createLoading } = useRequest(role_create, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
      onSaveSuccess();
    },
  });
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [menuIds, setMenuIds] = useState<string[]>();

  useEffect(() => {
    if (!editData) {
      clearFormValues(form);
    } else {
      form.setFieldsValue({
        ...editData,
      });
    }
  }, [editData]);

  const finishHandle = async (values: any) => {
    if (editData) {
      updateUser({ ...editData, ...values, menuIds })
    } else {
      addUser({ ...values, menuIds })
    }
  }

  return (
    <FModalForm
      labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
      wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
      form={form}
      onFinish={finishHandle}
      open={open}
      title={title}
      width={640}
      loading={updateLoading || createLoading}
      onOpenChange={onOpenChange}
      layout='horizontal'
      modalProps={{ forceRender: true }}
    >
      <Form.Item
        label={t("WIRfoXjK" /* 代码 */)}
        name="code"
        rules={[{
          required: true,
          message: t("jwGPaPNq" /* 不能为空 */),
        }]}
      >
        <Input disabled={!!editData} />
      </Form.Item>
      <Form.Item
        label={t("qvtQYcfN" /* 名称 */)}
        name="name"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("DvINURho" /* 分配菜单 */)}
        name="menus"
      >
        <LinkButton onClick={() => { setRoleMenuVisible(true) }}>{t("rDmZCvin" /* 选择菜单 */)}</LinkButton>
      </Form.Item>
      <RoleMenu
        onSave={(menuIds: string[]) => {
          setMenuIds(menuIds);
          setRoleMenuVisible(false);
        }}
        visible={roleMenuVisible}
        onCancel={() => {
          setRoleMenuVisible(false);
        }}
        roleId={editData?.id}
      />
    </FModalForm>
  )
}

export default NewAndEditRoleForm;