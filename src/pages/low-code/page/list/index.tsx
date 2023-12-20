import { antdUtils } from '@/utils/antd';
import { useAntdTable } from 'ahooks';
import { Badge, Button, Divider, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import service from './service';

const LowCodePageList = () => {

  const navigate = useNavigate();

  const {
    tableProps,
    refresh,
  } = useAntdTable(service.getLowCodePages);

  const dataSource = useMemo(() => {
    return tableProps.dataSource?.map((item: any) => {
      return {
        ...item,
        versions: item.versions?.map((version: any) => ({
          ...version,
          menu: item,
          curVersion: version.version === item.curVersion,
        }))
      }
    });
  }, [tableProps.dataSource]);

  const publish = async (menuId: string, version: string) => {
    const [err] = await service.publishLowCodePage({ menuId, version });
    if (!err) {
      antdUtils.message?.success('发布成功');
    }
    refresh();
  }

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: '页面名称',
      }, {
        dataIndex: 'curVersion',
        title: '当前版本',
        render: (value: string) => (
          <Space>
            <Badge status="processing" />
            {value}
          </Space>
        )
      },
    ]
  }, []);

  const versionColumns = useMemo(() => {
    return [{
      dataIndex: 'version',
      title: '版本号',
    }, {
      dataIndex: 'description',
      title: '版本描述',
    }, {
      dataIndex: 'createDate',
      title: '创建时间',
      render: (value: string) => value && dayjs(value).format("YYYY-MM-DD HH:mm:ss")
    }, {
      dataIndex: 'updateDate',
      title: '最后一次更新时间',
      render: (value: string) => value && dayjs(value).format("YYYY-MM-DD HH:mm:ss")
    }, {
      dataIndex: 'id',
      title: '操作',
      render: (id: string, record: any) => (
        <Space split={<Divider type="vertical" />}>
          <a
            className={record.curVersion && 'disabled'}
            onClick={() => navigate(`/low-code/page/edit-page/${id}`)}
          >
            编辑
          </a>
          <a
            className={record.curVersion && 'disabled'}
            onClick={() => publish(record.menu.id, record.version)}
          >
            发布
          </a>
          <a
            onClick={() => navigate(`/low-code/page/copy-page/${id}`)}
          >
            复制
          </a>
        </Space>
      )
    }]
  }, []);

  const expandedRowRender = (record: any) => {
    return (
      <Table
        dataSource={record.versions || []}
        columns={versionColumns}
        pagination={false}
      />
    )
  }

  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      <Button
        onClick={() => {
          navigate('/low-code/page/new-page');
        }}
        type='primary'
      >
        创建页面
      </Button>
      <Table
        rowKey={(o) => o.id}
        columns={columns}
        {...tableProps}
        dataSource={dataSource}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
        }}
      />
    </Space>
  )
}

export default LowCodePageList;