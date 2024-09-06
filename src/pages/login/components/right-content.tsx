import { defaultSetting } from '@/default-setting';
import { Carousel } from 'antd';

const RightContent = () => {
  return (
    <div
      className='flex-[1.7] dark:bg-[rgb(33,41,70)] bg-white h-[100vh] relative max-md:hidden'
      style={{
        backgroundImage: 'url(/images/login-right-bg.svg)'
      }}
    >
      <div
        className='img1 w-[243px] h-[210px] bg-center absolute top-[23%] left-[37%]'
        style={{
          backgroundSize: 380,
          backgroundImage: 'url(/images/login-right-before.svg)'
        }}
      />
      <div
        className='img2 w-[313px] h-[280px] bg-center absolute top-[32%] left-[40%]'
        style={{
          backgroundSize: 380,
          backgroundImage: 'url(/images/login-right-after.svg)'
        }}
      />
      <div className='absolute left-[100px] right-[100px] bottom-[50px] h-[200px]'>
        <Carousel autoplay dots={{ className: 'custom' }}>
          <div>
            <div className='h-[160px] bg-transparent flex items-center justify-center'>
              <div>
                <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                  {defaultSetting.title}
                </h3>
                <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                  一个高颜值后台管理系统
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='h-[160px] bg-transparent flex items-center justify-center'>
              <div>
                <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                  {defaultSetting.title}
                </h3>
                <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px]'>
                  一个高颜值后台管理系统
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='h-[160px] bg-transparent flex items-center justify-center'>
              <div>
                <h3 className='dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]'>
                  {defaultSetting.title}
                </h3>
                <div className='dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] '>
                  一个高颜值后台管理系统
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RightContent;
