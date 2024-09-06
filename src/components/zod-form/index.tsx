/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import type { Rule } from 'antd/es/form';
import React, { useMemo } from 'react';
import z from 'zod';

import { isRequiredByFieldName } from './utils';

type Combine<T, U> = Omit<T, keyof U> & U;

function ZodForm<T extends z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>, K extends (values: z.infer<T>) => void>({
  zodSchema,
  onFinish,
  children,
  ...props
}: Combine<FormProps, {
  children?: React.ReactElement | React.ReactElement[],
  zodSchema?: T
  onFinish?: K,
}>) {

  const rule = useMemo(() => {
    if (zodSchema) {
      // 使用antd-zod库生成校验规则
      return createSchemaFieldRule(zodSchema);
    }
  }, [zodSchema])

  // 如果不传 zodSchema，则直接使用 antd 的 Form
  if (!zodSchema) {
    return (
      <Form
        {...props}
      >
        {children}
      </Form>
    )
  }


  function renderChildren() {
    return React.Children.map(children, (child) => {
      if (!child) {
        return child;
      }

      let name = child.props?.name;

      if (name && rule) {
        if (!Array.isArray(name)) {
          name = [child.props.name];
        }
        // 根据字段名，判断是否是必填
        const required = isRequiredByFieldName(name, zodSchema!);
        const rules: Rule[] = [rule];


        if (required) {
          rules.push({ required: true, message: '' });
        }

        return React.cloneElement(child as React.ReactElement, {
          rules,
        })
      }

      return child;
    })
  }

  return (
    <Form
      {...props}
      onFinish={onFinish}
    >
      {renderChildren()}
    </Form>
  )
}

export default ZodForm
