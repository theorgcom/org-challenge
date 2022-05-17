export enum Primary {
  's10' = '#f3f6fc',
  's20' = '#e7edf9',
  's40' = '#adb4fa',
  's100' = '#1e2ff1',
}

export enum Neutral {
  's0' = '#fff',
  's10' = '#f7f7f7',
  's20' = '#eaeaeb',
  's30' = '#d8d8d9',
  's40' = '#ceced0',
  's60' = '#b1b1b4',
  's70' = '#919195',
  's80' = '#707075',
  's90' = '#464649',
  's100' = '#0a0a0b',
}

export enum Utility {
  'error' = '#f6354d',
  'warning' = '#ffb818',
  'success' = '#009378',
  'brand' = '#000840',
}

export type Color = Primary | Neutral | Utility;

const getNeutral = (name: keyof typeof Neutral): Color => Neutral[name];

const getPrimary = (name: keyof typeof Primary): Color => Primary[name];

const getUtility = (name: keyof typeof Utility): Color => Utility[name];

export function getColor(colorType: 'neutral'): typeof getNeutral;
export function getColor(colorType: 'primary'): typeof getPrimary;
export function getColor(colorType: 'utility'): typeof getUtility;
// eslint-disable-next-line consistent-return
export function getColor(
  colorType: 'neutral' | 'primary' | 'utility' | 'deepDives',
):
  | typeof getNeutral
  | typeof getPrimary
  | typeof getUtility
  | typeof getDeepDives {
  // eslint-disable-next-line default-case
  switch (colorType) {
    case 'neutral':
      return getNeutral;
    case 'primary':
      return getPrimary;
    case 'utility':
      return getUtility;
    case 'deepDives':
      return getDeepDives;
  }
}
