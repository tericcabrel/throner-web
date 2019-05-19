import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import {changeAppStatus, checkStatusRequest} from "../../store/app/actions";
import {CHECK_STATUS_KEY} from "../../constants";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.timerStatus = null;
  }

  getBatteryStatus = (batteryPercent) => {
    const icons = [
      'fa-battery-empty', 'fa-battery-quarter', 'fa-battery-half', 'fa-battery-three-quarters', 'fa-battery-full'
    ];
    let color = '#ff0000';
    let batteryIcon = icons[0];

    if (batteryPercent <= 10) {
      color = '#ff0000';
      batteryIcon = icons[0];
    } else if (batteryPercent > 10 && batteryPercent <= 40) {
      color = 'orange';
      batteryIcon = icons[1];
    } else if (batteryPercent > 40 && batteryPercent <= 70) {
      color = '#0000ff';
      batteryIcon = icons[2];
    } else if (batteryPercent > 70 && batteryPercent <= 90) {
      color = '#0000ff';
      batteryIcon = icons[3];
    } else if (batteryPercent > 90) {
      color = 'green';
      batteryIcon = icons[4];
    }

    return { color, batteryIcon };
  };

  componentWillMount() {
    if (process.env.REACT_APP_CHECK_STATUS === 'TRUE') {
      const $this = this;
      const checkInterval = process.env.REACT_APP_CHECK_INTERVAL || 20;
      this.props.checkStatusRequest();

      this.timerStatus = setInterval(() => {
        $this.props.checkStatusRequest();
        localStorage.setItem(CHECK_STATUS_KEY, 'ST');

        let timeOutCounter = 0;
        const timer = setInterval(() => {
          timeOutCounter++;
          const status = localStorage.getItem(CHECK_STATUS_KEY);
          if (!status) {
            clearInterval(timer);
          }

          if (timeOutCounter >= 20) {
            $this.props.changeAppStatus({status: 'off', battery: 0});
            clearInterval(timer);
          }
        }, 500);
      }, checkInterval * 1000);
    }
  }

  componentWillUnmount() {
    if (this.timerStatus !== null) {
      clearInterval(this.timerStatus);
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, status, battery, ...attributes } = this.props;
    const result = this.getBatteryStatus(battery);

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <div className="app-status">
            <div className={`status ${status === 'on' ? 'connected' : 'not-connected'}`}>
              <div className="status-point"/>
              <div className="status-text">{ status === 'on' ? 'connected' : 'not connected' }</div>
            </div>
            <div className="battery-status" style={{ color: result.color}}>
              <span className={`fa ${result.batteryIcon}`} style={{ color: result.color}}/> {battery}%
            </div>
          </div>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = ({ auth, app }) => ({
  status: app.status,
  battery: app.battery,
});

const mapDispatchToProps = dispatch => ({
  checkStatusRequest: () => dispatch(checkStatusRequest()),
  changeAppStatus: (data) => dispatch(changeAppStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
