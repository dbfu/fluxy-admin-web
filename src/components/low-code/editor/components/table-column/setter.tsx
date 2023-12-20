import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import { arrayMove } from "react-sortable-hoc";
import CommonSetter from '../../common/common-setter';
import SortableList from '../../common/sortable-list';
import FlowEvent from '../../layouts/flow-event';

const setter = [
  {
    name: 'type',
    label: '类型',
    type: 'select',
    options: [
      {
        label: '文本',
        value: 'text',
      },
      {
        label: '日期',
        value: 'date',
      },
      {
        label: '操作',
        value: 'option',
      },
    ],
  },
  {
    name: 'title',
    label: '标题',
    type: 'input',
  },
  {
    name: 'dataIndex',
    label: '字段',
    type: 'input',
  },
];

function OptionsFormItem({ value = [], onChange }: any) {

  const [open, setOpen] = useState(false);
  const [curItem, setCurItem] = useState<any>({});
  const flowEventRef = useRef<any>();

  function changeHandle(val: string, item: any) {
    item.label = val;
    onChange([...value]);
  }

  function sortEndHanlde({ oldIndex, newIndex }: { oldIndex: number; newIndex: number; }) {
    onChange(arrayMove(value, oldIndex, newIndex));
  }

  function save() {
    const val = flowEventRef.current?.save();
    curItem.event = val;
    onChange([...value]);
    setOpen(false);
    setCurItem({});
  }

  return (
    <div>
      <div className="h-[32px] flex items-center bg-[#f7f8fa] px-[16px] rounded-2px font-semibold">操作</div>
      <div className='w-[100%] p-[20px]'>
        <SortableList
          items={value || []}
          hiddenEdit
          onDelete={(item: any) => {
            const index = value.findIndex((v: any) => v.dataIndex === item.dataIndex);
            value.splice(index, 1);
            onChange([...value]);
          }}
          itemRender={(item: any) => (
            <Space>
              <div
                className='w-[140px] text-[14px] text-[rgb(0,0,0)]'
                style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" }}
              >
                <Input onChange={(e) => { changeHandle(e.target.value, item) }} value={item.label} />
              </div>
              <Tooltip title="设置点击事件">
                <EditOutlined
                  onClick={() => {
                    setCurItem(item);
                    setOpen(true);
                  }}
                  className="cursor-pointer"
                />
              </Tooltip>
            </Space>
          )}
          useDragHandle
          onSortEnd={sortEndHanlde}
        />
      </div>
      <div
        className='px-[20px]'
      >
        <Button
          icon={(
            <PlusOutlined />
          )}
          block
          type='dashed'
          onClick={() => {
            onChange([...value, { key: new Date().getTime(), label: '' }]);
          }}
        >
          添加
        </Button>
      </div>
      <Drawer
        title="设置事件流"
        width="100vw"
        open={open}
        zIndex={1005}
        onClose={() => { setOpen(false); }}
        extra={(
          <Button
            type='primary'
            onClick={save}
          >
            保存
          </Button>
        )}
        push={false}
        destroyOnClose
        styles={{ body: { padding: 0 } }}
      >
        <FlowEvent flowData={curItem?.event} ref={flowEventRef} />
      </Drawer>
    </div>
  )
}


function Setter() {

  const form = Form.useFormInstance();

  const type = Form.useWatch('type', form);

  return (
    <>
      <CommonSetter setters={setter} />
      {type === 'option' && (
        <Form.Item noStyle name="options">
          <OptionsFormItem />
        </Form.Item>
      )}
    </>
  )
}

export default Setter;