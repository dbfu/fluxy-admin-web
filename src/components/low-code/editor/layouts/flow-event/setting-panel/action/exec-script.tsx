import { Form, Input } from 'antd';

const ExecScriptSetting = () => {

  return (
    <>
      <Form.Item label="脚本" name={['config', 'script']}>
        <Input.TextArea
          rows={8}
          defaultValue={`(function (ctx) {
  // TODO
                    
})(ctx)`}
        />
      </Form.Item>
    </>
  )
}

export default ExecScriptSetting;