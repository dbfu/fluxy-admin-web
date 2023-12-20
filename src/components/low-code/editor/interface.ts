export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  desc: string;
}

export interface ComponentMethod {
  name: string;
  desc: string;
}

export interface ComponentConfig {
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件描述
   */
  desc: string;
  /**
   * 组件默认属性
   */
  defaultProps?:
    | {
        [key: string]: {
          type: 'variable' | 'static';
          value: any;
        };
      }
    | (() => {
        [key: string]: {
          type: 'variable' | 'static';
          value: any;
        };
      });
  /**
   * 编辑模式下加载的组件
   */
  dev: any;
  /**
   * 正式模式下加载的组件
   */
  prod: any;
  /**
   * 组件属性配置
   */
  setter?: any | ComponentSetter[];
  /**
   * 组件方法
   */
  methods?: ComponentMethod[];
  /**
   * 组件事件
   */
  events?: ComponentEvent[];
  /**
   * 组件排序
   */
  order: number;
  /**
   * 组件是否在物料中隐藏
   */
  hiddenInMaterial?: boolean;
  /**
   * 允许放置到哪些组件上
   */
  allowDrag: string[];
}

export interface Context {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export interface CommonComponentProps {
  _id: number;
  _name: string;
  _desc?: string;
  children?: any;
  [key: string]: any;
}


