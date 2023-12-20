/* eslint-disable */
import { Button, Space, Input, Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons'

function ConditionSettingPanel({ graphRef, curModel, setSettingOpen }: any, ref: any) {
  const [data, setData] = useState(curModel.current?.config || []);

  const [conditionVisible, setConditionVisible] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [conditionValue, setConditionValue] = useState(`(function(ctx) { \n\n })(ctx)`);

  useImperativeHandle(ref, () => {
    return {
      save: () => {
        graphRef.current.updateItem(curModel.current.id, {
          ...curModel.current,
          config: data,
          menus: data.map((item: any) => {
            return {
              key: item.id,
              label: item.name,
              nodeType: 'action',
              nodeName: '动作',
              conditionId: item.id,
            };
          }),
        });

        setSettingOpen && setSettingOpen(false);
      }
    }
  }, [data])


  function nameChange(value: any, index: number) {
    setData((prev: any) => {
      prev[index].name = value;
      return [...prev];
    });
  }

  function conditionChange(value: any, index: number) {
    setData((prev: any) => {
      prev[index].condition = value;
      return [...prev];
    });
  }


  return (
    <div>
      <div style={{ marginTop: 0 }}>
        <Space direction='vertical'>
          {data.map((item: any, index: number) => {
            return (
              <Space key={item.id}>
                <span>{index + 1}.</span>
                <Input
                  onChange={(e) => {
                    nameChange(e.target.value, index);
                  }}
                  value={item.name}
                />
                <SettingOutlined
                  className='cursor-pointer'
                  onClick={() => {
                    setCurIndex(index);
                    setConditionVisible(true);
                    setConditionValue(item.condition || `(function(ctx) { \n\n })(ctx)`);
                  }}
                  style={{ color: item.condition && 'blue' }}
                />
              </Space>
            );
          })}
        </Space>
      </div>
      <div className='mt-[20px]'>
        <Button
          onClick={() => {
            setData((prev: any) => [...prev, { id: new Date().getTime().toString() }]);
          }}
          type='primary'
        >
          添加条件
        </Button>
      </div>
      <Modal
        title="条件设置"
        open={conditionVisible}
        zIndex={1007}
        onCancel={() => { setConditionVisible(false); }}
        onOk={() => {
          conditionChange(conditionValue, curIndex);
          setConditionVisible(false);
        }}
      >
        <Input.TextArea
          value={conditionValue}
          onChange={e => { setConditionValue(e.target.value) }}
          rows={10}
        />
      </Modal>
    </div>
  );
}

export default forwardRef(ConditionSettingPanel);
