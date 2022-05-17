import { css } from 'styled-components';

export enum Breakpoints {
  xs = 480,
  sm = 768,
  md = 992,
  lg = 1200,
}

export const media = Object.keys(Breakpoints).reduce((accumulator, label) => {
  const acc = { ...accumulator };

  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (min-width: ${Breakpoints[label]}px) {
      ${css(literals, ...placeholders)}
    }
  `;
  return acc;
}, {} as Record<keyof typeof Breakpoints, (l: TemplateStringsArray, ...p: any[]) => string>);
