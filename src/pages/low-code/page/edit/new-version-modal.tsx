import { useVariablesStore } from '@/components/low-code/editor/stores/variable';
import { useRequest } from '@/hooks/use-request';
import { antdUtils } from '@/utils/antd';
import { Alert, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComponentsStore } from '../../../../components/low-code/editor/stores/components';
import service from './service';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  versionInfo: any;
}

const NewVersionModal: React.FC<Props> = ({
  open,
  setOpen,
  versionInfo,
}) => {

  const { components } = useComponentsStore();
  const { variables } = useVariablesStore();

  const [latestVersion, setLatestVersion] = useState();

  const navigate = useNavigate();

  const {
    runAsync,
    loading: saveLoading,
  } = useRequest(service.createNewVersion, { manual: true });

  const [form] = Form.useForm();

  const save = async (values: any) => {

    values.menuId = versionInfo?.menu?.id;
    // 把组件和变量转成字符串，传给后端
    values.pageSetting = JSON.stringify({ components, variables });

    const [error, data] = await runAsync(values);
    if (!error) {
      antdUtils.message?.success('保存成功');
      setOpen(false);
      navigate(`/low-code/page/edit-page/${data?.id}`)
    }
  };

  const getLatestVersionByMenuId = async () => {
    if (!versionInfo?.menu?.id) return;
    const [error, data] = await service.getLatestVersionByMenuId(versionInfo?.menu?.id);
    if (error) return;
    setLatestVersion(data.version)
  }

  const getNewTag = (type: number, oldVersion?: string) =>  {

    if (!type || !oldVersion) return 'v1.0.0';
    let version;

    const [large, middle, small] = oldVersion.replace('v', '').split('.').map(o => +o);

    if (type === 1) {
      version = [large + 1, middle, small].join('.');
    } else if (type === 2) {
      version = [large, middle + 1, small].join('.');
    } else if (type === 3) {
      version = [large, middle, small + 1].join('.');
    }

    return `v${version}`;
  }

  useEffect(() => {
    if(!open) return;
    getLatestVersionByMenuId();
  }, [open]);


  const versionType = Form.useWatch('versionType', form);


  useEffect(() => {
    form.setFieldsValue({
      version: getNewTag(versionType, latestVersion),
    })
  }, [versionType, latestVersion])

  return (
    <Modal
      title="保存新版本"
      open={open}
      onCancel={() => { setOpen(false); }}
      width={640}
      onOk={() => { form.submit(); }}
      confirmLoading={saveLoading}
    >
      <Alert
        message={(
          <div>
            <div>主版本：含有破坏性更新和新特性的版本。</div>
            <div>次版本：带有新特性的向下兼容的版本。</div>
            <div>修订版本：日常 bugfix 更新。</div>
          </div>
        )}
        type='info'
      />
      <Form
        form={form}
        onFinish={save}
        labelCol={{ flex: '0 0 140px' }}
        wrapperCol={{ span: 16 }}
        initialValues={{ versionType: 3 }}
        className='mt-[20px]'
      >
        <Form.Item
          label="版本类型"
          name="versionType"
          rules={[{
            required: true,
            message: '不能为空',
          }]}
        >
          <Radio.Group>
            <Radio value={1}>主版本</Radio>
            <Radio value={2}>次版本</Radio>
            <Radio value={3}>修订版本</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="版本号"
          name="version"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="版本描述"
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default NewVersionModal;