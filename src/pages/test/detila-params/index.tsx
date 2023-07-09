import { useParams, useSearchParams } from 'react-router-dom';

const DetailTest = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div className='p-[20px]'>
      我是详情页，路由参数是{params.id}，query参数是name={searchParams.get('name')}
    </div>
  )
}

export default DetailTest;