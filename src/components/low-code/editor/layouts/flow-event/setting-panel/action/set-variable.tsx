import { Form, Input, Select } from 'antd';
import { useVariablesStore } from '../../../../stores/variable';

const SetVariableSetting = ({ values }: { values: any }) => {

  const { variables } = useVariablesStore();

  return (
    <>
      <Form.Item label="变量" name={['config', 'variable']}>
        <Select
          options={variables.map(variable => ({ label: variable.remark, value: variable.name }))}
        />
      </Form.Item>
      {values?.config?.variable && (
        <Form.Item label="值" name={['config', 'value']}>
          <Input />
        </Form.Item>
      )}
    </>
  )
}

export default SetVariableSetting;