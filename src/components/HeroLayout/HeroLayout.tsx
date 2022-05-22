import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { HeroSection } from './style';

interface ILayoutProps {
  leftSection: any;
  rightSection: any;
}

const HeroLayout: FC<ILayoutProps> = ({ leftSection, rightSection }) => (
  <HeroSection>
    {leftSection}
    {rightSection}
  </HeroSection>
);

HeroLayout.propTypes = {
  leftSection: PropTypes.element,
  rightSection: PropTypes.element,
};

export default HeroLayout;
