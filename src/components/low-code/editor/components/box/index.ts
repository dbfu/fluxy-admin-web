import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Box, {
    name: ItemType.Box,
    desc: '盒子',
    defaultProps: {
    },
    dev: Dev,
    prod: prod,
    setter: [
     
    ],
    methods: [
      
    ],
    events: [
      
    ],
    order: 1.1,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
