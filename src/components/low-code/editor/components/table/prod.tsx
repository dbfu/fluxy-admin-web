import { Table as AntdTable, Divider, Space } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import axios from 'axios';
import { CommonComponentProps } from '../../interface';


function Table({ url, children, _execEventFlow }: CommonComponentProps, ref: any) {

  const [data, setData] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({});

  const [loading, setLoading] = useState(false);


  const getData = async (params?: any) => {
    if (url) {
      setLoading(true);
      const { data } = await axios.get(url, { params });
      setData(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(searchParams);
  }, [searchParams]);

  useImperativeHandle(ref, () => {
    return {
      search: setSearchParams,
      reload: () => {
        getData(searchParams)
      },
    }
  }, [searchParams])

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === 'date') {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : null,
        }
      } else if (item?.props?.type === 'option') {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (_: any, record: any) => {
            return (
              <Space
                size={0}
                split={<Divider type='vertical' />}
              >
                {item.props.options?.map((option: any) => {
                  return (
                    <a
                      className='select-none'
                      onClick={() => { _execEventFlow(option?.event?.children, record, record) }}
                      key={option.label}
                    >
                      {option.label}
                    </a>
                  )
                })}
              </Space>
            )
          },
        }
      }

      return {
        title: item.props?.title,
        dataIndex: item.props?.dataIndex,
      }
    })
  }, [children]);


  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
}

export default forwardRef(Table);