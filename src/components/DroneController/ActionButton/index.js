import React from 'react';
import './styles.css';

const ActionButton = ({ action, label, disabled }) => (
  <button className="button action_button" disabled={disabled} onClick={action}>{label}</button>
);

export default ActionButton;
