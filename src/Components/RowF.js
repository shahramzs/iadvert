import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import b from '../img/business.svg'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import a from '../img/mac.jpg'
import c from '../img/per.jpg'
import { Modal } from 'react-bootstrap';
import Search from './Search'

class RowF extends Component {
    constructor(props){
        super(props);

        this.state = {
            show:false
        }

    }

    handleClosePopup = (e) => {
        this.setState({show:false}) 
      }

      showModal = (e) => {
          this.setState({show:true})
      }

    render() {
        return (
            <Row className="mb-lg-5 mt-lg-5 mobile-txt">
                        <Col md={6} className="section-left">
                            <img src={b} alt="business"/>
                        <h3 className="mb-4 text-black">Business owners in any field</h3>
                         <p className="mb-4">Advertising business costs a lot today. TV or even Internet advertising will be costly and ineffective without getting feedback from your customers. The Advert site provides a platform for all business owners in any field to easily advertise and promote their business in their city or even to people in different countries. You can help your business grow by placing your product catalog on the site, introducing your business and the services you provide.</p>
                        </Col>

                        <Col md={6} className="pl-lg-5 ml-auto mt-md-5 section-right mobile-all" data-aos="fade-left">
                            <div id="mobile"><span></span><span></span><span></span></div>
                        <div className="mobile-shadow">
                            <div className="mobile-wrap">
                                <div className="mobile-title">Advert</div>
                                <div className="mobile-titr">Free Business Advertising</div>
                                <div className="mobile-search"><Button variant="contained" color="primary" size="small" onClick={this.showModal}><SearchIcon font-size="small"/>search</Button></div>
                                <div className="mobile-ads">
                                    <div className="mobile-ads1">
                                        <img src={a} alt="macdonald"/>
                                        <p style={{fontStyle:'italic',fontSize:'0.7rem'}}>McDonald - Fast food company</p>
                                    </div>
                                    <div className="mobile-ads2">
                                        <img src={c} alt="perfume"/>
                                        <p style={{fontStyle:'italic',fontSize:'0.7rem'}}>Dolce & Gabbana - Fashion company</p>
                                    </div>
                                </div>
                            </div>
                         </div>
                        </Col>

                        <Modal show={this.state.show} onHide={this.handleClosePopup} size="lg" dialogClassName="modal-100w">
                            <Modal.Header closeButton>
                              <Modal.Title>Search Advert</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <div style={{marginTop: "-13%"}}>
                                  <Search/>
                              </div> 
                              </Modal.Body>

                            <Modal.Footer>
                              <Button variant="secondary" onClick={this.handleClosePopup}>
                                Close
                              </Button>
                            </Modal.Footer>

                        </Modal>
             </Row>
        );
    }
}

export default withRouter(RowF);