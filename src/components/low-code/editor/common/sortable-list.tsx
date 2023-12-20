import { DeleteOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => <HolderOutlined className='text-[14px] cursor-move' />);

const SortableItem = SortableElement<any>(({
  item,
  onDelete,
  itemRender,
  customItemRender,
  hiddenEdit,
  onEdit,
  hiddenDelete,
  hiddenDrag,
  itemIndex,
  deleteHandle,
  editHandle,
}: any) => {

  function renderDelete() {
    if (deleteHandle) {
      if (deleteHandle(item, itemIndex)) {
        return (
          <DeleteOutlined onClick={onDelete} className="hover:text-[red] cursor-pointer" />
        )
      }
    } else if (!hiddenDelete) {
      return (
        <DeleteOutlined onClick={onDelete} className="hover:text-[red] cursor-pointer" />
      )
    }
  }

  function renderEdit() {
    if (editHandle) {
      if (editHandle(item, itemIndex)) {
        return (
          <EditOutlined className="cursor-pointer" onClick={() => { onEdit(item, itemIndex) }} />
        )
      }
    } else if (!hiddenEdit) {
      return (
        <EditOutlined className="cursor-pointer" onClick={() => { onEdit(item, itemIndex) }} />
      )
    }
  }

  return (
    <div key={item.key} style={{ lineHeight: 1, fontSize: 14 }} className="py-[4px]">
      {customItemRender ? customItemRender(item, itemIndex) : (
        <Space style={{ width: '100%' }}>
          {renderEdit()}
          {itemRender && itemRender(item, itemIndex)}
          {renderDelete()}
          {!hiddenDrag && <DragHandle />}
        </Space>
      )}
    </div>
  )

});

const SortableList = SortableContainer<any>(({
  items,
  onDelete,
  itemRender,
  hiddenEdit,
  hiddenDelete,
  onEdit,
  hiddenDrag,
  customItemRender,
  deleteHandle,
  editHandle,
}: any) => {
  return (
    <div>
      {items.map((value: any, index: number) => (
        <SortableItem
          key={value.key}
          index={index}
          item={value}
          itemIndex={index}
          onDelete={() => {
            onDelete(value, index);
          }}
          itemRender={itemRender}
          hiddenEdit={hiddenEdit}
          hiddenDelete={hiddenDelete}
          onEdit={onEdit}
          hiddenDrag={hiddenDrag}
          customItemRender={customItemRender}
          deleteHandle={deleteHandle}
          editHandle={editHandle}
        />
      ))}
    </div>
  );
});

export default SortableList;
