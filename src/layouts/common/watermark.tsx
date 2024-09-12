import { useSelector } from '@/hooks/use-selector';
import { useSettingStore } from '@/stores/setting';
import { useUserStore } from '@/stores/user';
import { Watermark as AntdWatermark } from 'antd';


export default function Watermark({ children, type }: {
  children: React.ReactNode,
  type: 'full' | 'content',
}) {

  const { currentUser } = useUserStore(
    useSelector('currentUser')
  );

  const { showWatermark, watermarkPos } = useSettingStore(
    useSelector([
      'showWatermark',
      'watermarkPos'
    ])
  )

  

  return (
    <AntdWatermark
      height={!showWatermark || watermarkPos !== type ? 0 : undefined}
      content={currentUser?.userName}
    >
      {children}
    </AntdWatermark>
  )
}