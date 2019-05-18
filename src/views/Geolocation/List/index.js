import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import { Col, Row, Table, Button } from 'reactstrap';

import moment from 'moment';

import {
  getSession, getSessions
} from "../../../store/app/actions";

class SessionList extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  async componentWillMount() {
    await this.props.getSessions();
  }

  viewSessionHandler = async (sessionId) => {
    await this.props.getSession(sessionId);

    if (this.props.session) {
      const path = '/geolocation/map';
      this.props.history.replace(path);
    }
  };

  render() {
    const { sessions } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Suspense fallback={ this.loading() }>
            <Col xs="12" sm={{ offset: 3, size: 6 }} lg={{ offset: 3, size: 6 }}>
              <Table className="app-table table-sessions">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                  sessions.map((session, i) => (
                    <tr key={i}>
                      <th scope="row">{ i + 1 }</th>
                      <td>{ session.name }</td>
                      <td>{ moment(session.created_at).format('YYYY-MM-DD HH:MM:SS') }</td>
                      <td>
                        <Button color="primary" size="sm" onClick={ () => { this.viewSessionHandler(session._id)}}>
                          <i className="fa fa-eye"/>
                        </Button>{ ' ' }
                        <Button color="danger"  size="sm">
                          <i className="fa fa-remove"/>
                        </Button>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
            </Col>
          </Suspense>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, app }) => ({
  sessions: app.sessions,
  session: app.session,
});

const mapDispatchToProps = dispatch => ({
  getSessions: () => dispatch(getSessions()),
  getSession: (id) => dispatch(getSession(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionList);
