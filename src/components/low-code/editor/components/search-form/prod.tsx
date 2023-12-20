import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { useMemo } from 'react';
import { CommonComponentProps } from '../../interface';

function SearchForm({ children, onSearch }: CommonComponentProps) {

  const [form] = Form.useForm();


  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
      }
    });
  }, [children]);

  const search = (values: any) => {
    console.log(values);

    onSearch && onSearch(values);
  }


  return (
    <div className='w-[100%]'>
      <Form form={form} onFinish={search}>
        <Row gutter={20}>
          {searchItems.map((item: any) => {
            return (
              <Col span={6} key={item.name}>
                <Form.Item data-component-id={item.id} name={item.name} label={item.label} >
                  <Input />
                </Form.Item>
              </Col>
            )
          })}
          <Col span={6}>
            <Space>
              <Button onClick={() => { form.submit(); }} type='primary'>搜索</Button>
              <Button onClick={() => { form.resetFields(); form.submit(); }}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchForm;