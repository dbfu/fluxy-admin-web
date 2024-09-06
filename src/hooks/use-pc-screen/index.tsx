import { useResponsive } from 'ahooks';



export const usePCScreen = () => {
  const responsive = useResponsive();
  return responsive.lg;
}