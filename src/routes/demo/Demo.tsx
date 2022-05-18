import * as React from 'react';
import styled from 'styled-components';
import { getSpacingPreset } from '@app/styles/theme/spacing';
import { FC } from 'react';
import HeroSection from '@app/components/HeroSection/HeroSection';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${getSpacingPreset('height-header')};
  min-height: calc(100vh - ${getSpacingPreset('height-header')});
`;

const Demo: FC = () => (
  <Wrapper>
    <HeroSection leftContent={<div />} rightContent={<div />} />
  </Wrapper>
);

export default Demo;
