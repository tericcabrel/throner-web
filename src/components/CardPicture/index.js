import React from 'react';
import { Card, CardBody, CardFooter, Col, Button } from 'reactstrap';

import { readableHumanSize } from '../../utils/helpers';

const cardPicture = ({ onView, onDelete, data }) => (
  <Col xs="12" sm="4" className="card-picture-container">
    <Card className="card-picture">
      <CardBody className="card-picture-body">
        <img src={data.name} alt="Gallery" className="card-picture-item" onClick={onView}/>
      </CardBody>
      <CardFooter className="card-picture-footer">
          <div className="size">{readableHumanSize(data.size, 1)}</div>
          <Button size="sm" color="danger" onClick={onDelete} >
            <i className="fa fa-remove"/>
          </Button>
      </CardFooter>
    </Card>
  </Col>
);

export default cardPicture;
