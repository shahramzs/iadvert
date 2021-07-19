import React, { Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { GrMapLocation } from "react-icons/gr";
import { Map, TileLayer, Marker, Popup,  Polyline, Polygon, Circle, CircleMarker } from 'react-leaflet'
import { Container, Row, Col, Button } from 'react-bootstrap'
import queryString from 'query-string'
import Rodal from 'rodal'
import L from 'leaflet'
import img from '../img/image.png'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
let SERVER_URL = "http://127.0.0.1:8000";

export const pointerIcon = new L.Icon({
  iconUrl: '../../icon.png',
  iconRetinaUrl: '../../icon.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [60, 70],
  
})

class Locate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        zoom: 13,
        data:[],
        x:[],
        lat:'',
        lng:'',
        visible:false,
        url:'',
        visible2:false,
        selfLat:'',
        selfLng:'',
        movLat:'',
        movLng:''
    };
  }
    
  async componentDidMount() {

  // const { token } = queryString.parse(this.props.location.search);
  const token = this.props.match.params.token;
   let url = `${SERVER_URL}/src/api/locate.php`;
    
    const response = await fetch(url  + '?token='+ token);
    const data = await response.json();
    this.setState({data})
    // console.log('data',this.state.data);

    this.state.data.locate && this.state.data.locate.map(x => 
        this.setState({x})
      )

      this.setState({lat: this.state.x.lat , lng: this.state.x.lng})
      this.setState({url: this.state.x.url ? this.state.x.url.replace('../public','') : img})

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("Latitude is :", position.coords.latitude);
          // console.log("Longitude is :", position.coords.longitude);
          // console.log(position);
          this.setState({selfLat:position.coords.latitude, selfLng: position.coords.longitude})
        }, 
        (error)=> {
          alert("Error Code = " + error.code + " - " + error.message);
        });
      } else {
        alert('Geolocation is not supported by this browser. The geolocation property is not supported in IE8 and earlier versions.')
      }

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position2) => {
          // console.log("Latitude2 is :", position2.coords.latitude);
          // console.log("Longitude2 is :", position2.coords.longitude);
          this.setState({movLat:position2.coords.latitude, movLng:position2.coords.longitude})
        });
      }

      let url2 = `${SERVER_URL}/src/api/picture.php`;
      const response2 = await fetch(url2  + '?token='+ token);
      const data2 = await response2.json();
      this.setState({data2})
      this.setState({urlImage : this.state.data2.pic && this.state.data2.pic.map(x => x.url.replace('../public',''))})
  }    


  render(){
    const position = [this.state.lat, this.state.lng];
    const src = "https://embed.waze.com/iframe?zoom="+this.state.zoom+" &lat="+this.state.lat+"&lon="+this.state.lng+"&pin=1&desc=1&navigate=yes"
    const src2 = "https://waze.com/ul?q="+this.state.lat+","+this.state.lng+"&ll="+this.state.movLat+","+this.state.movLng+"&navigate=yes&zoom=17 ";
    const zoom1OutProperties = {
      duration: 1500,
      transitionDuration: 500,
      infinite: true,
      scale: 0.3,
      arrows: false,
    };
    return (
      <div className="locate">
        <GrMapLocation size="2rem"/><h3>Location</h3>
            <Map className="map-fragment" center={position} zoom={this.state.zoom}>
            <TileLayer
                // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup style={{width:"100%",height:"100vh"}}>
                      <div>
                      <p><strong>{this.state.x.name} - {' '} {this.state.x.title}</strong></p>
                         {/* <img style={{width:"100%"}} src={this.state.url} alt={this.state.x.name}/> */}
                         <div className="slide-container" style={{marginLeft:'-30%'}}>
                                  {this.state.urlImage && this.state.urlImage.length === 0 ?
                                    <p style={{marginLeft:'22%',cursor:'text'}}>There is not any image to show.</p>
                                    :  
                                    <Zoom {...zoom1OutProperties} >
                                      {this.state.urlImage && this.state.urlImage.map((x,i) => ( 
                                            <div className="each-slide" key={i} style={{width: "100%",backgroundSize:'contain',backgroundPosition:'center'}}>
                                                <picture >
                                                    <source media="(min-width:650px)" srcset={x}/>
                                                    <source media="(min-width:465px)" srcset={x}/>
                                                    <img  className="lazy" key={i} src={x} alt="business map" style={{borderRadius:'0.5rem',width:"80%",objectFit:'cover',verticalAlign:'bottom',marginTop:'2%'}} />
                                                </picture>
                                                <span style={{position:'absolute',fontSize:'1.5rem', marginLeft:'10%',marginTop:'35rem'}}>{i+1}/{this.state.url.length}</span>
                                          </div>
                                      ))}
                                    </Zoom>
                                  }
                          </div>
                         <Button style={{marginTop:'2%', marginLeft:'23%'}} variant='warning' onClick={()=> this.setState({visible2:true})}>Waze</Button>
                      </div>
                    </Popup>
                </Marker>
                <Marker position={[this.state.movLat, this.state.movLng]} icon={pointerIcon}>
                          <Popup>
                            {sessionStorage.getItem('user') ? sessionStorage.getItem('user') : <strong>I'm Here!</strong>}
                          </Popup>
                </Marker>
                <Polyline color="red" positions={[[this.state.lat, this.state.lng],[this.state.movLat, this.state.movLng]]} />
                <Polygon color="red" positions={[[this.state.lat, this.state.lng],[this.state.movLat, this.state.movLng]]} />
                <Circle center={position} fillColor="blue" radius={200} />
                <Circle center={[this.state.movLat, this.state.movLng]} fillColor="purple" radius={200} />
                <CircleMarker center={position} color="red" radius={20}>
                <Popup style={{width:"100%",height:"100vh"}}>
                      <div>
                      <p><strong>{this.state.x.name} - {' '} {this.state.x.title}</strong></p>
                         <img style={{width:"100%"}} src={this.state.url} alt={this.state.x.name}/>
                         <Button style={{marginTop:'2%', marginLeft:'23%'}} variant='warning' onClick={()=> this.setState({visible2:true})}>Waze</Button>
                      </div>
                    </Popup>
               </CircleMarker>
               <CircleMarker center={[this.state.movLat, this.state.movLng]} color="red" radius={20}>
                          <Popup>
                            {sessionStorage.getItem('user') ? sessionStorage.getItem('user') : <strong>I'm Here!</strong>}
                          </Popup>
               </CircleMarker>
            </Map>

            <Row style={{width:"100%",marginLeft: "3.5rem",marginTop:"2rem",fontSize:"1.3rem"}}>
              <Col>
                   <p><strong>{this.state.x.region} - {this.state.x.state} - {this.state.x.city} - {this.state.x.country}.</strong></p>
              </Col>
            </Row>
            <Row style={{marginLeft: "3.5rem",marginTop:"1rem"}}>
              <Col>
                  <Button variant="outline-secondary" size="lg" onClick={()=> this.setState({visible:true})}>More about the location</Button>
              </Col>
              </Row>
              
              <Rodal visible={this.state.visible} onClose={()=> this.setState({visible:false})} width={1000} height={500}>
                <Container>
                  <Row>
                    <Col>
                        <ul className='mt-4'>
                          <li><p>Region : <strong>{this.state.x.region} - {this.state.x.state} - {this.state.x.city} - {this.state.x.country}.</strong></p></li>
                          <li><p>Address : <strong>{this.state.x.streetAddress}</strong></p></li>
                          <li><p>Optional Address : <strong>{this.state.x.optional}</strong></p></li>
                          <li><p>Business Phone : <strong>{this.state.x.phone}</strong></p></li>
                          <li><p>Email :  <strong>{this.state.x.email}</strong></p></li>
                          <li><p> Facebook : <strong>{this.state.x.facebook}</strong></p></li>
                          <li><p> Twitter : <strong>{this.state.x.twitter}</strong></p></li>
                          <li><p> Instagarm : <strong>{this.state.x.instagram}</strong></p></li>
                          <li><p> Linkedin : <strong>{this.state.x.linkedin}</strong></p></li>
                          <li><p> Web Site : <strong>{this.state.x.web}</strong></p></li>
                        </ul>
                    </Col>

                    <Col className='mr-5'>
                          <Map className="map-fragment" center={position} zoom={this.state.zoom - 3}>
                                      <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                  <Marker position={position}>
                                      <Popup style={{width:"100%",height:"100vh"}}>
                                        <div>
                                        <p><strong>{this.state.x.name} - {' '} {this.state.x.title}</strong></p>
                                        <img style={{width:"100%"}} src={this.state.url} alt={this.state.x.name}/>
                                        </div>
                                        <Link to={{pathname: src2}} target="_Blank" style={{textDecoration:'none',marginTop:'2%', marginLeft:'23%', fontSize:'1.5rem'}}>waze</Link>
                                      </Popup>
                                  </Marker>
                              </Map>
                    </Col>

                  </Row>
                </Container>
            </Rodal>

            <Rodal style={{borderRadius:'0.5rem'}} visible={this.state.visible2} onClose={()=> this.setState({visible2:false})} width={1000} height={600} animation="zoom">

                <iframe title="advert business map" style={{borderRadius:'0.5rem'}} src = {src}  sandbox="allow-same-origin	allow-scripts" frameBorder='no' scrolling='no' 
                width="100%" height="530"></iframe>


            </Rodal>
      </div>
    );

  }
  
}

export default withRouter(Locate);
