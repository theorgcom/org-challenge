import React, { FC } from 'react';

import { HeroWrapper, LeftSection, RightSection } from './styles';

interface IHeroSection {
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
}

/**
 * @component
 * @param props.leftContent
 * @param props.rightContent
 */
const HeroSection: FC<IHeroSection> = ({ leftContent, rightContent }) => (
  <HeroWrapper>
    <LeftSection>{leftContent}</LeftSection>
    <RightSection>{rightContent}</RightSection>
  </HeroWrapper>
);

export default HeroSection;
