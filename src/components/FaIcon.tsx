import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export function getFaIcon(icon: IconProp) {
  return (
    <FontAwesomeIcon icon={icon}/>
  )
}