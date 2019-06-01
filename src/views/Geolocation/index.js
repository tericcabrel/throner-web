import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import SessionList from './List';
import Map from './Map';

class Geolocation extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/geolocation" name="Session list" component={SessionList} />
          <Route exact path="/geolocation/map" name="Map direction" component={Map} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Geolocation;
