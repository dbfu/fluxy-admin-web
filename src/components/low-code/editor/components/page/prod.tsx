import { CommonComponentProps } from '../../interface';

function Page({ children }: CommonComponentProps) {
  return <div className='p-[24px]'>{children}</div>;
}

export default Page;