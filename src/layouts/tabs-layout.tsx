import React, { useCallback, useMemo } from "react";
import { Dropdown } from 'antd';
import { antdIcons } from '@/assets/antd-icons';
import { KeepAliveTab, useTabs } from '@/hooks/use-tabs';
import { router } from '@/router';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { KeepAliveTabContext } from './tabs-context';
import DraggableTab from '@/components/draggable-tab';

enum OperationType {
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHER = 'close-other',
}

const TabsLayout: React.FC = () => {

  const { activeTabRoutePath, tabs, closeTab, refreshTab, closeOtherTab } = useTabs();

  const getIcon = (icon?: string): React.ReactElement | undefined => {
    return icon && antdIcons[icon] && React.createElement(antdIcons[icon]);
  }

  const menuItems: MenuItemType[] = useMemo(
    () => [
      {
        label: '刷新',
        key: OperationType.REFRESH,
      },
      tabs.length <= 1 ? null : {
        label: '关闭',
        key: OperationType.CLOSE,
      },
      tabs.length <= 1 ? null : {
        label: '关闭其他',
        key: OperationType.CLOSEOTHER,
      },
    ].filter(o => o !== null) as MenuItemType[],
    [tabs]
  );

  const menuClick = useCallback(({ key, domEvent }: any, tab: KeepAliveTab) => {
    domEvent.stopPropagation();

    if (key === OperationType.REFRESH) {
      refreshTab(tab.routePath);
    } else if (key === OperationType.CLOSE) {
      closeTab(tab.routePath);
    } else if (key === OperationType.CLOSEOTHER) {
      closeOtherTab(tab.routePath);
    }
  }, [closeOtherTab, closeTab, refreshTab]);

  const renderTabTitle = useCallback((tab: KeepAliveTab) => {
    return (
      <Dropdown
        menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
        trigger={['contextMenu']}
      >
        <div style={{ margin: '-12px 0', padding: '12px 0' }}>
          {getIcon(tab.icon)}
          {tab.title}
        </div>
      </Dropdown>
    )
  }, [menuItems]);

  const tabItems = useMemo(() => {
    return tabs.map(tab => {
      return {
        key: tab.routePath,
        label: renderTabTitle(tab),
        children: (
          <div
            key={tab.key}
            className='px-[16px]'
          >
            {tab.children}
          </div>
        ),
        closable: tabs.length > 1, // 剩最后一个就不能删除了
      }
    })
  }, [tabs]);


  const onTabsChange = useCallback((tabRoutePath: string) => {
    router.navigate(tabRoutePath);
  }, []);

  const onTabEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove') {
      closeTab(targetKey as string);
    }
  };

  const keepAliveContextValue = useMemo(
    () => ({
      closeTab,
      closeOtherTab,
      refreshTab,
    }),
    [closeTab, closeOtherTab, refreshTab]
  );

  return (
    <KeepAliveTabContext.Provider value={keepAliveContextValue}>
      <DraggableTab
        activeKey={activeTabRoutePath}
        items={tabItems}
        type="editable-card"
        onChange={onTabsChange}
        hideAdd
        onEdit={onTabEdit}
      />
    </KeepAliveTabContext.Provider>
  )
}

export default TabsLayout;