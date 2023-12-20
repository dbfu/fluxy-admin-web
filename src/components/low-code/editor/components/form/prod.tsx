import { Form as AntdForm, DatePicker, Input } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { CommonComponentProps } from '../../interface';
import dayjs from 'dayjs';


function Form({
  children,
  defaultValue,
  onFinish,
}: CommonComponentProps, ref: any) {

  const [form] = AntdForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      submit: () => {
        form.submit();
      }
    }
  }, [form]);

  useEffect(() => {

    if (defaultValue) {
      const data: any = {};
    React.Children.toArray(children).forEach((item: any) => {
      if (item.props.type === 'date') {
        data[item.props.name] = dayjs(defaultValue[item.props.name]);
      } else {
        data[item.props.name] = defaultValue[item.props.name];
      }
    });

    form.setFieldsValue(data);
    }

    
  }, [defaultValue]);

  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules,
      }
    });
  }, [children]);



  async function save(values: any) {

    Object.keys(values).forEach(key => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format('YYYY-MM-DD')
      }
    })

    onFinish(values);
  }

  return (
    <AntdForm name='form' labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} form={form} onFinish={save}>
      {searchItems.map((item: any) => {
        return (
          <AntdForm.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules === 'required' ? [{
              required: true,
              message: '不能为空'
            }] : []}
          >
            {item.type === 'input' && <Input />}
            {item.type === 'date' && <DatePicker />}
          </AntdForm.Item>
        )
      })}
    </AntdForm>
  );
}

export default forwardRef(Form);