import { TinyArea } from '@ant-design/plots';

const DemoTinyArea = () => {
  const data = [
    0, 300, 438, 287, 309, 600, 900, 575, 563, 300, 200
  ];
  const config = {
    height: 95,
    data,
    smooth: true,
    areaStyle: { fill: 'l(360) 1:rgba(98,0,234,0.65)  0.5:rgba(177,128,245,0.5)  0.5:rgba(177,128,245,0.5)' },
  };
  return <TinyArea {...config} renderer="svg" line={{ color: '#6200ea' }} appendPadding={[0, -24, 0, -16]} />;
};

export default DemoTinyArea;