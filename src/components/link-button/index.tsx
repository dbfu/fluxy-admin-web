import { Button } from 'antd'
import { LinkButtonProps } from './interface'


function LinkButton({
  disabled,
  onClick,
  children
}: LinkButtonProps) {
  return (
    <Button
      type='link'
      onClick={onClick}
      disabled={disabled}
      className='p-0 h-auto text-[14px] select-none'
    >
      {children}
    </Button>
  )
}

export default LinkButton