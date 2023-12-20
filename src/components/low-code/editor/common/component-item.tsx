import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useComponentConfigStore } from '../stores/component-config';

interface ComponentItemProps {
  // 组件名称
  name: string,
  // 组件描述
  description: string,
  // 拖拽结束回调
  onDragEnd: any,
  // 拖拽中回调
  onDragging?: () => void,
}


const ComponentItem: React.FC<ComponentItemProps> = ({ name, description, onDragEnd, onDragging }) => {

  const { componentConfig } = useComponentConfigStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();

      if (!dropResult) return;

      let props: any = {};

      const defaultProps = componentConfig?.[name]?.defaultProps;

      if (defaultProps) {
        if (typeof defaultProps === 'function') {
          props = defaultProps();
        } else {
          props = defaultProps || {};
        }
      }

      onDragEnd && onDragEnd({
        name,
        props,
        desc: description,
        ...dropResult,
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }), [name, componentConfig]);

  useEffect(() => {
    if (onDragging) {
      onDragging()
    }
  }, [onDragging, isDragging]);

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className='bg-[rgba(54,133,242,.1)] dark:text-[rgba(255,255,255,.8)] text-[rgba(0,0,0,.7)] cursor-move py-[10px] px-[20px] rounded-lg dark:bg-[rgb(37,50,84)] flex flex-1 items-center'
      style={{
        opacity,
      }}
    >
      {description}
    </div>
  )
}

export default ComponentItem;

