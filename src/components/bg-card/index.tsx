import { FC } from 'react';

interface Props {
  height?: number;
  children?: any;
  color?: string;
}

const BgCard: FC<Props> = ({
  height,
  children,
}) => {
  return (
    <div
      style={{ height }}
      className='dark:bg-[rgb(33,41,70)] overflow-hidden h-[184px] relative rounded-md box'
    >
      {children}
    </div>
  )
}

export default BgCard;