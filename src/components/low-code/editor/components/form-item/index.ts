import {Context} from '../../interface';
import {ItemType} from '../../item-type';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.FormItem, {
    name: ItemType.FormItem,
    desc: '表单项',
    defaultProps: () => {
      return {
        name: {type: 'static', value: new Date().getTime()},
        label: {type: 'static', value: '标题'},
      };
    },
    dev: Dev,
    prod: Prod,
    setter: [
      {
        name: 'type',
        label: '类型',
        type: 'select',
        options: [
          {
            label: '输入框',
            value: 'input',
          },
          {
            label: '日期',
            value: 'date',
          },
        ],
      },
      {
        name: 'label',
        label: '标题',
        type: 'input',
      },
      {
        name: 'name',
        label: '字段',
        type: 'input',
      },
      {
        name: 'rules',
        label: '校验',
        type: 'select',
        options: [
          {
            label: '必输',
            value: 'required',
          },
        ],
      },
    ],
    order: 7,
    allowDrag: [ItemType.Form],
  });
};
