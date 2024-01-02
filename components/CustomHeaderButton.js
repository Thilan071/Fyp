// CustomHeaderButton.js
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color="white" // Change the color as needed
    />
  );
};

export default CustomHeaderButton;
