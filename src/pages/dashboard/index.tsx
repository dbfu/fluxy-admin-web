import { t } from '@/utils/i18n';
import { InfoCircleOutlined, CaretUpOutlined, DashOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Col, Divider, Dropdown, Row, Select, Tooltip } from 'antd';

import DemoTinyArea from './tiny-area';
import DemoTinyColumn from './tiny-column';
import DemoColumn from './column';
import DemoTinyLine from './tiny-line';

import './index.css'

const Dashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={24} xl={8} className='w-[100%]'>
          <div className='color-transition dark:bg-[rgb(33,41,70)] w-[100%] bg-[rgb(94,53,177)] overflow-hidden h-[241px] relative rounded-md bg-card p-[32px] box-border'>
            <div className='absolute top-[24px] right-[24px] z-10'>
              <Tooltip title={t("yAdJryjx" /* 指标说明 */)}>
                <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
              </Tooltip>
            </div>
            <div className="text-[rgba(229,224,216,0.45)] text-[16px]">
              {t("nKMAkrqJ" /* 总销售额 */)}
            </div>
            <div className="text-white text-2xl mt-[28px] text-[30px]">
              ¥ 126,560
            </div>
            <div className='mt-[50px] text-[rgba(229,224,216,0.85)] text-[16px] flex gap-[24px]'>
              <div className='flex items-center'>
                <span>{t("NpRFMJyD" /* 周同比 */)}</span>
                <span className='ml-[12px]'>12%</span>
                <CaretDownOutlined className='ml-[6px] text-red-500' />
              </div>
              <div className='flex items-center'>
                <span>{t("WOQnwYUS" /* 日同比 */)}</span>
                <span className='ml-[12px]'>12%</span>
                <CaretUpOutlined className='ml-[6px] text-green-500' />
              </div>
            </div>
            <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] opacity-[0.2] my-[16px]' />
            <div className='text-[rgba(229,224,216,0.85)] text-[16px]'>
              <span>
                {t("ZPCQOWAn" /* 日销售额 */)}
              </span>
              <span className='ml-[8px]'>
                ￥12,423
              </span>
            </div>
          </div>
        </Col>
        <Col lg={24} xl={8} className='w-[100%]'>
          <div className='color-transition dark:bg-[rgb(33,41,70)] bg-[rgb(30,136,229)] theme1 overflow-hidden h-[241px] relative rounded-md bg-card p-[32px] box-border'>
            <div className='absolute top-[24px] right-[24px] z-10'>
              <Tooltip title={t("iLyPEqwQ" /* 指标说明 */)}>
                <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
              </Tooltip>
            </div>
            <div className="text-[rgba(229,224,216,0.45)] text-[16px]">
              {t("ftuxZMpL" /* 访问量 */)}
            </div>
            <div className="text-white text-2xl mt-[20px] text-[30px]">
              8,930
            </div>
            <div className='mt-[20px] text-[rgba(229,224,216,0.85)] text-[16px] flex gap-[24px]'>
              <DemoTinyLine />
            </div>
            <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] opacity-[0.2] my-[16px]' />
            <div className='text-[rgba(229,224,216,0.85)] text-[16px]'>
              <span>
                {t("sehypRaO" /* 日访问量 */)}
              </span>
              <span className='ml-[8px]'>
                9,431
              </span>
            </div>
          </div>
        </Col>
        <Col lg={24} xl={8} className='w-[100%]'>
          <div className='color-transition dark:bg-[rgb(33,41,70)] bg-[rgb(94,53,177)] theme2 overflow-hidden h-[241px] relative rounded-md bg-card p-[32px] box-border'>
            <div className='absolute top-[24px] right-[24px] z-10'>
              <Tooltip title={t("sdOusITo" /* 指标说明 */)}>
                <InfoCircleOutlined className='text-[rgb(179,157,219)] text-[20px]' />
              </Tooltip>
            </div>
            <div className="text-[rgba(229,224,216,0.45)] text-[16px]">
              {t("PIYkoguj" /* 支付笔数 */)}
            </div>
            <div className="text-white text-2xl mt-[20px] text-[30px]">
              8,943
            </div>
            <div className='mt-[12px] text-[rgba(229,224,216,0.85)] text-[16px] flex gap-[24px]'>
              <DemoTinyColumn />
            </div>
            <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] opacity-[0.2] my-[16px]' />
            <div className='text-[rgba(229,224,216,0.85)] text-[16px]'>
              <span>
                {t("BUjwpMzX" /* 转化率 */)}
              </span>
              <span className='ml-[8px]'>
                2,421
              </span>
            </div>
          </div>
        </Col>
        <Col className='w-[100%]' lg={24} xl={16} >
          <div className='color-transition dark:bg-[rgb(33,41,70)] bg-white h-[550px] rounded-md p-[24px] relative'>
            <div className='flex justify-between items-center'>
              <div>
                <div className='text-[rgb(132,146,196)]'>{t("fHpiDHYH" /* 总增长 */)}</div>
                <div className='dark:text-white text-[rgb(18,25,38)] mt-[8px] text-[18px]'>￥12,423</div>
              </div>
              <Select
                options={[
                  {
                    label: t("yLkZTWbn" /* 今日 */),
                    value: 'today'
                  },
                  {
                    label: t("QFqMuZiD" /* 本月 */),
                    value: 'mouth'
                  },
                  {
                    label: t("lGOcGyrv" /* 本年 */),
                    value: 'year'
                  },
                ]}
                defaultValue="today"
                size="large"
                dropdownMatchSelectWidth={false}
                placement="bottomRight"
              />
            </div>
            <div className='mt-[50px] absolute bottom-[12px] w-[90%] box-border'>
              <DemoColumn />
            </div>
          </div>
        </Col>
        <Col className='w-[100%]' lg={24} xl={8}>
          <div className='color-transition dark:bg-[rgb(33,41,70)] bg-white h-[550px] rounded-md p-[24px] relative'>
            <div className='flex justify-between'>
              <span className='dark:text-[rgb(215,220,236)] text-[18px] text-[rgb(18,25,38)]'>{t("yzUIyMhr" /* 门店销售额 */)}</span>
              <Dropdown menu={{
                items: [
                  {
                    label: t("aSPCUBcK" /* 今日 */),
                    key: 'today'
                  },
                  {
                    label: t("EhTpnarX" /* 本月 */),
                    key: 'mouth'
                  },
                  {
                    label: t("AGGPEAdX" /* 本年 */),
                    key: 'year'
                  },
                ]
              }}>
                <span className='text-[rgb(144,202,249)] cursor-pointer'>
                  <DashOutlined />
                </span>
              </Dropdown>
            </div>
            <div className='dark:bg-[rgb(209,196,233)] bg-[rgb(237,231,246)] px-[16px] pt-[16px] mt-[24px] rounded-t-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-[rgb(101,31,255)] text-[16px]'>{t("jTSvVuJx" /* 上海分店 */)}</span>
                <span className='text-[rgb(66,66,66)]'>￥12,423</span>
              </div>
              <div className='mt-[10px] text-[rgb(66,66,66)]'>
                {t("SwsawJhB" /* 20% 利润 */)}
              </div>
            </div>
            <div className='dark:bg-[rgb(209,196,233)] bg-[rgb(237,231,246)] rounded-b-lg'>
              <DemoTinyArea />
            </div>
            <div className='py-[24px]'>
              <div>
                <div className='flex justify-between items-center'>
                  <span className='dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>{t("JYSgIJHD" /* 上海分店 */)}</span>
                  <div>
                    <span className='mr-[8px] dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>￥12,423</span>
                    <CaretUpOutlined className='text-[rgb(0,200,83)]' />
                  </div>
                </div>
                <div className='text-[rgb(0,200,83)] text-[12px] mt-[6px]'>
                  {t("yELACPnu" /* 20% 利润 */)}
                </div>
              </div>
              <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] dark:opacity-[0.2] my-[16px]' />
              <div>
                <div className='flex justify-between items-center'>
                  <span className='dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)]font-medium'>{t("WAiyAuwV" /* 合肥分店 */)}</span>
                  <div>
                    <span className='mr-[8px] dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>￥10,000</span>
                    <CaretUpOutlined className='text-[rgb(0,200,83)]' />
                  </div>
                </div>
                <div className='text-[rgb(0,200,83)] text-[12px] mt-[6px]'>
                  {t("HpNzGyBz" /* 6% 利润 */)}
                </div>
              </div>
              <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] dark:opacity-[0.2] my-[16px]' />
              <div>
                <div className='flex justify-between items-center'>
                  <span className='dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>{t("nGvTAQld" /* 北京分店 */)}</span>
                  <div>
                    <span className='mr-[8px] dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>￥8,000</span>
                    <CaretDownOutlined className='text-[rgb(216,67,21)] ' />
                  </div>
                </div>
                <div className='text-[rgb(216,67,21)] text-[12px] mt-[6px]'>
                  {t("EeunYupT" /* 8% 亏损 */)}
                </div>
              </div>
              <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] dark:opacity-[0.2] my-[16px]' />
              <div>
                <div className='flex justify-between items-center'>
                  <span className='dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>{t("usCBUdwp" /* 苏州分店 */)}</span>
                  <div>
                    <span className='mr-[8px] dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>￥9,423</span>
                    <CaretUpOutlined className='text-[rgb(0,200,83)]' />
                  </div>
                </div>
                <div className='text-[rgb(0,200,83)] text-[12px] mt-[6px]'>
                  {t("TacOGPiP" /* 14% 利润 */)}
                </div>
              </div>
              <Divider className='dark:bg-[rgb(189,200,240)] bg-[rgb(227,232,239)] dark:opacity-[0.2] my-[16px]' />
              <div>
                <div className='flex justify-between items-center'>
                  <span className='dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>{t("Imkllizi" /* 南京分店 */)}</span>
                  <div>
                    <span className='mr-[8px] dark:text-[rgb(189,200,240)] text-[rgb(54,65,82)] font-medium'>￥7,423</span>
                    <CaretDownOutlined className='text-[rgb(216,67,21)]' />
                  </div>
                </div>
                <div className='text-[rgb(0,200,83)] text-[12px] mt-[6px] text-[rgb(216,67,21)]'>
                  {t("MzCxBxLH" /* 6% 亏损 */)}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;