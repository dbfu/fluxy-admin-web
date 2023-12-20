import {EXPAND_ICON} from '../icons';

export const startNode: any = {
  options: {
    style: {
      fill: '#E6F7FF',
      radius: 8,
      lineWidth: 1,
      stroke: '#1890FF',
      fillOpacity: '0.95',
    },
    stateStyles: {
      hover: {},
      selected: {},
    },
    labelCfg: {
      style: {
        fill: '#000000',
        fontSize: 14,
        fontWeight: 400,
        fillOpacity: '0.7',
      },
    },
    size: [120, 40],
  },
  drawShape(cfg: any, group: any) {
    const styles = this.getShapeStyle(cfg);
    const h = styles.height;

    const keyShape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        ...styles,
      },
    });

    group.addShape('marker', {
      attrs: {
        x: 0,
        y: h / 2 + 7,
        r: 6,
        stroke: '#73d13d',
        cursor: 'pointer',
        symbol: EXPAND_ICON,
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'add-item',
    });

    return keyShape;
  },
};
