import { Table as AntdTable } from 'antd';
import React, { useMemo } from 'react';
import { useDrop } from '../../hooks/use-drop';
import { CommonComponentProps } from '../../interface';

function Table({ _id, _name, children }: CommonComponentProps) {

  const { canDrop, drop } = useDrop(_id, _name);

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div className='m-[-16px] p-[16px]' data-component-id={item.props?._id}>{item.props?.title}</div>
        ),
        dataIndex: item.props?.dataIndex,
      }
    })
  }, [children]);

  return (
    <div
      className='w-[100%]'
      ref={drop}
      data-component-id={_id}
      style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
    >
      <AntdTable
        columns={columns}
        dataSource={[]}
        pagination={false}
      />
    </div>
  );
}

export default Table;