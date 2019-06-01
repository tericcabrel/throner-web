import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';

import Loader from '../../components/Loader';
import Controller from '../../components/DroneController/Controller';

import { changeAppStatus, sendCommand } from "../../store/app/actions";
import { COMMAND_TYPE, COMMANDS, FLIGHT_STATUS } from "../../constants";

class DroneController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };

    this.turn = this.turn.bind(this);
    this.takeoffOrLand = this.takeoffOrLand.bind(this);
    this.move = this.move.bind(this);
    this.emergency = this.emergency.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  takeoffOrLand(e) {
    if (e) e.preventDefault();
    const { flightStatus } = this.props;

    console.log('takeoffOrLand()');
    // To remove later
    this.props.changeAppStatus({
      flightStatus: flightStatus === FLIGHT_STATUS.LANDED ? FLIGHT_STATUS.FLYING : FLIGHT_STATUS.LANDED
    });
    this.props.sendCommand({ type: COMMAND_TYPE.ACTION, action: COMMANDS.TAKE_OFF_LAND });
  }

  move(direction, e) {
    if (e) e.preventDefault();

    console.log('move()', direction);
    this.props.sendCommand({ type: COMMAND_TYPE.DIRECTION, action: direction });
  }

  turn(direction, e) {
    if (e) e.preventDefault();

    console.log('turn()', direction);
    this.props.sendCommand({ type: COMMAND_TYPE.DIRECTION, action: direction });
  }

  /* trim(e) {
    if (e) e.preventDefault();

    console.log('trim()');
    socket.emit('trim');
  } */

  emergency(e) {
    if (e) e.preventDefault();

    console.log('emergency()');
    this.props.changeAppStatus({ flightStatus: FLIGHT_STATUS.LANDED });
    this.props.sendCommand({ type: COMMAND_TYPE.DIRECTION, action: COMMANDS.EMERGENCY });
  }

  onKeydown(e) {
    if (e) e.preventDefault();
    switch (e.which) {
      case 38: // Up arrow
        this.move(COMMANDS.MOVE_FORWARD);
        break;
      case 40: // Down arrow
        this.move(COMMANDS.MOVE_BACKWARD);
        break;
      case 37: // Left arrow
        this.move(COMMANDS.MOVE_LEFT);
        break;
      case 39: // Right arrow
        this.move(COMMANDS.MOVE_RIGHT);
        break;
      case 87: // w
        this.turn(COMMANDS.TURN_UP);
        break;
      case 83: // s
        this.turn(COMMANDS.TURN_DOWN);
        break;
      case 65: // a
        this.turn(COMMANDS.TURN_LEFT);
        break;
      case 68: // d
        this.turn(COMMANDS.TURN_RIGHT);
        break;
      case 84: // t
        this.takeoffOrLand();
        break;
      /* case 70: // f
        this.trim();
        break; */
      case 27: // escape
        this.emergency();
        break;
      default:
        break;
    }
  }

  onSlideChange(e) {
    // console.log('Value => ', e);
    this.props.changeAppStatus({ thrust: e });
    //TODO send a socket request to update the thrust on pi
  }

  render() {
    const { battery, status, thrust, flightStatus } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Suspense fallback={ <Loader/> }>
            <Col xs="12">
              <Controller
                move={this.move}
                turn={this.turn}
                takeoffOrLand={this.takeoffOrLand}
                emergency={this.emergency}
                onSlideChange={this.onSlideChange}
                connected={status}
                batteryLevel={battery}
                flightStatus={flightStatus}
                thrustValue={thrust}
              />
            </Col>
          </Suspense>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, app }) => ({
  status: app.status,
  battery: app.battery,
  thrust: app.thrust,
  flightStatus: app.flightStatus,
});

const mapDispatchToProps = dispatch => ({
  sendCommand: (data) => dispatch(sendCommand(data)),
  changeAppStatus: (data) => dispatch(changeAppStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DroneController);
