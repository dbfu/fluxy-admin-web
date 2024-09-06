import { useSelector } from '@/hooks/use-selector';
import { useSettingStore } from '@/stores/setting';
import { ProTable, ProTableProps } from '@ant-design/pro-components';

function FProTable<T extends Record<string, any>, U extends Record<string, any> = any>(
  props: ProTableProps<T, U>
) {

  const { filterType } = useSettingStore(
    useSelector('filterType')
  )

  return (
    <ProTable<T, U>
      {...props}
      search={props.search !== false ? {
        ...props.search,
        filterType,
      } : false}
      rowKey={props.rowKey || "id"}
      pagination={{ defaultPageSize: 10 }}
    />
  )
}

export default FProTable;