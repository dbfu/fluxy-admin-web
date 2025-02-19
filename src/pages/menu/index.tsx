import { antdIcons } from '@/assets/antd-icons';
import { t } from '@/utils/i18n';
import { Button, Divider, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

import { menu_children, menu_page } from '@/api/menu';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { toPageRequestParams } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import to from 'await-to-js';
import { MenuTypeName } from './interface';
import NewAndEditForm from './new-edit-form';

type DataRecord = API.MenuVO & { _loaded_: boolean, children: API.MenuVO[] };

function MenuPage() {
  const [dataSource, setDataSource] = useState<API.MenuVO[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [curRowData, setCurRowData] = useState<null | DataRecord>();
  const [editData, setEditData] = useState<null | API.MenuVO>(null);

  const actionRef = useRef<ActionType>();

  const cancelHandle = () => {
    setFormVisible(false);
    setEditData(null);
    setCurRowData(null);
  };

  const saveHandle = () => {
    setFormVisible(false);
    setEditData(null);
    setCurRowData(null);
    if (!curRowData) {
      actionRef.current?.reload();
      setExpandedRowKeys([]);
    } else {
      curRowData._loaded_ = false;
      expandHandle(true, curRowData);
    }
  }

  const expandHandle = async (expanded: boolean, record: API.MenuVO & { _loaded_: boolean, children: API.MenuVO[] }) => {
    if (expanded && !record._loaded_) {
      const [error, children] = await to(menu_children({ parentId: record.id! }));
      if (!error) {
        record._loaded_ = true;
        record.children = (children || []).map((o: API.MenuVO) => ({
          ...o,
          children: o.hasChild ? [] : null,
        }));
        setDataSource([...dataSource]);
      }
    }
  };

  const columns: ProColumnType<DataRecord>[] = [{
    title: t("qvtQYcfN" /* 名称 */),
    dataIndex: 'name',
    width: 300,
  }, {
    title: t("ToFVNEkU" /* 类型 */),
    dataIndex: 'type',
    align: 'center',
    width: 100,
    renderText: (value: number) => (
      <Tag color="processing">{MenuTypeName[value]}</Tag>
    ),
  }, {
    title: t("ESYcSMBi" /* 图标 */),
    align: 'center',
    width: 100,
    dataIndex: 'icon',
    renderText: value => antdIcons[value] && React.createElement(antdIcons[value])
  }, {
    title: t("XBkSjYmn" /* 路由 */),
    dataIndex: 'route',
  }, {
    title: t("aqmTtwBN" /* 文件地址 */),
    dataIndex: 'filePath',
  }, {
    title: t("lDZjrith" /* 按钮权限代码 */),
    dataIndex: 'authCode',
  }, {
    title: t("XRfphTtu" /* 排序号 */),
    dataIndex: 'orderNumber',
    width: 100,
  }, {
    title: t("QkOmYwne" /* 操作 */),
    dataIndex: 'id',
    align: 'center',
    width: 200,
    renderText: (_: string, record: DataRecord) => {
      return (
        <Space
          split={(
            <Divider type='vertical' />
          )}
        >
          <LinkButton
            onClick={() => {
              setFormVisible(true);
              setCurRowData(record);
            }}
          >
            {t("hRiGeMNr" /* 添加 */)}
          </LinkButton>
          <LinkButton
            onClick={() => {
              setEditData(record);
              setFormVisible(true);
            }}
          >
            {t("wXpnewYo" /* 编辑 */)}
          </LinkButton>
        </Space>
      );
    },
  },
  ];

  return (
    <>
      <FProTable<DataRecord>
        search={false}
        actionRef={actionRef}
        columns={columns}
        pagination={{ pageSize: 10 }}
        expandable={{
          rowExpandable: () => true,
          onExpand: expandHandle,
          expandedRowKeys,
          onExpandedRowsChange: (rowKeys) => {
            setExpandedRowKeys(rowKeys);
          },
        }}
        onDataSourceChange={(data) => {
          setExpandedRowKeys([]);
          setDataSource(data);
        }}
        request={async (params) => {
          const tableData = await menu_page(toPageRequestParams(params));
          return {
            data: tableData?.data?.map((item) => ({
              ...item,
              children: item.hasChild ? [] : null,
              _loaded_: false,
            })) as DataRecord[],
            total: tableData.total,
          };
        }}
        headerTitle={(
          <Button
            className="mb-[12px]"
            type="primary"
            onClick={() => {
              setFormVisible(true);
            }}
            icon={<PlusOutlined />}
            v-auth="menu:create"
          >
            {t('morEPEyc' /* 新增 */)}
          </Button>
        )}
      />
      <NewAndEditForm
        onCancel={cancelHandle}
        visible={formVisible}
        curRecord={curRowData}
        editData={editData}
        onOpenChange={open => {
          if (!open) {
            setFormVisible(false);
            setCurRowData(null);
            setEditData(null);
          }
        }}
        onSaveSuccess={saveHandle}
      />
    </>
  );
}

export default MenuPage;
