import styled from 'styled-components';

import { media } from '@app/styles/media';
import { getSpacingPreset } from '@app/styles/theme/spacing';

export default styled.div`
  padding: 0 24px;
  margin: 0 auto;
  max-width: ${getSpacingPreset('max-content-width')};
  box-sizing: content-box;

  ${media.md`
    padding: 0 20px;
  `}
  ${media.sm`
    padding: 0 32px;
  `}

  > * {
    box-sizing: border-box;
  }
`;
