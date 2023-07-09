import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Test = () => {

  const navigate = useNavigate();


  return (
    <Space direction='vertical' className='p-[20px]'>
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