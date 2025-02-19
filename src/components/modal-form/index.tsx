import { useSelector } from '@/hooks/use-selector';
import { useSettingStore } from '@/stores/setting';
import { clearFormValues } from '@/utils/utils';
import { DrawerForm, ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { useUpdateEffect } from 'ahooks';

function FModalForm<T = Record<string, any>, U = Record<string, any>>(props: ModalFormProps<T, U>) {

  const { showFormType } = useSettingStore(
    useSelector('showFormType')
  )

  useUpdateEffect(() => {
    if (!props.open && props.form) {
      clearFormValues(props.form);
    }
  }, [props.open])

  if (showFormType === 'drawer') {
    return <DrawerForm<T, U> {...props} />
  }

  return (
    <ModalForm<T, U> {...props} />
  )
}

export default FModalForm;