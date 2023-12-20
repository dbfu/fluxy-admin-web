import { Modal, Table } from 'antd';
import { useVariablesStore } from '../stores/variable';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (record: any) => void;
}

const columns = [{
  title: '变量名',
  dataIndex: 'name',
}, {
  title: '变量值',
  dataIndex: 'defaultValue',
}, {
  title: '备注',
  dataIndex: 'remark',
}]

const SelectVariableModal: React.FC<Props> = ({
  open,
  onCancel,
  onSelect,
}) => {

  const { variables } = useVariablesStore();

  function rowSelect(record: any) {
    onSelect(record);
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="选择变量"
      width={800}
    >
      <Table
        onRow={(record) => ({
          onClick: () => {
            rowSelect(record);
          }
        })}
        columns={columns}
        rowKey={record => record.name}
        dataSource={variables}
      />
    </Modal>
  )
}

export default SelectVariableModal;