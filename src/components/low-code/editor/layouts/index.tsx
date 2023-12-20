import { Allotment } from "allotment";
import "allotment/dist/style.css";
import React, { useEffect, useRef, useState } from 'react';

import { Spin } from 'antd';
import { ComponentConfig } from '../interface';
import { useComponentConfigStore } from '../stores/component-config';
import { clearComponentRef } from '../stores/component-ref';
import { useComponentsStore } from '../stores/components';
import { usePageDataStore } from '../stores/page-data';
import { useVariablesStore } from '../stores/variable';
import Header from './header';
import Material from './material';
import Setting from './setting';
import EditStage from './stage/edit';
import ProdStage from './stage/prod';

const Layout: React.FC<{
  headerExtra: React.ReactNode,
  headerTitle: string,
}> = ({
  headerExtra,
  headerTitle,
}) => {

  const { mode, components } = useComponentsStore();
  const { setComponentConfig } = useComponentConfigStore();
  const [loading, setLoading] = useState(true);
  const { mergeData } = usePageDataStore();
  const { variables } = useVariablesStore();

  const componentConfigRef = useRef<any>({});
  const editStageRef = useRef<any>(null);

  // 注册组件
  function registerComponent(name: string, componentConfig: ComponentConfig) {
    componentConfigRef.current[name] = componentConfig;
  }

  // 加载组件配置
  async function loadComponentConfig() {
    // 初始化变量到全局数据中
    mergeData(variables.reduce((prev: any, variable) => {
      prev[variable.name] = variable.defaultValue;
      return prev;
    }, {}));

    // 加载组件配置模块代码
    const modules = import.meta.glob('../components/*/index.ts', { eager: true });

    const tasks = Object.values(modules).map((module: any) => {
      if (module?.default) {
        // 执行组件配置里的方法，把注册组件方法传进去
        return module.default({ registerComponent });
      }
    });

    // 等待所有组件配置加载完成
    await Promise.all(tasks);
    // 注册组件到全局
    setComponentConfig(componentConfigRef.current);
    setLoading(false);
  }


  useEffect(() => {
    clearComponentRef();
    loadComponentConfig();
  }, []);

  function onDragging() {
    editStageRef.current?.updateSelectedMaskPosition();
  }


  if (loading) {
    return (
      <div className='text-center mt-[100px]'>
        <Spin />
      </div>
    )
  }

  return (
    <div className='h-[100vh] flex flex-col'>
      <div className='h-[60px] flex items-centen'>
        <Header extra={headerExtra} title={headerTitle} />
      </div>
      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={400} minSize={200}>
            <Material onDragging={onDragging} />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditStage ref={editStageRef} />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <ProdStage components={components} />
      )}
    </div>
  )
}

export default Layout;