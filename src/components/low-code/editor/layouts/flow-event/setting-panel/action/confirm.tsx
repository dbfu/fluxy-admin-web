import { Form, Input } from 'antd';

const FormItem = Form.Item;

const ConfirmSetting = () => {
  return (
    <>
      <FormItem label="内容" name={['config', 'text']}>
        <Input />
      </FormItem>
    </>
  )
}

export default ConfirmSetting;