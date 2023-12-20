import { useMemo } from 'react';
import ComponentItem from '../../common/component-item';
import { ComponentConfig } from '../../interface';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';

const Material = ({ onDragging }: { onDragging?: () => void }) => {

  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  /**
   * 拖拽结束，添加组件到画布
   * @param dropResult 
   */
  const onDragEnd = (dropResult: { name: string, id?: number, desc: string, props: any }) => {
    addComponent({
      id: new Date().getTime(),
      name: dropResult.name,
      props: dropResult.props,
      desc: dropResult.desc,
    }, dropResult.id);
  }

  const components = useMemo(() => {
    // 加载所有组件
    const coms = Object.values(componentConfig)
      .filter(o => !o.hiddenInMaterial)
      .map((config: ComponentConfig) => {
        return {
          name: config.name,
          description: config.desc,
          order: config.order,
        }
      });

    // 排序
    coms.sort((x, y) => x.order - y.order);
    return coms;
  }, [componentConfig]);

  return (
    <div className='grid grid-cols-2 p-[10px] gap-4 flex-wrap'>
      {components.map(item => <ComponentItem onDragging={onDragging} key={item.name} onDragEnd={onDragEnd} {...item} />)}
    </div>
  )
}

export default Material;