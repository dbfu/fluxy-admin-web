import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();

  return (
    <Space direction='vertical' className='p-[20px]'>
      <Button type='primary' v-auth="menu-test:query">查询1 (权限码：menu-test:query)</Button>
      <Button type='primary' v-auth="menu-test:create">新建 (权限码：menu-test:create)</Button>
      <Button type='primary' v-auth="menu-test:edit">编辑 (权限码：menu-test:edit)</Button>
      <Button type='primary' danger v-auth="menu-test:delete">删除 (权限码：menu-test:delete)</Button>
      <a
        onClick={() => {
          navigate('/menu-test/menu-test2/menu-test-index/detail')
        }}
      >
        详情
      </a>
      <a
        onClick={() => {
          navigate('/menu-test/menu-test2/menu-test-index/detail/1')
        }}
      >
        详情，路由参数是1
      </a>
      <a
        onClick={() => {
          navigate('/menu-test/menu-test2/menu-test-index/detail/1?name=hello')
        }}
      >
        详情，query参数是?name=hello
      </a>
    </Space>
  )
}

export default Test;