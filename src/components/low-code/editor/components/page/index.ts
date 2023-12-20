import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Page, {
    name: ItemType.Page,
    desc: '页面',
    defaultProps: {},
    dev: Dev,
    prod: Prod,
    order: 0,
    hiddenInMaterial: true,
    allowDrag: [],
  });
};
