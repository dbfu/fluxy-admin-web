import { Form, Select } from 'antd';
import { ComponentSetter } from '../interface';
import SettingFormItemInput from './setting-form-item/input';

function CommonSetter({ setters }: { setters: ComponentSetter[] }) {

  /**
* 动态渲染表单元素
* @param setting 元素配置
* @returns 
*/
  function renderFormElememt(setting: any) {
    const { type, options } = setting;

    if (type === 'select') {
      return (
        <Select options={options} />
      )
    } else if (type === 'input') {
      return (
        <SettingFormItemInput />
      )
    }
  }

  return (
    <>
      {(setters || []).map(setter => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
    </>
  )
}

export default CommonSetter;