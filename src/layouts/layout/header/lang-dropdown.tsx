import { IconShuyi_fanyi36 } from '@/assets/icons/shuyi_fanyi-36';
import IconButton from '@/components/icon-button';
import { defaultSetting } from '@/default-setting';
import { i18n, t } from '@/utils/i18n';
import { Dropdown } from 'antd';

interface Props {
  lang: string;
  setLang: (lang: string) => void;
}

function LangDropdown({
  setLang,
  lang,
}: Props) {
  return (
    <Dropdown
      menu={{
        items: defaultSetting.languages.map(language => ({
          label: `${t(language.name)}`,
          key: language.key,
        })),
        onClick: async ({ key }) => {
          await i18n.changeLanguage(key);
          setLang(key);
        },
        selectedKeys: [lang]
      }}
      trigger={['click']}
      placement="bottom"
    >
      <div>
        <IconButton className='text-[20px]'>
          <IconShuyi_fanyi36 />
        </IconButton>
      </div>
    </Dropdown>
  );
}

export default LangDropdown;
