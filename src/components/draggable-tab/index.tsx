/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { useUpdateEffect } from 'ahooks';
import { omit } from 'lodash';
import './index.css';

type Write<T, U> = Omit<T, keyof U> & U

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-node-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const DraggableTab: React.FC<Write<TabsProps , {
  onItemsChange?: (items: any[]) => void,
  onDragEnd?: ({ activeIndex, overIndex }: { activeIndex: number, overIndex: number }) => void,
}>> = ({ onItemsChange, ...props }) => {
  const [items, setItems] = useState(props.items || []);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = items.findIndex((i) => i.key === active.id);
      const overIndex = items.findIndex((i) => i.key === over?.id);
      setItems(arrayMove(items, activeIndex, overIndex));
      props.onDragEnd && props.onDragEnd({ activeIndex, overIndex });
    }
  };

  useEffect(() => {
    setItems(props.items || []);
  }, [props.items]);

  useUpdateEffect(() => {
    if (onItemsChange) {
      onItemsChange(items);
    }
  }, [items]);

  return (
    <Tabs
      tabBarStyle={{ margin: 0 }}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]}>
          <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
      {...omit(props, 'onDragEnd')}
      items={items}
      className='tab-layout'
    />
  );
  };



export default DraggableTab;