import React from 'react';
import styled from 'styled-components';
import { getSpacingPreset } from '@app/styles/theme/spacing';
import { media } from '@app/styles/media';
import MaxWidthContainer from '@app/components/MaxWidthContainer/MaxWidthContainer';

import grumpyCatImageSrc from './grumpy.jpg';

const Wrapper = styled(MaxWidthContainer)`
  padding-top: ${getSpacingPreset('height-header')};
  min-height: calc(100vh - ${getSpacingPreset('height-header')});
  h1 {
    margin: ${props => props.theme.spacing(4, 0)};
  }

  img {
    width: 100%;
    ${media.sm`
      width: 500px;
    `}
  }
`;

export default () => (
  <Wrapper>
    <h1>Whoops — there&apos;s nothing here!</h1>
    <img alt="Angry cat for effect" src={grumpyCatImageSrc} />
  </Wrapper>
);
