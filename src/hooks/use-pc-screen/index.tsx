import { useMedia } from 'react-use';

export const usePCScreen = () => {
  const isPC = useMedia('(min-width: 1024px)');
  return isPC;
}