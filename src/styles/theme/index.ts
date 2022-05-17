import { DefaultTheme } from 'styled-components';
import { getColor } from './colors';
import { getFont, getFontSize, getLineHeight } from './font';
import { getSpacing } from './spacing';

const theme: DefaultTheme = {
  color: getColor,
  spacing: getSpacing,
  font: {
    type: getFont,
    size: getFontSize,
    lineHeight: getLineHeight,
  },
};

export default theme;
