import React, {Component, Suspense} from 'react';
import {Col, Row} from 'reactstrap';

class Map extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Suspense fallback={ this.loading() }>
            <Col xs="12" sm="6" lg="3">
              GEOLOCATION
            </Col>
          </Suspense>
        </Row>
      </div>
    );
  }
}

export default Map;
