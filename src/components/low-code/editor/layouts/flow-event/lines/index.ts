import G6 from '@antv/g6';

export const registerLines = () => {
  G6.registerEdge('flow-line', {
    drawShape(cfg: any, group: any) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;

      const {style} = cfg;
      const shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y],
          ],
        },
      });

      if (cfg.label && cfg.label.length) {
        console.log(32323232);

        // the left label
        group.addShape('text', {
          attrs: {
            text: cfg.label,
            fill: '#595959',
            textAlign: 'center',
            textBaseline: 'middle',
            x: endPoint.x,
            y:
              startPoint.x === endPoint.x
                ? (startPoint.y + endPoint.y) / 2
                : (startPoint.y + endPoint.y) / 2 +
                  (endPoint.y - startPoint.y) / 8,
          },
          name: 'text',
        });
      }

      return shape;
    },
  });
};
