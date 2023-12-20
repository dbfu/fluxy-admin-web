import Layout from '@/components/low-code/editor/layouts';
import { KeepAliveTabContext } from '@/layouts/tabs-context';
import { Button } from 'antd';
import { useContext, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import NewPageModal from './new-page-modal';

const LowCodePageNew = () => {

  const [newPageOpen, setNewPageOpen] = useState(false);

  const navigate = useNavigate();
  const keepAliveTab = useContext(KeepAliveTabContext);

  const onBack = () => {
    // 因为打开当前页面会打开一个页签，后退的时候需要关闭这个页签
    keepAliveTab.closeTab();
    navigate('/low-code/page');
  }

  const onSave = () => {
    setNewPageOpen(true);
  }

  return (
    <div className='w-full bg-container h-full fixed top-0 bottom-0 z-1000 right-0 left-0 bg-white'>
      <DndProvider backend={HTML5Backend}>
        <Layout
          headerTitle='新建页面'
          headerExtra={(
            <>
              <Button onClick={onBack}>返回到列表</Button>
              <Button type='primary' onClick={onSave}>保存</Button>
            </>
          )}
        />
      </DndProvider>
      <NewPageModal open={newPageOpen} setOpen={setNewPageOpen} />
    </div>
  )
}

export default LowCodePageNew;