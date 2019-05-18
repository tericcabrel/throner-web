import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import moment from 'moment';

import { googleMapURL } from "../../../constants";
import {durationToHumanReadable, getDurationInSecond, round} from "../../../utils/helpers";

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const google = window.google;

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      const { session } = this.props;
      let origin = null;
      let destination = null;

      if ( session ) {
        const { positions } = session;

        console.log(positions);
        const length = positions.length;
        if (positions.length > 0) {
          origin = { lat: positions[length - 1].lat, lng: positions[length - 1].lon };
          destination = { lat: positions[0].lat, lng: positions[0].lon };
          this.setState({ positions, origin, destination });
        }
      }

      DirectionsService.route({
        origin: origin ? new google.maps.LatLng(origin.lat, origin.lng) : null,
        destination: destination ? new google.maps.LatLng(destination.lat, destination.lng) : null,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            origin: origin
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={ props.origin ? { lat: props.origin.lat, lng: props.origin.lng } : null }
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

const mapStateToProps = ({ app }) => ({
  session: app.session,
});

const MapWithADirectionsRendererWithRedux = connect(mapStateToProps, null)(MapWithADirectionsRenderer);

class Map extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      origin: null,
      destination: null,
      distance: 0,
      time: 0,
      speed: 0
    };
  }

  componentWillMount() {
    const { session } = this.props;
    if ( session ) {
      const { positions } = session;

      // console.log(positions);
      const length = positions.length;
      if (positions.length > 0) {
        const lastPosition = positions[length - 1];
        const firstPosition = positions[0];

        const origin = { lat: firstPosition.lat, lng: firstPosition.lon };
        const destination = { lat: lastPosition.lat, lng: lastPosition.lon };

        const duration = getDurationInSecond(moment(firstPosition.created_at), moment(lastPosition.created_at));
        const durationToString = durationToHumanReadable(duration);

        // console.log(origin);
        // console.log(destination);

        this.getDistance(origin, destination, (distance) => {
          const speed = round(distance / duration, 1);
          const dist = round(distance / 1000, 1);
          this.setState({ positions, origin, destination, time: durationToString, speed, distance: dist });
        });
      }
    }
  }

  getDistance = (origin, destination, callback) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status) {
      if (status !== 'OK') {
        console.log('Error was: ' + status);
      } else {
        // console.log(response);
        callback(response.rows[0].elements[0].distance.value);
      }
    })
  };

  render() {
    const { time, distance, speed } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Suspense fallback={ this.loading() }>
            <Col xs="12" className="path-info">
              <div className="path-info-item">
                <span className="info-label">Distance: </span>
                <span className="info-value">{ distance }km</span>
              </div>
              <div className="path-info-item">
                <span className="info-label">Time: </span>
                <span className="info-value">{ time }</span>
              </div>
              <div className="path-info-item">
                <span className="info-label">Speed: </span>
                <span className="info-value">{ speed }m/s</span>
              </div>
            </Col>
            <Col xs="12" className="path-map">
              <MapWithADirectionsRendererWithRedux />
            </Col>
          </Suspense>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Map);
