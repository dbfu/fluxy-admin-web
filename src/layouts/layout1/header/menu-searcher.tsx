import { antdIcons } from '@/assets/antd-icons';
import { IconFangdajing } from '@/assets/icons/fangdajing';
import { useSelector } from '@/hooks/use-selector';
import { MenuType } from '@/pages/menu/interface';
import { useUserStore } from '@/stores/user';
import { EnterOutlined } from '@ant-design/icons';
import { List, Select } from 'antd';
import { t } from 'i18next';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function MenuSearcher() {

  const { currentUser } = useUserStore(useSelector('currentUser'));

  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState(false);

  const menus = useMemo(() => {
    if (!currentUser?.flatMenus) return [];
    return currentUser.flatMenus.filter(
      o => o.type === MenuType.MENU && o.show
    )
  }, [currentUser])

  const dataSource = useMemo(() => {
    if (!currentUser || !searchValue) return [];
    return menus?.filter(
      o => o.name?.includes(searchValue)
    )
  }, [menus, searchValue])

  return (
    <Select
      className='w-[320px] shadow-none outline-none rounded-lg h-[50px] max-md:hidden'
      size="large"
      suffixIcon={(
        <IconFangdajing
          style={{
            color: '#697586',
            paddingRight: 8,
            fontSize: 20,
            pointerEvents: 'none'
          }}
        />
      )}
      filterOption={false}
      placeholder={`${t("jhqxJPbn" /* 搜索菜单 */)}...`}
      showSearch
      onSearch={setSearchValue}
      open={open}
      onDropdownVisibleChange={setOpen}
      dropdownRender={() => {
        return (
          <List
            size="small"
            dataSource={dataSource}
            renderItem={(item) =>
              <List.Item>
                <Link
                  onClick={() => {
                    setOpen(false)
                  }}
                  to={item.path || ''}
                  className='flex justify-between w-full'
                >
                  <div className='flex gap-2'>
                    {item.icon && React.createElement(antdIcons[item.icon])}
                    <div>{item.name}</div>
                  </div>
                  <EnterOutlined className='text-primary' />
                </Link>
              </List.Item>
            }
          />
        )
      }}
    />
  );
}

export default MenuSearcher;
