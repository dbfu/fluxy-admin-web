import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Tabs } from 'antd';

const RequestSetting = ({ values }: any) => {
  return (
    <>
      <Form.Item label="url" name={['config', 'url']}>
        <Input />
      </Form.Item>
      <Form.Item label="请求方式" name={['config', 'method']}>
        <Select
          options={
            [
              {
                label: 'GET',
                value: 'GET'
              },
              {
                label: 'POST',
                value: 'POST'
              },
              {
                label: 'PUT',
                value: 'PUT'
              },
              {
                label: 'DELETE',
                value: 'DELETE'
              },
            ]
          }
        />
      </Form.Item>
      <Tabs
        items={[{
          label: 'params',
          key: 'params',
          children: (
            <Form.List name={['config', 'params']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[{ required: true, message: '不能为空' }]}
                      >
                        <Input className='w-[180px]' placeholder="key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: '不能为空' }]}
                      >
                        <Input className='w-[180px]' placeholder="value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button style={{ width: 400 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加字段
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )
        }, {
          label: 'body',
          key: 'body',
          children: (
            <>
              <Form.Item name={['config', 'body', 'type']} label='类型'>
                <Select
                  options={[{
                    label: 'json',
                    value: 'json',
                  }, {
                    label: '脚本',
                    value: 'script',
                  }]}
                />
              </Form.Item>
              {values?.config?.body?.type === 'script' && (
                <Form.Item name={['config', 'body', 'script']} label="脚本" >
                  <Input.TextArea
                    rows={8}
                    defaultValue={`(function (ctx) {
         // TODO
          
       })(ctx)`}
                  />
                </Form.Item>
              )}
              {values?.config?.body?.type === 'json' && (
                <Form.Item name={['config', 'body', 'json']} label="json" >
                  <Input.TextArea
                    rows={8}
                    defaultValue={`{

}`}
                  />
                </Form.Item>
              )}
            </>
          )
        }]}>
      </Tabs>
    </>
  )
}

export default RequestSetting;