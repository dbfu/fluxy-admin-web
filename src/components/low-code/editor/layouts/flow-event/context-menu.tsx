import { Dropdown } from 'antd';
import React from 'react';

interface Props {
  position: {
    top?: number;
    left?: number;
  };
  onSelect: (item: any) => void;
  items: { label: string, key: string }[];
  open: boolean;
}

const ContextMenu: React.FC<Props> = (props) => {
  const { position, onSelect, items, open } = props;

  return (
    <div
      style={{
        position: 'absolute',
        top: position?.top,
        left: position?.left,
      }}
    >
      <Dropdown
        menu={{
          items: items.map(item => ({ label: item.label, key: item.key })),
          onClick: onSelect
        }}
        open={open}
      >
        <a onClick={(e) => e.preventDefault()}></a>
      </Dropdown>
    </div>
  );
}

export default ContextMenu;
