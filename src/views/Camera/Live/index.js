import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';

import {takePictureRequest} from "../../../store/app/actions";

class Live extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  takePicture = () => {
    this.props.takePicture({ action: 'take' });
  };

  render() {
    const streamURL = process.env.REACT_APP_STREAM_URL;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 8, offset: 0 }} id="camera-view">
            <iframe id="inlineFrameExample"
                      title="Inline Frame Example"
                      width="640"
                      height="480"
                      src={streamURL}/>
          </Col>
          <Col xs="12" md={{ size: 3, offset: 1 }} id="camera-control">
            <Button color="primary" className="btn-camera" onClick={() => this.takePicture()}>
              Take a picture
            </Button>
            <Button color="success" className="btn-camera">
              Start recording
            </Button>
            <Button color="danger" className="btn-camera">
              Stop recording
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, app }) => ({

});

const mapDispatchToProps = dispatch => ({
  takePicture: data => dispatch(takePictureRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Live);
