import * as React from 'react';
import styled from 'styled-components';
import { getSpacingPreset } from '@app/styles/theme/spacing';
import { FC } from 'react';
import HeroLayout from '@app/components/HeroLayout/HeroLayout';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${getSpacingPreset('height-header')};
  min-height: calc(100vh - ${getSpacingPreset('height-header')});
`;

const Demo: FC = () => (
  <Wrapper>
    <HeroLayout leftSection={<div>left</div>} rightSection={<div>right</div>} />
  </Wrapper>
);

export default Demo;
