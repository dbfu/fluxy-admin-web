export interface Menu {
  /**
   * 菜单key
   */
  key: string;
  /**
   * 菜单描述
   */
  label: string;
  /**
   * 即将生成的节点类型
   */
  nodeType?: string;
  /**
   * 将生成的节点名称
   */
  nodeName?: string;
  /**
   * 如果节点为条件节点，每个菜单表示一个条件
   */
  conditionId?: string;
}

export interface Node {
  /**
   * 节点id
   */
  id: string;
  /**
   * 节点描述
   */
  label: string;
  /**
   * 节点类型
   */
  type: string;
  /**
   * 节点菜单
   */
  menus: Menu[];
  /**
   * 节点子节点
   */
  children?: Node[];
  /**
   * 节点额外配置
   */
  config?: any;
  /**
   * 节点条件结果
   */
  conditionResult?: boolean;
  /**
   * 节点事件key
   */
  eventKey?: string;
}

export const data: Node = {
  id: 'root',
  label: '开始',
  type: 'start',
  menus: [
    {
      key: 'action',
      label: '动作',
      nodeType: 'action',
      nodeName: '动作',
    },
    {
      key: 'condition',
      label: '条件',
      nodeType: 'condition',
      nodeName: '条件',
    },
  ],
};
