import { useDrop } from '../../hooks/use-drop';
import { CommonComponentProps } from '../../interface';

function Page({ children, _id, _name }: CommonComponentProps) {

  const { canDrop, drop } = useDrop(_id, _name);

  return (
    <div
      data-component-id={_id}
      className='p-[24px] h-[100%] box-border'
      style={{ border: canDrop ? '1px solid blue' : 'none' }}
      ref={drop}
    >
      {children}
    </div>
  )
}

export default Page;