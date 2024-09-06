import { ButtonProps } from 'antd';


export interface LinkButtonProps {
  children: string;
  disabled?: boolean;
  onClick?: ButtonProps['onClick'];
}