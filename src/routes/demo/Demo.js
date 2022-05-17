import * as React from 'react';
import styled from 'styled-components';
import { getSpacingPreset } from '@app/styles/theme/spacing';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${getSpacingPreset('height-header')};
  min-height: calc(100vh - ${getSpacingPreset('height-header')});
`;

const Demo = () => (
  <Wrapper>
    <section>{/* ... */}</section>
  </Wrapper>
);

export default Demo;
