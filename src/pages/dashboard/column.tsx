import { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

import { useGlobalStore } from '@/stores/global';

import columnDarkTheme from './theme/dark-column-theme.json'
import columnLightTheme from './theme/light-column-theme.json'

const DemoColumn = () => {
  const [data, setData] = useState([]);

  const { darkMode } = useGlobalStore();

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config: any = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    height: 480,
    legend: {
      position: 'bottom'
    },
  };
  return <Column theme={darkMode ? columnDarkTheme : columnLightTheme} {...config} />;
};

export default DemoColumn;