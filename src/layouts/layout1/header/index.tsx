
import { defaultSetting } from '@/default-setting';
import { useGlobalStore } from '@/stores/global';
import HeaderTitle from './header-title';
import LangDropdown from './lang-dropdown';
import MenuSearcher from './menu-searcher';
import ThemeSwitcher from './theme-switcher';
import UserInfo from './user-info';

function Header() {

  const {
    darkMode,
    collapsed,
    setCollapsed,
    setDarkMode,
    setLang,
    lang,
  } = useGlobalStore();

  return (
    <div
      style={{ zIndex: 998, height: defaultSetting.headerHeight }}
      className="flex basis-[48px] items-center px-0 gap-[16px] fixed top-0 right-0 left-0 bg-[var(--ant-color-bg-layout)]"
    >
      <HeaderTitle collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className='flex items-center justify-between max-md:justify-end flex-1 pr-[24px]'>
        <MenuSearcher />
        <div className='flex gap-[16px] items-center'>
          <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
          <LangDropdown lang={lang} setLang={setLang} />
          <UserInfo darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default Header;