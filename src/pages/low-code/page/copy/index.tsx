import Layout from '@/components/low-code/editor/layouts';
import { useComponentsStore } from '@/components/low-code/editor/stores/components';
import { useVariablesStore } from '@/components/low-code/editor/stores/variable';
import { KeepAliveTabContext } from '@/layouts/tabs-context';
import { antdUtils } from '@/utils/antd';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate, useParams } from 'react-router-dom';
import NewVersionModal from '../edit/new-version-modal';
import service from '../edit/service';
import NewPageModal from '../new/new-page-modal';

const LowCodePageCopy = () => {

  const navigate = useNavigate();
  const keepAliveTab = useContext(KeepAliveTabContext);
  const params = useParams<{ versionId: string }>();
  const { setComponents, components } = useComponentsStore();
  const [versionInfo, setVersionInfo] = useState<any>();
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [newVersionOpen, setNewVersionOpen] = useState(false);

  const { variables } = useVariablesStore();

  const getPageSetting = async () => {
    if (!params.versionId) return;

    const [error, data] = await service.queryVersionById(params.versionId);

    if (error) return;

    const { menu, version } = data;

    const pageConfig = await window.fetch(`/file/low-code/${menu.id}/${version}.json`)
      .then(res => res.json());

    if (!pageConfig.components) return;

    setVersionInfo(data);
    setComponents(pageConfig.components);
  }

  useEffect(() => {
    getPageSetting();
  }, []);

  const onBack = () => {
    // 因为打开当前页面会打开一个页签，后退的时候需要关闭这个页签
    keepAliveTab.closeTab();
    navigate('/low-code/page');
  }

  const menuClick = async ({ key }: any) => {
    if (key === 'update') {
      const pageSetting = JSON.stringify({ components, variables });
      const [error] = await service.updateVersion({ id: params.versionId, pageSetting });

      if (!error) {
        antdUtils.message?.success('更新成功');
      }
    } else if (key === 'version') {
      setNewVersionOpen(true);
    } else if (key === 'page') {
      setNewPageOpen(true);
    }

    console.log(key);
  }

  const menuProps = useMemo(() => {
    return {
      items: [{
        key: 'version',
        label: '保存为新版本',
      }, {
        key: 'page',
        label: '保存为新页面',
      }],
      onClick: menuClick,
    }
  }, [components, variables])


  return (
    <div className='w-full bg-container h-full fixed top-0 bottom-0 z-1000 right-0 left-0 bg-white'>
      <DndProvider backend={HTML5Backend}>
        <Layout
          headerTitle={`复制-${versionInfo?.menu?.name}.${versionInfo?.version}`}
          headerExtra={(
            <>
              <Button onClick={onBack}>返回到列表</Button>
              <Dropdown menu={menuProps}>
                <Button type='primary'>
                  <Space>
                    保存
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </>
          )}
        />
      </DndProvider>
      <NewPageModal
        open={newPageOpen}
        setOpen={setNewPageOpen}
      />
      <NewVersionModal versionInfo={versionInfo} open={newVersionOpen} setOpen={setNewVersionOpen} />
    </div>
  )
}

export default LowCodePageCopy;