import { ButtonProps } from 'antd';

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: ButtonProps['onClick'];
  className?: string;
}