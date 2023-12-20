import { Button as AntdButton } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CommonComponentProps } from '../../interface';


const Button = (props: CommonComponentProps, ref: any) => {

  const [loading, setLoading] = useState(false);

  // 暴露方法，父组件可以使用ref获取组件里暴露出去的方法
  useImperativeHandle(ref, () => {
    return {
      startLoading: () => {
        setLoading(true);
      },
      endLoading: () => {
        setLoading(false);
      },
    }
  }, []);


  return (
    <AntdButton loading={loading} {...props}>{props.text}</AntdButton>
  )
}

export default forwardRef(Button);