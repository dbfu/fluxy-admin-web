import { Icon3 } from '@/assets/icons/3';
import { IconJiaretaiyang } from '@/assets/icons/jiaretaiyang';
import IconButton from '@/components/icon-button';

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

function ThemeSwitcher({
  darkMode,
  setDarkMode
}: Props) {
  return (
    <IconButton
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {!darkMode ? (
        <IconJiaretaiyang className='text-[20px]' />
      ) : (
        <Icon3 className='text-[20px]' />
      )}
    </IconButton>
  );
}

export default ThemeSwitcher;
