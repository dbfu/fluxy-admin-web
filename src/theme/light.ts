import { type ThemeConfig } from 'antd';
import tinycolor from 'tinycolor2';

export function generateLightTheme(primaryColor: string): ThemeConfig {
  return {
    cssVar: true,
    token: {
      colorPrimary: primaryColor,
      colorLink: primaryColor,
      colorBgLayout: 'rgb(248, 248, 248)',
      colorBgTextHover: tinycolor(primaryColor).setAlpha(0.09).toRgbString(),
      controlItemBgActive: tinycolor(primaryColor).setAlpha(0.2).toRgbString(),
      controlItemBgActiveHover: tinycolor(primaryColor).setAlpha(0.25).toRgbString(),
      controlItemBgHover: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
    },
    components: {
      Table: {
        headerBg: 'rgb(247, 248, 250)'
      },
      Menu: {
        itemHeight: 50,
        iconSize: 18,
        collapsedIconSize: 18,
        itemColor: 'rgba(0, 0, 0, 0.88)',
        groupTitleColor: 'rgba(0, 0, 0, 0.88)',
        itemActiveBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        itemHoverBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        itemSelectedBg: tinycolor(primaryColor).setAlpha(0.1).toRgbString(),
        itemHoverColor: primaryColor,
        itemSelectedColor: primaryColor,
        subMenuItemBg: 'rgba(0, 0, 0, 0)',
      },
    }
  }
}