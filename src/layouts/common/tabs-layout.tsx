import { antdIcons } from '@/assets/antd-icons';
import DraggableTab from '@/components/draggable-tab';
import { defaultSetting } from '@/default-setting';
import { KeepAliveTab, useTabs } from '@/hooks/use-tabs';
import { router } from '@/router/router-utils';
import { t } from '@/utils/i18n';
import { arrayMove } from '@dnd-kit/sortable';
import { Dropdown } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import React, { useCallback, useMemo } from "react";
import { KeepAliveTabContext } from './tabs-context';

enum OperationType {
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSE_OTHER = 'close-other',
}

const TabsLayout: React.FC = () => {

  const {
    activeTabRoutePath,
    tabs = [],
    closeTab,
    refreshTab,
    closeOtherTab,
    setTabs,
  } = useTabs();

  const getIcon = (icon?: string): React.ReactElement | undefined => {
    return icon && antdIcons[icon] && React.createElement(antdIcons[icon]);
  }

  const menuItems: MenuItemType[] = useMemo(
    () => [
      {
        label: t ("slZKRXqL" /* 刷新 */),
        key: OperationType.REFRESH,
      },
      tabs.length <= 1 ? null : {
        label: t ("FplLzQwk" /* 关闭 */),
        key: OperationType.CLOSE,
      },
      tabs.length <= 1 ? null : {
        label: t ("JPlYJWgB" /* 关闭其他 */),
        key: OperationType.CLOSE_OTHER,
      },
    ].filter(o => o !== null) as MenuItemType[],
    [tabs]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuClick = useCallback(({ key, domEvent }: any, tab: KeepAliveTab) => {
    domEvent.stopPropagation();

    if (key === OperationType.REFRESH) {
      refreshTab(tab.routePath);
    } else if (key === OperationType.CLOSE) {
      closeTab(tab.routePath);
    } else if (key === OperationType.CLOSE_OTHER) {
      closeOtherTab(tab.routePath);
    }
  }, [closeOtherTab, closeTab, refreshTab]);

  const renderTabTitle = useCallback((tab: KeepAliveTab) => {
    return (
      <Dropdown
        menu={{
          items: menuItems,
          onClick: (e) => menuClick(e, tab),
        }}
        trigger={['contextMenu']}
        onOpenChange={open => {
          if (open) {
            router.navigate(tab.pathname);
          }
        }}
      >
        <div className='flex gap-[6px]' style={{ margin: '-12px 0', padding: '12px 0' }}>
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
            className='overflow-y-auto'
            style={{
              height: `calc(100vh - ${defaultSetting.headerHeight + 36}px)`,
            }}
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
        size="small"
        onDragEnd={({ activeIndex, overIndex }) => {
          setTabs(
            arrayMove(tabs, activeIndex as number, overIndex as number)
          );
        }}
      />
    </KeepAliveTabContext.Provider>
  )
}

export default TabsLayout;