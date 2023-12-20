import ProdStage from '@/components/low-code/editor/layouts/stage/prod';
import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

const LowCodeRenderer = ({ pageId, version }: { pageId?: string, version?: string }) => {

  const [loading, setLoading] = useState(true);

  const [components, setComponents] = useState([]);

  // 存放已经加载过的组件配置
  const loadedComponents = useRef(new Map());

  const loadComponents = async () => {

    const url = `/file/low-code/${pageId}/${version}.json`;

    // 已经加载过，直接返回
    if (loadedComponents.current.has(url)) {
      setComponents(loadedComponents.current.get(url));
      return;
    }

    // 获取组件配置
    const data = await window.fetch(url)
      .then(res => res.json());
    
    loadedComponents.current.set(url, data.components);
    setComponents(data.components);
  }

  const init = async () => {
    setLoading(true);
    await loadComponents();
    setLoading(false);
  }

  useEffect(() => {
    if (pageId && version) {
      init();
    }
  }, [
    pageId,
    version,
  ]);

  if (loading || !pageId || !version) {
    return (
      <Spin />
    )
  }

  return (
    <ProdStage components={components} />
  )
}

export default LowCodeRenderer;