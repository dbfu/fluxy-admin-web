import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { useVariablesStore } from '../../stores/variable';

interface Props {
  open: boolean,
  onCancel: () => void
}

interface Variable {
  // 变量名
  name: string,
  // 变量类型
  type: string,
  // 默认值
  defaultValue: string;
  // 备注
  remark: string;
}

const DefineVariable: React.FC<Props> = ({ open, onCancel }) => {

  const [form] = Form.useForm();
  const { setVariables, variables } = useVariablesStore();


  function onFinish(values: { variables: Variable[] }) {
    setVariables(values.variables);
    onCancel && onCancel();
  }

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ variables });
    }
  }, [open])

  return (
    <Modal
      open={open}
      title="定义变量"
      onCancel={onCancel}
      destroyOnClose
      onOk={() => { form.submit() }}
      width={700}
    >
      <Form<{ variables: Variable[] }>
        onFinish={onFinish}
        autoComplete="off"
        className='py-[20px]'
        form={form}
        initialValues={{ variables }}
      >
        <Form.List name="variables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: '变量名不能为空' }]}
                  >
                    <Input placeholder="变量名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'type']}
                  >
                    <Select disabled style={{ width: 140 }} options={[{ label: '字符串', value: 'string' }]} placeholder="类型" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'defaultValue']}
                  >
                    <Input placeholder="默认值" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'remark']}
                  >
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add({ type: 'string' })} block icon={<PlusOutlined />}>
                  添加变量
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
};

export default DefineVariable;