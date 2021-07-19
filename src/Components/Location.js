import React, {Component, createRef } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { MdKeyboardArrowLeft, MdRoom } from "react-icons/md";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { geolocated } from 'react-geolocated';
// import GeoSearch from "./GeoSearch";
import axios from 'axios';


let SERVER_URL = "http://127.0.0.1:8000";

class Location extends Component{
        constructor(props){
            super(props);
            
            this.state = {
                region:"",
                streetAddress: "",
                optional: "",
                city: "",
                state:"",
                zipCode:"",
                lat:"",
                lng:"",
                hasLocation: false,
                latlng: {
                  lat: 39.381266,
                  lng: -97.922211,
                },
                draggable: true,
                data: [],
                loading:false
              }
        }

    componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} /Add Location`; 
        document.body.style.backgroundColor = '#ffffff';
        //jquery
        
        const url = `${SERVER_URL}/src/api/location.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({data : data})
            console.log(this.state.data)
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading:true})
        console.log(`
            -- Submitting --
            user : ${sessionStorage.getItem('user')}
            region : ${this.state.region}
            streetAddress : ${this.state.streetAddress}
            optional : ${this.state.optional}
            city : ${this.state.city}
            state : ${this.state.state}
            zipCode : ${this.state.zipCode}
            lat : ${this.state.lat}
            lng : ${this.state.lng}
            token: ${sessionStorage.getItem('token')}
            `);

            let formData = new FormData();
            formData.append('user', sessionStorage.getItem('user'));
            formData.append('region', this.state.region);
            formData.append('streetAddress', this.state.streetAddress);
            formData.append('optional',this.state.optional);
            formData.append('city',this.state.city);
            formData.append('state',this.state.state);
            formData.append('zipCode',this.state.zipCode);
            formData.append('lat',this.state.lat);
            formData.append('lng',this.state.lng);
            formData.append('token',sessionStorage.getItem('token'));
            
            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/location.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                    self.setState({loading:false})
                    self.props.history.push({pathname:'/contact', data: sessionStorage.getItem('token')});
                }else if(response.data === "not ok"){
                    return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });

    }

    handleChange = (e) => {
        const{ name, value} = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    // handleSelect = (e) => {
    //     this.setState({region: e.target.value});
    // }

    backHandle = (e) => {
        e.preventDefault();
        this.props.history.push('/freeAdvert');
    }


    mapRef = createRef();

    gpsHandle = () => {
        const map = this.mapRef.current
        if(map != null){
            map.leafletElement.locate()
        }
    }

    handleLocationFound = (e) => {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
            lat: e.latlng.lat,
            lng: e.latlng.lng
        })
    }

    handleClickMap = (e) => {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
            lat: e.latlng.lat,
            lng: e.latlng.lng
        })
    }

    render(){

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }
           
        const marker = this.state.hasLocation ? (<Marker position={this.state.latlng} draggable={ this.state.draggable }>
                                                    <Popup>You Are Here! <br/> <b>Latitude : </b>{this.state.lat} <br/> <b>Longitude : </b>{this.state.lng}</Popup>
                                                 </Marker>) : null
        return(
                <div className="contact">
                        {this.state.loading && <div id="loader">
                                                    <div className="loading-dots">
                                                        <div className="bounce"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div> 
                        }
                    <form onSubmit={this.handleSubmit}>
                        <Container fluid >
                                    <Row>
                                        <Col sm={7} className="contact-info">
                                                <h3>Where’s your business located?</h3>
                                                <Form.Label >Country / Region</Form.Label>
                                                <Form.Control type="text" size="lg" lg={3} placeholder="eg. United States / North America" name="region" onChange={this.handleChange} value={this.state.region} required>
                                                </Form.Control>
                                                <Form.Label>Street address</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="eg. 123 Main st" name="streetAddress" onChange={this.handleChange} value={this.state.streetAddress} required/>
                                                <Form.Label>Apt, suite. (optional)</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="eg. #7" name="optional" onChange={this.handleChange} value={this.state.optional}  required/>
                                                <Row>
                                                    <Col className="City">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.San Francisco" name="city" onChange={this.handleChange} value={this.state.city} required/>
                                                    </Col>
                                                    <Col className="state">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.CA" name="state" onChange={this.handleChange} value={this.state.state} required/>
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>ZIP code</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.1895" name="zipCode" onChange={this.handleChange} value={this.state.zipCode} required/>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col> <Button onClick={this.backHandle} variant="link" size="lg"><MdKeyboardArrowLeft size="2rem" />Back</Button></Col>
                                                    <Col style={{marginLeft:"9rem"}}><Button type="submit" className="next1" variant="info" size="lg">Next</Button>{' '}</Col>
                                                    
                                                </Row>
                                        </Col>
                                                
                                        <Col sm={5} className="map">
                                            <Row style={{ height:"9rem"}}>
                                                <Col style={{padding:"5rem",marginLeft:"7rem"}}><Button onClick={this.gpsHandle}><MdRoom/> Use Current Location</Button></Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {/* map */}
                                                    
                                                    <Map center={this.state.latlng} 
                                                         zoom={13}
                                                         length={4}
                                                         onLocationfound={this.handleLocationFound}
                                                         onClick={this.handleClickMap}
                                                         ref={this.mapRef}>
                                                        <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        atrribution='&copy;<a href="http://osm.org/copyright">OpenStreetMap></a> contribution'
                                                        ></TileLayer>
                                                        { marker }
                                                        {/* <GeoSearch /> */}
                                                    </Map>
                                                    
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>        
                        </Container>
                    </form>
                </div>
            );
    }
    
}
export default geolocated({
    positionOptions:{
       enableHighAccuracy: true   
    },
    userDecisionTimeout: 10000
})(Location)
// export default withRouter(contact);
