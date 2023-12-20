import G6 from '@antv/g6';
import { startNode } from './start';
import { conditionNode } from './condition';
import { actionNode } from './action';
import { eventNode } from './event';

export const registerNodes = () => {
  G6.registerNode('start', startNode, 'rect');
  G6.registerNode('condition', conditionNode, 'rect');
  G6.registerNode('action', actionNode, 'rect');
  G6.registerNode('event', eventNode, 'rect');
}