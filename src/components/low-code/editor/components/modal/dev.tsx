import { useDrop } from '../../hooks/use-drop';
import { CommonComponentProps } from '../../interface';


function Modal({ _id, _name, children, title }: CommonComponentProps) {

  const { canDrop, drop } = useDrop(_id, _name);


  if (!children?.length) {
    return (
      <div data-component-id={_id} className='p-[10px]'>
        <h4>{title}</h4>
        <div
          ref={drop}
          className='p-[16px] flex justify-center'
          style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
        >
          暂无内容
        </div>
      </div>
    )
  }


  return (
    <div data-component-id={_id} className='p-[10px]'>
      <h4>{title}</h4>
      <div
        ref={drop}
        className='p-[16px]'
        style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;