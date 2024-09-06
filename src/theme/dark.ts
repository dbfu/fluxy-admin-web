import { defaultSetting } from '@/default-setting';
import { theme, type ThemeConfig } from 'antd';
import tinycolor from "tinycolor2";

export function generateDarkTheme(primaryColor: string): ThemeConfig {
  return {
    algorithm: theme.darkAlgorithm,
    cssVar: true,
    token: {
      colorPrimary: primaryColor,
      colorBgContainer: 'rgb(26, 34, 63)',
      colorBgElevated: 'rgb(26, 34, 63)',
      colorBorder: 'rgba(189, 200, 240, 0.157)',
      colorBorderSecondary: 'rgba(189, 200, 240, 0.157)',
      colorBgTextHover: tinycolor(primaryColor).setAlpha(0.09).toRgbString(),
      controlItemBgActive: tinycolor(primaryColor).setAlpha(0.2).toRgbString(),
      controlItemBgActiveHover: tinycolor(primaryColor).setAlpha(0.25).toRgbString(),
      controlItemBgHover: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
      colorLink: primaryColor,
      colorBgLayout: 'rgb(17, 25, 54)',
    },
    components: {
      Table: {
        headerBg: 'rgb(35, 43, 71)',
        borderColor: 'rgba(189, 200, 240, 0.157)',
      },
      Menu: {
        iconSize: 18,
        collapsedIconSize: 18,
        itemHeight: 50,
        collapsedWidth: defaultSetting.collapsedSlideWidth - 32,
        darkItemSelectedBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        darkItemHoverBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        itemActiveBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        darkItemSelectedColor: primaryColor,
        darkItemHoverColor: primaryColor,
        darkSubMenuItemBg: 'rgba(0, 0, 0, 0)',
        darkItemColor: 'rgb(255, 255, 255)',
        darkPopupBg: 'rgb(26, 34, 63)',
      }
    }
  }
}