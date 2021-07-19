import React, {Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import c from '../img/customer.svg'
import a from '../img/res.jpg'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class RowS extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            latlng: {
              lat: 29.77511,
              lng: 52.42258,
            },
          }
    }

    render() {
        return (
            <Row className="mb-lg-5 mt-lg-5 ">
                        <Col md={6} className="section-left mt-md-5 tablet" data-aos="fade-right">
                        <div id="mobile3"><span></span><span></span><span></span></div>
                        <div className="mobile-shadow3">
                            <div className="mobile-wrap3">
                                <div className="tablet-title">Advert</div>
                                <div className="tablet-titr">Find everything around</div>
                                <div className="tablet-ads">
                                    <div className="tablet-ads1">
                                        <div className="tablet-ads1-img"><img src={a} alt="Restaurant"/></div>
                                        <div className="tablet-ads1-titr">
                                            <p>Mehr Afarin Restaurant</p>
                                            <p>District 10, Shiraz, Fars Province, Iran</p>
                                            <p>Open 12pm-12am</p>
                                        </div>
                                    </div>
                                    <div className="tablet-ads2">
                                         <Map center={this.state.latlng} 
                                                zoom={15}
                                                length={5}>
                                                <TileLayer
                                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                     atrribution='&copy;<a href="http://osm.org/copyright">OpenStreetMap></a> contribution'
                                                ></TileLayer>
                                                   <Marker position={this.state.latlng}>
                                                    <Popup><i>Mehr Afarin Restaurant</i></Popup>
                                                   </Marker>)
                                        </Map>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Col>

                        <Col md={6} className="pl-lg-5 ml-auto mt-md-5 section-right">
                        <img src={c} alt="customers"/>
                        <h3 className="mb-4 text-black">Customers </h3>
                         <p className="mb-4">Customers who looking for a particular product or service. Those who like to compare several brands before buying and get enough information. Customers looking for a platform that contains all kinds of service or business information. Customers who are looking for a specific service in a particular country or region and would like to know all its prices and features.</p>
                        </Col>
            </Row>
        );
    }
}

export default withRouter(RowS);