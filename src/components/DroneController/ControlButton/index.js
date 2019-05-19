import React from 'react';

import { DIRECTION_MAPPINGS } from "../../../constants";

import './styles.css';

const ControlButton = ({ action, direction, icon }) => {
  return (
    <button className={`button control_button control_button-${DIRECTION_MAPPINGS[direction]}`} onClick={action.bind(null, direction)}>
      <i className={`fa ${icon}`} aria-hidden="true" />
    </button>
  )
};

export default ControlButton;
