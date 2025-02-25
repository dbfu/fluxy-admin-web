
import { api_log_getBodyData, api_log_getQueryData, api_log_getResultData, api_log_page } from '@/api/apiLog';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { toPageRequestParams } from '@/utils/utils';
import { ProColumnType } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Badge, Input, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

function ApiLogPage() {

  const [open, setOpen] = useState(false);
  const [viewType, setViewType] = useState<'body' | 'query' | 'result' | ''>('')

  const {
    run: getBodyData,
    loading: getBodyDataLoading,
    data: bodyData,
  } = useRequest(api_log_getBodyData, { manual: true });

  const {
    run: getQueryData,
    loading: getQueryDataLoading,
    data: queryData,
  } = useRequest(api_log_getQueryData, { manual: true });

  const {
    run: getResultData,
    loading: getResultDataLoading,
    data: resultData,
  } = useRequest(api_log_getResultData, { manual: true });

  const columns: ProColumnType<API.ApiLogVO>[] = [
    {
      dataIndex: 'url',
      title: '请求地址',
      width: 250,
    }, {
      dataIndex: 'method',
      title: '请求方式',
      width: 80,
      valueType: 'select',
      valueEnum: {
        GET: { text: 'GET' },
        POST: { text: 'POST' },
        DELETE: { text: 'DELETE' },
        PUT: { text: 'PUT' },
      },
    }, {
      dataIndex: 'success',
      title: '是否成功',
      width: 80,
      valueType: 'select',
      valueEnum: {
        0: { text: '失败' },
        1: { text: '成功' },
      },
      renderText: (value: boolean) => {
        return value ? (
          <Badge status='success' text='成功' />
        ) : (
          <Badge status='error' text='失败' />
        );
      }
    }, {
      dataIndex: 'startTime',
      title: '请求开始时间',
      width: 160,
      hideInSearch: true,
      renderText: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      dataIndex: 'startTimeRange',
      title: '请求开始时间范围',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      dataIndex: 'endTime',
      title: '请求结束时间',
      width: 160,
      hideInSearch: true,
      renderText: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      dataIndex: 'endTimeRange',
      title: '请求结束时间范围',
      width: 160,
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      dataIndex: 'duration',
      title: '耗时（毫秒）',
      width: 100,
      hideInSearch: true,
      align: 'right',
      renderText(text) {
        if (text >= 3000) {
          return (
            <span className='text-red-500'>{text}</span>
          )
        }
        if (text >= 1000) {
          return (
            <span className='text-yellow-300'>{text}</span>
          )
        }
        return text;
      },
    },
    {
      dataIndex: 'durationRange',
      title: '耗时（毫秒）',
      hideInTable: true,
      valueType: 'digitRange'
    },
    {
      dataIndex: 'ip',
      title: '请求ip',
      width: 120
    },
    {
      dataIndex: 'userName',
      title: '请求用户',
      search: false,
    },
    {
      dataIndex: 'errorType',
      title: '错误码',
      valueType: 'select',
      valueEnum: {
        400: { text: '400' },
        403: { text: '403' },
        500: { text: '500' },
        404: { text: '404' },
        422: { text: '422' },
      }
    },
    {
      dataIndex: 'errorMsg',
      title: '错误消息',
      ellipsis: true,
      search: false,
    },
    {
      dataIndex: 'query',
      title: '请求query参数',
      search: false,
      renderText: (_, record) => (
        <LinkButton onClick={() => viewQuery(record.id)}>查看</LinkButton>
      )
    },
    {
      dataIndex: 'body',
      title: '请求body参数',
      search: false,
      renderText: (_, record) => (
        <LinkButton onClick={() => viewBody(record.id)}>查看</LinkButton>
      )
    },
    {
      dataIndex: 'result',
      title: '响应结果',
      search: false,
      renderText: (_, record) => (
        <LinkButton onClick={() => viewResult(record.id)}>查看</LinkButton>
      )
    }
  ];

  function viewBody(id?: string) {
    if (!id) return;
    setOpen(true);
    setViewType('body');
    getBodyData({ id });
  }

  function viewQuery(id?: string) {
    if (!id) return;
    setOpen(true);
    setViewType('query');
    getQueryData({ id });
  }


  function viewResult(id?: string) {
    if (!id) return;
    setOpen(true);
    setViewType('result');
    getResultData({ id });
  }

  const formatJson = (json?: string) => {
    if (!json) return '';
    return JSON.stringify(JSON.parse(json), null, 2);
  }

  return (
    <>
      <FProTable<API.ApiLogVO>
        columns={columns}
        request={async (params) => {
          const { startTimeRange, endTimeRange, durationRange } = params;

          params.startTimeRange = undefined;
          params.endTimeRange = undefined;
          params.durationRange = undefined;

          return api_log_page(
            toPageRequestParams<API.ApiLogPageDTO>({
              ...params,
              startTimeStart: startTimeRange?.[0],
              startTimeEnd: startTimeRange?.[1],
              endTimeStart: endTimeRange?.[0],
              endTimeEnd: endTimeRange?.[1],
              durationStart: durationRange?.[0],
              durationEnd: durationRange?.[1],
            })
          )
        }}
      />
      <Modal
        title={viewType === 'body' ? '请求body参数' : viewType === 'query' ? '请求query参数' : '响应结果'}
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <Spin spinning={getBodyDataLoading || getQueryDataLoading || getResultDataLoading}>
          <Input.TextArea
            rows={20}
            value={formatJson(viewType === 'body' ? bodyData?.body : viewType === 'query' ? queryData?.query : resultData?.result)}
          />
        </Spin>
      </Modal>
    </>
  );
}

export default ApiLogPage;
