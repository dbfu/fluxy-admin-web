import { SettingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useState } from 'react';
import SelectVariableModal from '../select-variable-modal';

interface Value {
  type: 'static' | 'variable';
  value: any;
}

interface Props {
  value?: Value,
  onChange?: (value: Value) => void;
}

const SettingFormItemCheckbox: React.FC<Props> = ({ value, onChange }) => {

  const [visible, setVisible] = useState(false);

  function valueChange(e: any) {
    onChange && onChange({
      type: 'static',
      value: e?.target?.checked,
    });
  }

  function select(record: any) {
    onChange && onChange({
      type: 'variable',
      value: record.name,
    });

    setVisible(false);
  }


  return (
    <div className='flex gap-[8px]'>
      <Checkbox
        disabled={value?.type === 'variable'}
        checked={(value?.type === 'static' || !value) ? value?.value : ''}
        onChange={valueChange}
      />
      <SettingOutlined
        onClick={() => { setVisible(true) }}
        className='cursor-pointer'
        style={{ color: value?.type === 'variable' ? 'blue' : '' }}
      />
      <SelectVariableModal
        open={visible}
        onCancel={() => { setVisible(false) }}
        onSelect={select}
      />
    </div>
  )
}


export default SettingFormItemCheckbox;