import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Modal, {
    name: ItemType.Modal,
    desc: '弹框',
    defaultProps: () => {
      return {
        title: {type: 'static', value: '标题'},
      };
    },
    dev: Dev,
    prod: Prod,
    setter: [
      {
        name: 'title',
        label: '标题',
        type: 'input',
      },
    ],
    events: [
      {
        name: 'onOk',
        desc: '确定',
      },
      {
        name: 'onCancel',
        desc: '取消',
      },
    ],
    methods: [
      {
        name: 'open',
        desc: '显示',
      },
      {
        name: 'close',
        desc: '隐藏',
      },
      {
        name: 'startConfirmLoading',
        desc: '开始确认按钮loading',
      },
      {
        name: 'endConfirmLoading',
        desc: '结束确认按钮loading',
      },
    ],
    order: 3,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
