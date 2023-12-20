import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;

const ShowMessageSetting = () => {
  return (
    <>
      <FormItem label="类型" name={['config', 'type']}>
        <Select
          options={[
            { label: '成功', value: 'success' },
            { label: '失败', value: 'error' },
          ]}
        />
      </FormItem>
      <FormItem label="文本" name={['config', 'text']}>
        <Input />
      </FormItem>
    </>
  )
}

export default ShowMessageSetting;