import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../interface';

const Button = ({ _id, type, text }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={_id} type={type}>{text}</AntdButton>
  )
}

export default (Button);