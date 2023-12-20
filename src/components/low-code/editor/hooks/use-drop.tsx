import { useDrop as useDndDrop } from 'react-dnd';
import { getAcceptDrop } from '../utils/utils';

export const useDrop = (id: number, componentName: string) => {
  const [{ canDrop }, drop] = useDndDrop(() => ({
    accept: getAcceptDrop(componentName),
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return;
      }

      return {
        id,
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));


  return {
    drop,
    canDrop,
  }
}