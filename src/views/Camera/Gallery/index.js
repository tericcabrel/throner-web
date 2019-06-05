import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { getCameraGallery, deletePicture, deleteAllPictures } from "../../../store/app/actions";

import CardPicture from '../../../components/CardPicture';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      pictureItem: null,
      confirmModal: false,
      deleteType: 'one'
    };
  }

  async componentDidMount() {
    await this.props.getPictures();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  confirmDeletePictureHandler = (item, type) => {
    this.setState({ pictureItem: item }, () => {
      this.setState({ confirmModal: true, deleteType: type });
    });
  };

  viewPictureHandler = (item) => {
    this.setState({ pictureItem: item }, () => {
      this.toggleModal();
    });
  };

  cancelPictureDeletion = () => {
    this.setState({ pictureItem: null, confirmModal: false });
  };

  deletePictureHandler = async () => {
    const { pictureItem } = this.state;

    if (pictureItem) {
      await this.props.deletePicture(pictureItem._id);
      this.setState({ pictureItem: null, confirmModal: false });
      await this.props.getPictures();
    }
  };

  deleteAllPictureHandler = async () => {
    this.setState({ pictureItem: null, confirmModal: false });
    await this.props.deleteAllPictures();
    await this.props.getPictures();
  };

  render() {
    const { gallery } = this.props;
    const { modal, pictureItem, confirmModal, deleteType } = this.state;
    const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;
    const confirmCloseBtn = <button className="close" onClick={this.cancelPictureDeletion}>&times;</button>;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            <div className="gallery-header">
              <div className="pictures-count">
                {gallery.length} Picture{gallery.length > 9 ? 's' : ''}
              </div>
              <div>
                <Button color="danger" onClick={ () => this.confirmDeletePictureHandler(null, 'all') }>
                  <i className="fa fa-remove"/>{' '}
                  Delete all
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {
            gallery.map(item => (
              <CardPicture
                key={item._id}
                data={item}
                onView={() => this.viewPictureHandler(item)}
                onDelete={() => this.confirmDeletePictureHandler(item, 'one')}
              />
            ))
          }
        </Row>

        <Modal isOpen={modal} toggle={this.toggleModal} className="modal-view-picture">
          <ModalHeader toggle={this.toggleModal} close={closeBtn}>View picture</ModalHeader>
          <ModalBody>
            { pictureItem && <img src={pictureItem.name} alt="Gallery"/> }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={confirmModal} toggle={this.cancelPictureDeletion} className="modal-confirm-picture">
          <ModalHeader
            toggle={this.cancelPictureDeletion}
            close={confirmCloseBtn}
          >
            Delete { deleteType === 'one' ? 'picture' : 'all pictures'}
          </ModalHeader>
          <ModalBody>
            You really want to delete
            {
              deleteType === 'one' ? ' this picture ?' : 'all these pictures'
            }
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={ deleteType === 'one' ? this.deletePictureHandler : this.deleteAllPictureHandler }
            >
              Delete
            </Button>
            <Button
              color="secondary"
              onClick={this.cancelPictureDeletion}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, app }) => ({
  gallery: app.gallery,
});

const mapDispatchToProps = dispatch => ({
  getPictures: () => dispatch(getCameraGallery()),
  deletePicture: (id) => dispatch(deletePicture(id)),
  deleteAllPictures: () => dispatch(deleteAllPictures()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
