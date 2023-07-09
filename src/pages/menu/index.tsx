import React, { useEffect, useState, useMemo } from 'react';
import { Button, Divider, Table, Tag, Space, TablePaginationConfig, Popconfirm } from 'antd';
import { antdUtils } from '@/utils/antd';
import { antdIcons } from '@/assets/antd-icons';
import { useRequest } from '@/hooks/use-request';

import NewAndEditForm, { MenuType } from './new-edit-form';
import menuService, { Menu } from './service';

const MenuPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<Menu[]>([]);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const [createVisible, setCreateVisible] = useState(false);
  const [parentId, setParentId] = useState<string>('');
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [curRowData, setCurRowData] = useState<Menu>();
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
  };

  const saveHandle = () => {
    setCreateVisible(false);
    setEditData(null);
    if (!curRowData) {
      getMenus();
      setExpandedRowKeys([]);
    } else {
      curRowData._loaded_ = false;
      expandHandle(true, curRowData);
    }
  }

  const expandHandle = async (expanded: boolean, record: (Menu)) => {
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
        title: '名称',
        dataIndex: 'name',
        width: 300,
      },
      {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        width: 100,
        render: (value: number) => (
          <Tag color="processing">{value === MenuType.DIRECTORY ? '目录' : '菜单'}</Tag>
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
        title: 'url',
        dataIndex: 'url',
      },
      {
        title: '文件地址',
        dataIndex: 'filePath',
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
        render: (value: string, record: Menu) => {
          return (
            <Space
              split={(
                <Divider type='vertical' />
              )}
            >
              <a
                onClick={() => {
                  setParentId(value);
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
              <Popconfirm
                title="是否删除？"
                onConfirm={async () => {
                  const [error] = await menuService.removeMenu(value);

                  if (!error) {
                    antdUtils.message?.success('删除成功');
                    getMenus();
                    setExpandedRowKeys([]);
                  }
                }}
                placement='topRight'
              >
                <a>删除</a>
              </Popconfirm>
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
        parentId={parentId}
        editData={editData}
      />
    </div>
  );
};

export default MenuPage;
