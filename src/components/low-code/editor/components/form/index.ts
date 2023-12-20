import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Form, {
    name: ItemType.Form,
    desc: '表单',
    defaultProps: {},
    dev: Dev,
    prod: Prod,
    setter: [
      {
        name: 'defaultValue',
        label: '默认值',
        type: 'input',
      },
    ],
    events: [
      {
        name: 'onFinish',
        desc: '校验成功',
      },
    ],
    methods: [
      {
        name: 'submit',
        desc: '提交',
      },
    ],
    order: 6,
    allowDrag: [ItemType.Page, ItemType.Space, ItemType.Modal],
  });
};
