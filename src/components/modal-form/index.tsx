import { useSelector } from '@/hooks/use-selector';
import { useSettingStore } from '@/stores/setting';
import { DrawerForm, ModalForm, ModalFormProps } from '@ant-design/pro-components';

function FModalForm<T = Record<string, any>, U = Record<string, any>>(props: ModalFormProps<T, U>) {

  const { showFormType } = useSettingStore(
    useSelector('showFormType')
  )

  if (showFormType === 'drawer') {
    return <DrawerForm<T, U> {...props} />
  }

  return (
    <ModalForm<T, U> {...props} />
  )
}

export default FModalForm;