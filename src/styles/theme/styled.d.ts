import 'styled-components';
import { getColor } from './colors';
import { getSpacing } from './spacing';
import { getFont, getFontSize, getLineHeight } from './font';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: typeof getColor;
    spacing: typeof getSpacing;
    font: {
      type: typeof getFont;
      size: typeof getFontSize;
      lineHeight: typeof getLineHeight;
    };
  }

  export type ThemeContext = React.Context<DefaultTheme>;
}
