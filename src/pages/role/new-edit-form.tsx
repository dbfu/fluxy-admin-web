import { t } from '@/utils/i18n';
import { Form, Input, FormInstance } from 'antd'
import { forwardRef, useImperativeHandle, ForwardRefRenderFunction, useState } from 'react'

import roleService, { Role } from './service';
import { antdUtils } from '@/utils/antd';
import { useRequest } from '@/hooks/use-request';
import RoleMenu from './role-menu';

interface PropsType {
  open: boolean;
  editData?: Role | null;
  onSave: () => void;
  setSaveLoading: (loading: boolean) => void;
}

const NewAndEditForm: ForwardRefRenderFunction<FormInstance, PropsType> = ({
  editData,
  onSave,
  setSaveLoading,
}, ref) => {

  const [form] = Form.useForm();
  const { runAsync: updateUser } = useRequest(roleService.updateRole, { manual: true });
  const { runAsync: addUser } = useRequest(roleService.addRole, { manual: true });
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [menuIds, setMenuIds] = useState<string[]>();

  useImperativeHandle(ref, () => form, [form]);

  const finishHandle = async (values: Role) => {
    setSaveLoading(true);

    if (editData) {
      const [error] = await updateUser({ ...editData, ...values, menuIds });
      setSaveLoading(false);
      if (error) {
        return;
      }
      antdUtils.message?.success(t("NfOSPWDa" /* 更新成功！ */));
    } else {
      const [error] = await addUser({ ...values, menuIds });
      setSaveLoading(false);
      if (error) {
        return;
      }
      antdUtils.message?.success(t("JANFdKFM" /* 创建成功！ */));
    }

    onSave();
  }

  return (
    <Form
      labelCol={{ sm: { span: 24 }, md: { span: 5 } }}
      wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
      form={form}
      onFinish={finishHandle}
      initialValues={editData || {}}
      name='addAndEdit'
    >
      <Form.Item
        label="代码"
        name="code"
        rules={[{
          required: true,
          message: t("jwGPaPNq" /* 不能为空 */),
        }]}
      >
        <Input disabled={!!editData} />
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[{
          required: true,
          message: t("iricpuxB" /* 不能为空 */),
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="分配菜单"
        name="menus"
      >
        <a onClick={() => { setRoleMenuVisible(true) }}>选择菜单</a>
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
    </Form>
  )
}

export default forwardRef(NewAndEditForm);