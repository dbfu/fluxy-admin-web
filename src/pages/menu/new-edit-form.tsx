import { api_apiList } from '@/api/api';
import { menu_create, menu_getAllocAPIByMenu, menu_update } from '@/api/menu';
import { antdIcons } from '@/assets/antd-icons';
import FModalForm from '@/components/modal-form';
import { componentPaths } from '@/config/pages';
import { antdUtils } from '@/utils/antd';
import { t } from '@/utils/i18n';
import { clearFormValues } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import to from 'await-to-js';
import { omit } from 'lodash-es';
import React, { useEffect, useMemo } from 'react';
import { MenuType } from './interface';

interface CreateMenuProps {
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  curRecord?: API.MenuVO | null;
  editData?: API.MenuVO | null;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess: () => void;
}


function NewAndEditMenuForm({
  visible,
  curRecord,
  editData,
  onOpenChange,
  onSaveSuccess,
}: CreateMenuProps) {

  const [form] = Form.useForm();

  const { data: apiData, run: getApiList } = useRequest(api_apiList, { manual: true });
  const { runAsync: getAllocApis } = useRequest(menu_getAllocAPIByMenu, { manual: true });
  const { run: addMenu, loading: createLoading } = useRequest(menu_create, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("kKvCUxII" /* 新增成功 */));
      onSaveSuccess()
    },
  });

  const { run: updateMenu, loading: updateLoading } = useRequest(menu_update, {
    manual: true,
    onSuccess: () => {
      antdUtils.message?.success(t("XLSnfaCz" /* 更新成功 */));
      onSaveSuccess()
    },
  });

  useEffect(() => {
    if (visible) {
      getApiList();
      setDefaultFormValues();
    }
  }, [visible]);

  useEffect(() => {
    if (!editData) {
      clearFormValues(form);
    } else {
      form.setFieldsValue({
        ...editData,
      });
    }
  }, [editData])

  async function setDefaultFormValues() {
    if (editData?.id) {
      form.setFieldsValue(editData);
      const [error, allocApis] = await to(getAllocApis({ menuId: editData.id }));
      if (!error) {
        form.setFieldValue('apis', allocApis.map((api) => [api.method, api.path].join('~')))
      }
    } else if (curRecord) {
      form.setFieldsValue({
        show: true,
        type: curRecord?.type === MenuType.MENU ? MenuType.MENU : MenuType.DIRECTORY,
      })
    } else {
      form.setFieldsValue({
        show: true,
        type: MenuType.DIRECTORY,
      })
    }
  }

  function titleRender(record: { type?: string, title?: string, method?: string }) {
    if (record.type === 'controller') {
      return <div>{record.title}</div>;
    }

    const colorMap: Record<string, string> = {
      get: '#00FA9A',
      post: '#FF8C00',
      put: '#00BFFF',
      delete: '#DC143C',
    };

    return (
      <div>
        <span>{record.title}</span>
        <span
          style={{ color: colorMap[record.method || ''] }}
          className="ml-8px inline-block w-60px"
        >
          {String(record.method).toUpperCase()}
        </span>
      </div>
    );
  }

  const formatApi = useMemo(() => {
    return (apiData?.data || []).map((item: any) => ({
      value: item.path,
      label: titleRender(item),
      type: item.type,
      children: item.children?.map((o: any) => ({
        value: `${o.method}~${item.prefix}${o.path}`,
        label: titleRender(o),
        type: o.type,
        method: o.method,
        path: item.prefix + o.path,
      })),
    }));
  }, [apiData]);

  const save = async (values: any) => {
    const formData: any = omit({ ...values }, 'apis') as any;

    formData.parentId = curRecord?.id || null;

    if (values.type === MenuType.DIRECTORY) {
      formData.show = true;
    } else if (values.type === MenuType.BUTTON) {
      formData.show = false;
    }

    formData.apis = (values.apis || []).map((api: string) => {
      const [method, path] = api.split('~');
      return {
        method,
        path,
      }
    });

    if (editData) {
      formData.parentId = editData.parentId;
      updateMenu({
        ...editData,
        ...formData
      });
    } else {
      addMenu(formData);
    }
  }

  const renderDirectoryForm = () => {
    return (
      <>
        <Form.Item
          label={t("qvtQYcfN" /* 名称 */)}
          name="name"
          rules={[{
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("ESYcSMBi" /* 图标 */)} name="icon">
          <Select>
            {Object.keys(antdIcons).map((key) => (
              <Select.Option key={key}>{React.createElement(antdIcons[key])}</Select.Option>
            ))}
          </Select >
        </Form.Item>
        <Form.Item
          tooltip={t("fQwvzwUN" /* 以/开头，不用手动拼接上级路由。参数格式/:id */)}
          label={t("XBkSjYmn" /* 路由 */)}
          name="route"
          rules={[{
            pattern: /^\//,
            message: t("GlfSFNdD" /* 必须以/开头 */),
          }, {
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("XRfphTtu" /* 排序号 */)} name="orderNumber">
          <InputNumber />
        </Form.Item>
      </>
    )
  }

  const renderMenuForm = () => {
    return (
      <>
        <Form.Item
          rules={[{
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
          label={t("qvtQYcfN" /* 名称 */)}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("ESYcSMBi" /* 图标 */)} name="icon">
          <Select>
            {Object.keys(antdIcons).map((key) => (
              <Select.Option key={key}>{React.createElement(antdIcons[key])}</Select.Option>
            ))}
          </Select >
        </Form.Item>
        <Form.Item
          tooltip={t("SOYRkwDk" /* 以/开头，不用手动拼接上级路由。参数格式/:id */)}
          label={t("XBkSjYmn" /* 路由 */)}
          name="route"
          rules={[{
            pattern: /^\//,
            message: t("ZsOhTupE" /* 必须以/开头 */),
          }, {
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
          label={t("aqmTtwBN" /* 文件地址 */)}
          name="filePath"
        >
          <Select
            options={componentPaths.map(path => ({
              label: path,
              value: path,
            }))}
          />
        </Form.Item>
        <Form.Item valuePropName="checked" label={t("kDeoPsVD" /* 是否显示 */)} name="show">
          <Switch />
        </Form.Item>
        <Form.Item label={t("XRfphTtu" /* 排序号 */)} name="orderNumber">
          <InputNumber />
        </Form.Item>
      </>
    )
  }


  const renderButtonForm = () => {
    return (
      <>
        <Form.Item
          rules={[{
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
          label={t("qvtQYcfN" /* 名称 */)}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: t("QFkffbad" /* 不能为空 */),
          }]}
          label={t("etRQPYBn" /* 权限代码 */)}
          name="authCode"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("LxiWbxsx" /* 绑定接口 */)}
          name="apis"
        >
          <TreeSelect maxTagCount={3} treeCheckable treeData={formatApi} />
        </Form.Item>
      </>
    )
  }


  const renderFormMap = {
    [MenuType.DIRECTORY.toString()]: renderDirectoryForm,
    [MenuType.MENU.toString()]: renderMenuForm,
    [MenuType.BUTTON.toString()]: renderButtonForm,
  }

  return (
    <FModalForm
      open={visible}
      title={t("VjwnJLPY" /* 新建 */)}
      width={640}
      form={form}
      onFinish={save}
      labelCol={{ flex: '0 0 100px' }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onOpenChange={onOpenChange}
      loading={createLoading || updateLoading}
      modalProps={{ forceRender: true }}
    >
      <Form.Item label={t("ToFVNEkU" /* 类型 */)} name="type">
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
        >
          {curRecord?.type !== MenuType.MENU && (
            <Radio value={MenuType.DIRECTORY}>{t("wuePkjHJ" /* 目录 */)}</Radio>
          )}
          <Radio value={MenuType.MENU}>{t("mYuKCgjM" /* 菜单 */)}</Radio>
          <Radio value={MenuType.BUTTON}>{t("ZJvOOWLP" /* 按钮 */)}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {() => renderFormMap[form.getFieldValue('type') as string]?.()}
      </Form.Item>
    </FModalForm>
  )
}

export default NewAndEditMenuForm;