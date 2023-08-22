import React, { useEffect, useState, useMemo } from 'react';
import { Button, Divider, Table, Tag, Space, TablePaginationConfig } from 'antd';
import { antdIcons } from '@/assets/antd-icons';
import { useRequest } from '@/hooks/use-request';

import NewAndEditForm from './new-edit-form';
import menuService, { Menu } from './service';
import { MenuTypeName } from './interface';

const MenuPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<Menu[]>([]);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const [createVisible, setCreateVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [curRowData, setCurRowData] = useState<null | Menu>();
  const [editData, setEditData] = useState<null | Menu>(null);

  const { loading, runAsync: getMenusByPage } = useRequest(menuService.getMenusByPage, { manual: true });

  const getMenus = async () => {
    const { current, pageSize } = pagination || {};

    const [error, data] = await getMenusByPage({
      current,
      pageSize,
    });

    if (!error) {
      setDataSource(
        data.data.map((item: any) => ({
          ...item,
          children: item.hasChild ? [] : null,
        })),
      );
      setPagination(prev => ({
        ...prev,
        total: data.total,
      }));
    }
  };

  const cancelHandle = () => {
    setCreateVisible(false);
    setEditData(null);
    setCurRowData(null);
  };

  const saveHandle = () => {
    setCreateVisible(false);
    setEditData(null);
    setCurRowData(null);
    if (!curRowData) {
      getMenus();
      setExpandedRowKeys([]);
    } else {
      curRowData._loaded_ = false;
      expandHandle(true, curRowData);
    }
  }

  const expandHandle = async (expanded: boolean, record: Menu) => {
    if (expanded && !record._loaded_) {
      const [error, children] = await menuService.getChildren(record.id);
      if (!error) {
        record._loaded_ = true;
        record.children = (children || []).map((o: Menu) => ({
          ...o,
          children: o.hasChild ? [] : null,
        }));
        setDataSource([...dataSource]);
      }
    }
  };

  const tabChangeHandle = (tablePagination: TablePaginationConfig) => {
    setPagination(tablePagination);
  }

  useEffect(() => {
    getMenus();
  }, [
    pagination.size,
    pagination.current,
  ]);

  const columns: any[] = useMemo(
    () => [
      {
        title: '名称1',
        dataIndex: 'name',
        width: 300,
      },
      {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        width: 100,
        render: (value: number) => (
          <Tag color="processing">{MenuTypeName[value]}</Tag>
        ),
      },
      {
        title: '图标',
        align: 'center',
        width: 100,
        dataIndex: 'icon',
        render: value => antdIcons[value] && React.createElement(antdIcons[value])
      },
      {
        title: '路由',
        dataIndex: 'route',
      },
      {
        title: '文件地址',
        dataIndex: 'filePath',
      },
      {
        title: '按钮权限代码',
        dataIndex: 'authCode',
      },
      {
        title: '排序号',
        dataIndex: 'orderNumber',
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'id',
        align: 'center',
        width: 200,
        render: (_: string, record: Menu) => {
          return (
            <Space
              split={(
                <Divider type='vertical' />
              )}
            >
              <a
                onClick={() => {
                  setCreateVisible(true);
                  setCurRowData(record);
                }}
              >
                添加
              </a>
              <a
                onClick={() => {
                  setEditData(record);
                  setCreateVisible(true);
                }}
              >
                编辑
              </a>
            </Space>
          );
        },
      },
    ],
    [],
  );



  return (
    <div>
      <Button
        className="mb-[12px]"
        type="primary"
        onClick={() => {
          setCreateVisible(true);
        }}
        v-auth="menu:create"
      >
        新建
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={tabChangeHandle}
        tableLayout="fixed"
        expandable={{
          rowExpandable: () => true,
          onExpand: expandHandle,
          expandedRowKeys,
          onExpandedRowsChange: (rowKeys) => {
            setExpandedRowKeys(rowKeys);
          },
        }}
      />
      <NewAndEditForm
        onSave={saveHandle}
        onCancel={cancelHandle}
        visible={createVisible}
        curRecord={curRowData}
        editData={editData}
      />
    </div>
  );
};

export default MenuPage;
