import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.SearchForm, {
    name: ItemType.SearchForm,
    desc: '搜索区',
    defaultProps: {},
    dev: Dev,
    prod: Prod,
    events: [
      {
        name: 'onSearch',
        desc: '搜索',
      },
    ],
    order: 8,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
