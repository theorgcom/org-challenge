/* eslint-disable import/prefer-default-export */
enum Spacing {
  'max-content-width' = 1136,
  'height-header' = 64,
  'height-breadcrumbs' = 56,
  'height-footer' = 240,
  'height-footer-tablet' = 190,
  'padding-bottom-layout' = 50,
  'section-spacer' = 100,
  'sp-4' = 24,
}

export const getSpacingPreset = (spaceing: keyof typeof Spacing): string =>
  `${Spacing[spaceing]}px`;

export const calculate = (multiplier?: number): string =>
  typeof multiplier === 'number' || multiplier ? `${multiplier * 8}px` : '';

export const getSpacing = (
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
): string =>
  `${calculate(top)} ${calculate(right)} ${calculate(bottom)} ${calculate(
    left,
  )}`.trim();
