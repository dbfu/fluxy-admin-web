import { Button, Space } from 'antd';
import { useState } from 'react';
import NewPageModal from '../../../../../pages/low-code/page/new/new-page-modal';
import { useComponentsStore } from '../../stores/components';
import { usePageDataStore } from '../../stores/page-data';
import ComponentTree from './component-tree';
import DefineVariable from './define-variable';

const Header: React.FC<{ extra?: React.ReactNode, title: string }> = ({
  extra,
  title,
}) => {

  const { mode, setMode, setCurComponentId } = useComponentsStore();
  const { resetData } = usePageDataStore();

  const [componentTreeVisible, setComponentTreeVisible] = useState(false);
  const [variableVisible, setVariableVisible] = useState(false);

  const [newPageVisible, setNewPageVisible] = useState(false);

  return (
    <div className='w-[100%] h-[100%]'>
      <div className='flex justify-between px-[24px] items-center h-[100%] border-solid border-0 border-b-[1px] border-[#cfcfcf] dark:border-[rgba(189,200,240,.1)]'>
        <div className='flex-1 flex gap-[20px] items-center'>
          <div className='text-[18px]'>{title}</div>
        </div>
        <Space className='flex-1 flex justify-end'>
          {mode === 'edit' && (
            <>
              <Button
                onClick={() => {
                  setComponentTreeVisible(true);
                }}
                type='primary'
              >
                查看大纲
              </Button>
              <Button
                onClick={() => {
                  setVariableVisible(true);
                }}
                type='primary'
              >
                定义变量
              </Button>
              <Button
                onClick={() => {
                  setMode('preview');
                  setCurComponentId(null);
                  resetData();
                }}
                type='primary'
              >
                预览
              </Button>
              {extra}
            </>
          )}
          {mode === 'preview' && (
            <Button
              onClick={() => { setMode('edit') }}
              type='primary'
            >
              退出预览
            </Button>
          )}
        </Space>
      </div>
      <ComponentTree
        open={componentTreeVisible}
        onCancel={() => { setComponentTreeVisible(false) }}
      />
      <DefineVariable
        open={variableVisible}
        onCancel={() => {
          setVariableVisible(false);
        }}
      />
      <NewPageModal
        open={newPageVisible}
        setOpen={setNewPageVisible}
      />
    </div>
  )
}

export default Header;