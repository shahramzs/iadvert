import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiRefreshCw } from "react-icons/fi";
import { IoIosBasket } from "react-icons/io";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaPercent } from "react-icons/fa";
import { MdFindInPage, MdShoppingCart } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';


class Features extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        AOS.init({
          duration: 800,
          easing: 'slide',
          once: false
        });
 
    }

    render() {
        return ( 
        <Container className="features">
          <Row data-aos="fade-up" >
            <Col className="advert-features" >
                <h2 style={{color: "#000",fontSize: "40px",fontWeight: "900"}}>Advert Features</h2>
                <p style={{fontSize: "1.25rem",fontWeight: "300",marginBottom:"4rem"}}>Why Advert</p>
            </Col>
          </Row>
          <Row data-aos="fade-up">
            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <FiRefreshCw size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h3>Business advertising</h3>
                  <p>The best platform for personal business advertising.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>

            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <IoIosBasket size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h3>Marketing</h3>
                  <p>Find your market and share it with this platform.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>

            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <RiAdvertisementLine size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h4>Find everything around</h4>
                  <p>Easily find all kinds of businesses and prices and discounts around.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>
          </Row>

          <Row data-aos="fade-up">
            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <FaPercent size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h3>Show discounts</h3>
                  <p>Show off your business discounts better to attract more customers.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>

            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <MdFindInPage size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h3>Finding discounts</h3>
                  <p>Always buy at a discount and at the best price.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>

            <Col md={1} className="col-md-6 col-lg-4 mb-4 mb-lg-4 rtyui">
              <div className="unit-4 d-block">
                <div className="featuresIcon mb-3">
                    <span className="icon-wrap">
                      <span className="text-primary icon-autorenew">
                        <MdShoppingCart size="2rem" color="white" style={{marginTop:"1.5rem"}}/>
                      </span>
                    </span>
                </div> 
                <div>
                  <h3>Be aware</h3>
                  <p>Know the best prices and the best discounts around you.</p>
                  <p><Link to="">Learn more</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        );
    }
}

export default withRouter(Features);