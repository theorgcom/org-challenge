export enum Font {
  primary = "'Basis Grotesque Pro', 'HelveticaNeue', sans-serif",
  secondary = "'DM Serif Text', 'Georgia', serif",
}

export enum FontSize {
  fs1 = 12,
  fs15 = 13,
  fs2 = 14,
  fs25 = 15,
  fs3 = 16,
  fs4 = 18,
  fs45 = 20,
  fs5 = 22,
  fs6 = 24,
  fs65 = 26,
  fs7 = 28,
  fs8 = 32,
  fs9 = 36,
  fs10 = 40,
  fs105 = 44,
  fs11 = 50,
  fs12 = 60,
  fs125 = 66,
  fs13 = 68,
  fs14 = 76,
}

export enum LineHeight {
  lh1 = 1,
  lh2 = 1.25,
  lh3 = 1.5,
  lh4 = 1.54,
}

export const getFont = (key: keyof typeof Font): Font => Font[key];
export const getFontSize = (key: keyof typeof FontSize): string =>
  `${FontSize[key]}px`;
export const getLineHeight = (key: keyof typeof LineHeight): LineHeight =>
  LineHeight[key];
