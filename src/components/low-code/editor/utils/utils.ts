import React from 'react';
import {useComponentConfigStore} from '../stores/component-config';
import {Component} from '../stores/components';

/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}

/**
 * 加载远程组件
 *
 * @param url - 组件的URL地址
 * @returns 组件的默认导出对象
 */
export async function loadRemoteComponent(url: string) {
  const script = await fetch(url).then((res) => res.text());

  const module = {exports: {}};
  const exports = {};

  // 因为上面代码里用到了react，所以要把react注入进去，不然会报错
  const require = (id: string) => {
    if (id === 'react') {
      return React;
    }
  };

  const process = {env: {NODE_ENV: 'production'}};

  const func = new Function('module', 'exports', 'require', 'process', script);

  func(module, exports, require, process);

  return {default: module.exports} as any;
}

/**
 * 获取组件允许拖入的组件
 * @param componentName 组件名
 * @returns
 */
export const getAcceptDrop = (componentName: string) => {
  const {componentConfig} = useComponentConfigStore.getState();

  return (
    Object.values(componentConfig)
      .filter((o) => o.allowDrag?.includes(componentName))
      .map((o) => o.name) || []
  );
};
