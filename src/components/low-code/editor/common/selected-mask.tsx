
import { DeleteOutlined } from '@ant-design/icons';
import { Dropdown, Popconfirm, Space } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useComponentConfigStore } from '../stores/component-config';
import { useComponentsStore } from '../stores/components';
import { getComponentById } from '../utils/utils';

interface Props {
  // 容器class
  containerClassName: string,
  // 相对容器class
  offsetContainerClassName: string
}

function SelectedMask({ containerClassName, offsetContainerClassName }: Props, ref: any) {

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    toolsTop: 0,
    toolsLeft: 0,
  });

  const { curComponent, curComponentId, components, setCurComponentId, deleteComponent } = useComponentsStore();

  const { componentConfig } = useComponentConfigStore();

  // 对外暴露更新位置方法
  useImperativeHandle(ref, () => ({
    updatePosition,
  }));

  useEffect(() => {
    updatePosition();
  }, [curComponentId]);

  function updatePosition() {
    if (!curComponentId) return;

    const container = document.querySelector(`.${offsetContainerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${curComponentId}"]`);

    if (!node) return;

    // 获取节点位置
    const { top, left, width, height } = node.getBoundingClientRect();
    // 获取容器位置
    const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

    let toolsTop = top - containerTop + container.scrollTop;
    let toolsLeft = left - containerLeft + width;

    if (toolsTop <= 0) {
      toolsTop -= -30;
      toolsLeft -= 10;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      toolsTop,
      toolsLeft,
    });
  }

  // 获取当前组件的父组件
  const parentComponents = useMemo(() => {

    const parentComponents = [];
    let component = curComponent;

    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }

    return parentComponents;

  }, [curComponent]);


  function deleteHandle() {
    deleteComponent(curComponentId);
    setCurComponentId(null);
  }


  return createPortal((
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(66, 133, 244, 0.2)",
          border: "1px solid rgb(66, 133, 244)",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 10,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.toolsLeft,
          top: position.toolsTop,
          fontSize: "14px",
          color: "#ff4d4f",
          zIndex: 11,
          display: (!position.width || position.width < 10) ? "none" : "inline",
          transform: 'translate(-100%, -100%)',
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map(item => ({
                key: item?.id || '',
                label: item?.desc || item?.name,
              })),
              onClick: ({ key }) => {
                setCurComponentId(Number(key));
              }
            }}
            placement='bottomRight'
            disabled={parentComponents.length === 0}
          >
            <div
              style={{
                padding: '0 8px',
                backgroundColor: '#1890ff',
                borderRadius: 4,
                color: '#fff',
                cursor: "pointer",
                whiteSpace: 'nowrap',
              }}
            >
              {componentConfig[curComponent?.name || '']?.desc}
            </div>
          </Dropdown>
          {+(curComponentId || 0) !== 1 && (
            <div style={{ padding: '0 8px', backgroundColor: '#1890ff' }}>
              <Popconfirm
                title="确认删除？"
                overlayClassName='min-w-130px'
                okText={<div className="delete-confirm-btn" style={{ padding: "0 7px" }}>确认</div>}
                cancelText={<div className="delete-confirm-btn" style={{ padding: "0 7px" }}>取消</div>}
                onConfirm={deleteHandle}
                // getPopupContainer={n => n.parentNode}
                placement="bottomRight"
                okButtonProps={{ style: { padding: 0 } }}
                cancelButtonProps={{ style: { padding: 0 } }}
              >
                <DeleteOutlined
                  style={{ color: '#fff' }}
                />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>

  ), document.querySelector(`.${containerClassName}`)!)
}

export default forwardRef(SelectedMask);
