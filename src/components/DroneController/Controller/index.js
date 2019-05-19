import React from 'react';
import Slider from 'rc-slider';

import Drone from '../Drone';
import Battery from '../Battery';
import ControlButton from '../ControlButton';
import ActionButton from '../ActionButton';

import { COMMANDS, FLIGHT_STATUS } from "../../../constants";
import { formatNumber } from "../../../utils/helpers";

import 'rc-slider/assets/index.css';
import './styles.css';

const Controller = ({
          move, turn, takeoffOrLand, emergency, onSlideChange, connected, batteryLevel, flightStatus, thrustValue
}) => {
  let takeOffOrLandText = 'Take-Off';
  if (flightStatus !== FLIGHT_STATUS.LANDED) {
    takeOffOrLandText = 'Land';
  }
  return (
    <div className="drone-controller">
      <div className="joypad">
        <div className="control-slider">
          <Slider
            vertical={true}
            min={0}
            max={100}
            value={thrustValue}
            onChange={onSlideChange}
          />
          <div className="control-slider-value">{ formatNumber(thrustValue) }</div>
        </div>
        {/* <ControlButton action={turn} direction={COMMANDS.TURN_UP} icon="fa-arrow-up" /> */}
        <ControlButton action={turn} direction={COMMANDS.TURN_RIGHT} icon="fa-repeat" />
        {/* <ControlButton action={turn} direction={COMMANDS.TURN_DOWN} icon="fa-arrow-down" /> */}
        <ControlButton action={turn} direction={COMMANDS.TURN_LEFT} icon="fa-undo" />
      </div>
      <div className="joypad-mid">
        <Drone connected={connected} flightStatus={flightStatus} />
        <Battery percent={batteryLevel} />
        <div>
          <ActionButton
            action={takeoffOrLand}
            label={takeOffOrLandText}
            disabled={ flightStatus === FLIGHT_STATUS.FLYING}
          />
          <ActionButton
            action={emergency}
            label="Stop"
            disabled={ flightStatus === FLIGHT_STATUS.LANDED}
          />
        </div>
      </div>
      <div className="joypad">
        <ControlButton action={move} direction={COMMANDS.MOVE_FORWARD} icon="fa-caret-up" />
        <ControlButton action={move} direction={COMMANDS.MOVE_RIGHT} icon="fa-caret-right" />
        <ControlButton action={move} direction={COMMANDS.MOVE_BACKWARD} icon="fa-caret-down" />
        <ControlButton action={move} direction={COMMANDS.MOVE_LEFT} icon="fa-caret-left" />
      </div>
    </div>
  );
};

export default Controller;
