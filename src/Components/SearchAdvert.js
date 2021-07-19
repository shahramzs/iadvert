import React, { Component, Fragment } from 'react';
import { Row, Col, Button, ListGroup, Alert } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHeart, faEye } from '@fortawesome/free-solid-svg-icons'
import loader from '../img/loader1.svg'
import $  from "jquery";
import Rodal from 'rodal'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import queryString from 'query-string'
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {countries} from './ListCountries';
import Skeleton from '@material-ui/lab/Skeleton';
import Buttonn from '@material-ui/core/Button';
import Masony from "react-masonry-component";
import L from 'leaflet'
import img from '../img/image.png'

var numeral = require('numeral');

let SERVER_URL = "http://127.0.0.1:8000";

export const pointerIcon = new L.Icon({
  iconUrl: '../../icon.png',
  iconRetinaUrl: '../../icon.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [40, 50],
})

class SearchAdvert extends Component{
  constructor(props){
    super(props);
    this.state = {
        loading:true,
        found:false,
        dataSearch:[],
        hasMore:true,
        visible:false,
        info:[],
        name:'',
        city:'',
        business:'',
        visible1:false,
        visible2:false,
        visible3:false,
        visible4:false,
        country:'',
        businessList : ['Small Business', 'Industrial Business', 'Internet Business', 'Home Business', 'Non Internet Service Businesses', 'Medical Business'],
        searchBusiness:'',
        cityName:'',
        businessName:'',
        data:[],
        load:0,
        tab:false,
        grid:false,
        movLat:'',
        movLng:''
    }
  }
  
  async componentDidMount() {
    this.fetchData()
    
    var self = this;
    window.addEventListener("scroll", function(){
      if(window.pageYOffset > 130){
        self.setState({tab:true})
      } else {
        self.setState({tab:false})
      }
    })

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position2) => {
        this.setState({movLat:position2.coords.latitude, movLng:position2.coords.longitude})
      });
    }

  }

  dot = (url) => {
    var str = url.toString();
    str = str.split("-").join(" ");
    return str;
    }

 async componentWillReceiveProps(props){
    
    const parsed = queryString.parse(props.location.search);
    this.setState({name:parsed.name, city:parsed.city, business:parsed.business})

    let url = `${SERVER_URL}/src/api/search.php`;
    let self = this;
   await axios.get(url, {
      params: {
        name: self.dot(parsed.name),
        city: self.dot(parsed.city),
        business: self.dot(parsed.business),
        load: 0
      }
    })
    .then(function (response) {
      self.setState({dataSearch:response.data})
      if(response.data){
        self.setState({loading:false,load: 0})
      }
      if(response.data.length === 0){
        self.setState({found:true})
      }else{
        self.setState({found:false})
      }

    })
    .catch(function (error) {
      console.log(error);
    });

    if(this.state.dataSearch){
      this.setState({info: this.state.dataSearch && this.state.dataSearch.map(info => [info.lat, info.lng])})
    }

    let url2 = `${SERVER_URL}/src/api/search2.php`;
    const response2 = await fetch(url2+"?name="+this.dot(parsed.name)+"&city="+this.dot(parsed.city)+"&business="+this.dot(parsed.business));
    const data = await response2.json();
    this.setState({data})

    $('html, body').animate({scrollTop: '0px'}, 1000);

  }

   fetchData = async () => {
       //const parsed = queryString.parse(this.props.location.search);
      let url = `${SERVER_URL}/src/api/search.php`;
      const response = await fetch(url+"?name="+this.dot(this.state.name)+"&city="+this.dot(this.state.city)+"&business="+this.dot(this.state.business)+"&load="+this.state.load + 8);
      const dataSearch = await response.json();
      this.setState(state => ({
        dataSearch: [...state.dataSearch,...dataSearch],
        load: this.state.load + 8
      }))

  }

  clickLink(id) {
    this.setState(prevState => ({
      searchBusiness:prevState.businessList.filter(el => el === id ),
      visible2:false
  }));
  
  }
  resetCountry = () => {
    this.setState({country:''})
   }
   resetCity =() => {
     this.setState({cityName:''})
   }
   resetBusiness = () => {
     this.setState({searchBusiness:''})
   }
   resetName = () => {
     this.setState({businessName:''})
   }

  render(){
    document.title  = `${this.dot(this.state.name)} / ${this.dot(this.state.business)} / ${this.dot(this.state.city)} / Advert`; 
    const listItems = this.state.businessList.map((job) =>
    <li key={job.toString()} onClick={this.clickLink.bind(this,job)} value={job}>{job}</li>
    );

    const classes = makeStyles({
      option: {
        fontSize: 20,
        '& > span': {
          marginRight: 15,
          fontSize: 20,
        },
      },
      
    });


    function countryToFlag(isoCode) {
      return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
    }

  
      const masonryOptions = {
        fitWidth: true,
        columnWidth: 300,
        gutter: 30,
        itemSelector: ".photo-item",
      };

    return (
      <div className="BodyAdvert">
           {this.state.loading ? 
                               <Fragment>
                                  <Row style={{marginRight:'67%', marginLeft:'0'}}>
                                      <Col><Skeleton width={89} height={58} style={{borderRadius: "1.3rem"}}/></Col>
                                      <Col><Skeleton width={89} height={58} style={{borderRadius: "1.3rem"}}/></Col>
                                      <Col><Skeleton width={89} height={58} style={{borderRadius: "1.3rem"}}/></Col>
                                      <Col><Skeleton width={89} height={58} style={{borderRadius: "1.3rem"}}/></Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                    <Col><Skeleton width={500}/></Col>
                                    </Col>
                                  </Row>
                                </Fragment>
          :
          <Fragment>
            <Row>
            <Col style={{fontSize:"20px", fontWeight:"bold"}}>{this.dot(this.state.name)} / {this.dot(this.state.business)} Advertisment in {this.dot(this.state.city)}</Col>
            </Row>
            {this.state.tab ?
            <Row style={{position:'fixed',zIndex:'2000',top:"4px",overflowX:"hidden",left:'30%'}}>
            <Col>
              <ListGroup horizontal style={{border:"none"}}>
                <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark"onClick={()=>this.setState({visible:true})}>Show on map</Button></ListGroup.Item>
                <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark"onClick={()=> this.setState({grid:!this.state.grid})}>Grid</Button></ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          :
          <Row>
              <Col>
                <ListGroup horizontal style={{border:"none"}}>
                  <ListGroup.Item><Button variant="outline-dark"onClick={()=>this.setState({visible:true})}> Show on map</Button></ListGroup.Item>
                  <ListGroup.Item><Button variant="outline-dark"onClick={()=> this.setState({grid:!this.state.grid})}>Grid</Button></ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          }
          </Fragment>
          }

          {this.state.loading ? <React.Fragment><Row><img style={{margin:"0 auto"}} src={loader} alt="loader"/></Row>
          <Row >
                                  <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                </Row> 
                                <Row>
                                  <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                 <Col>
                                    <Skeleton variant="rect" width={300} height={200} />
                                    <Skeleton width="50%" />
                                    <Skeleton width="25%" style={{marginBottom:'2%'}}/>
                                 </Col>
                                </Row> 
                                </React.Fragment> :
          <Fragment> {this.state.found ? <div className="NoFound"><Alert variant='danger'><Alert.Heading  >No advert Found</Alert.Heading><p>Please Check your Searching Sentences and try it Again.</p></Alert></div> :
          
          <InfiniteScroll
              dataLength={this.state.dataSearch.length} 
              next={this.fetchData}
              hasMore={this.state.data.length === this.state.dataSearch.length ? false : true}
              loader={<div className="loader" key={0} ><img style={{marginLeft:"48%"}} src={loader} alt="loader"/></div>} 
              // endMessage={
              //   <p style={{ textAlign: 'center' }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
              >

     {this.state.dataSearch && this.state.dataSearch.length !== 0 ? 
      <Fragment>
      {this.state.grid ? 
         <Row> 
           <Masony
              className={"photo-list"}
              elementType={"ul"}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
            > 
          {this.state.dataSearch && this.state.dataSearch.map((infoAdvert, id) =>  
                    <li key={id} className="photo-item"  >
                        <meta itemProp name="name" content={`${infoAdvert.title} - ${infoAdvert.name} - ${infoAdvert.city} - ${infoAdvert.cat}`}/>
                        <meta itemprop="position" content={id + 1}></meta>
                        <meta itemprop="url" content={`/AdvertDetails/${infoAdvert.token}`}/>
                        <Link to={`/AdvertDetails/${infoAdvert.token}`}>
                        <div className="viewLike"> 
                          <span className="favorite-star"><FontAwesomeIcon icon={faHeart} style={{background: "transparent"}}/></span>
                          <span className="favorite_number" style={{background: "transparent", color: "white"}}>{infoAdvert.like_num ? numeral(infoAdvert.like_num).format('0,0') : 0}</span>
                          <span className="number-pic" style={{background:"rgba(0,0,0,0.4)", width:"15%", height:"182%", borderRadius:"5%", color: "white",textAlign:"center",lineHeight:'2'}}>{infoAdvert.numPic}<FontAwesomeIcon icon={faCamera} style={{background: "transparent", marginLeft: "15%"}}/> </span>
                          <span className="view-icon"><FontAwesomeIcon icon={faEye} color="#000000" style={{background: "transparent"}}/></span>
                          <span className="number-view" style={{background: "transparent", color: "white"}}>{infoAdvert.view ? numeral(infoAdvert.view).format('0,0') : 0}</span>
                        </div>
                        <img  src={infoAdvert.url === null ? img : infoAdvert.url.replace('../public','')} alt={infoAdvert.title}/>
                        <div className="sm-text-advert-grid">
                                  <h6 style={{float:"left",marginLeft:'3%'}}>{infoAdvert.title.replace(/\w+/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1)}).replace(/\s/g, '')}</h6>
                                  <p style={{float:"right",fontSize:'12px', marginRight:'10%'}}> {infoAdvert.cat}</p>
                                  <h4 className="sm-advert-time-grid" style={{float: "right", background: "transparent" ,fontSize: "12px",marginTop:'3%',right:'0'}}>{infoAdvert.time}</h4>
                                  <p className="sm-advert-city-grid" style={{float: "left",marginTop: "3%", fontSize: "12px"}}>{infoAdvert.country} - {infoAdvert.city}</p>
                        </div>
                      </Link>
                    </li>
            )}
             </Masony>
         </Row>
      :           
          <Row>
            {this.state.dataSearch && this.state.dataSearch.map((infoAdvert, id) =>
              <Col key={id} className="RowAdvert" md={3} style={{marginTop:"10px",textAlign:"center"}}>
                    <Link to={`/AdvertDetails/${infoAdvert.token}`}>
                      <div className="sm-advert" style={{backgroundImage: infoAdvert.url === null ? 'url("'+ img +'")' : 'url("'+ infoAdvert.url.replace('../public','') +'")'  }} >
                          <span className="number-pic" style={{background:"rgba(0,0,0,0.4)", width:"25%", height:"12%", float:"right", borderRadius:"5%", color: "white"}}>{infoAdvert.numPic}<FontAwesomeIcon icon={faCamera} style={{background: "transparent", marginLeft: "15%"}}/> </span>
                          <span className="favorite-star"><FontAwesomeIcon icon={faHeart} style={{background: "transparent"}}/></span>
                          <span className="favorite_number" style={{background: "transparent", float: "right", color: "white", marginRight: "54%"}}>{infoAdvert.like_num ? numeral(infoAdvert.like_num).format('0,0') : 0}</span>
                          <div style={{marginTop:"-10%"}}>
                          <span className="number-view" style={{background: "transparent", float: "right", color: "white", marginRight: "-6%", marginTop:"9%"}}>{infoAdvert.view ? numeral(infoAdvert.view).format('0,0') : 0}</span>
                          <span className="view-icon"><FontAwesomeIcon icon={faEye} color="#000000" /></span>
                          </div>
                              <div className="sm-text-advert">
                                  <h4 style={{float:"left"}}>{infoAdvert.title.replace(/\w+/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1)}).replace(/\s/g, '')}</h4>
                                  <p style={{float:"left"}}> {infoAdvert.cat}</p>
                                  <h4 className="sm-advert-time" style={{float: "right", background: "transparent" ,marginLeft: "-5%" ,fontSize: "13px", padding:"4%"}}>{infoAdvert.time}</h4>
                                  <p className="sm-advert-city" style={{float: "right",marginTop: "7%", marginLeft: "3%", fontSize: "13px"}}>{infoAdvert.country} - {infoAdvert.city}</p>
                              </div>
                        </div>
                    </Link>
                </Col>
              )}
          </Row>
         }  
         </Fragment>
          :  
          <Row className="NoFound"><Alert variant='danger'><Alert.Heading  >No advert Found</Alert.Heading><p>Please Check your Searching Sentences and try it Again.</p></Alert></Row>
             }
       </InfiniteScroll>
          }
          </Fragment>
          }

        <Rodal visible={this.state.visible} onClose={()=> this.setState({visible:false})} animation='door' width={1000} height={600}>
              
                    <Map className="mapCat-fragment" center={this.state.info[0]} zoom={12}>
                      <TileLayer
                        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {this.state.dataSearch && this.state.dataSearch.map((info, i) =>
                        <Marker key={i} position={[info.lat, info.lng]}>
                            <Popup style={{width:"5rem",height:"100vh"}}>
                            <Link to={`/AdvertDetails/${info.token}`}>
                              <div>
                                {info.name} - {info.title}
                                <hr/>
                                <img style={{width:'100%'}} src={info.url.replace('../public','')} alt={info.name}/>
                              </div>
                            </Link>
                            <Link to={{pathname: "https://waze.com/ul?ll="+info.lat+","+info.lng+"&navigate=yes&zoom=17 "}} target="_Blank" style={{textDecoration:'none',marginTop:'2%', marginLeft:'23%', fontSize:'1.5rem'}}>waze</Link>
                            </Popup>
                        </Marker>
                    )}
                    <Marker position={[this.state.movLat, this.state.movLng]} icon={pointerIcon}>
                          <Popup>
                            {sessionStorage.getItem('user') ? sessionStorage.getItem('user') : <strong>I'm Here!</strong>}
                          </Popup>
                    </Marker>
                    </Map> 
           </Rodal>

           <Rodal visible={this.state.visible1} onClose={()=> this.setState({visible1:false})} width={500}>
         <h5 style={{marginBottom:'10%'}}>Select A Country</h5>
            <Autocomplete
                id="country-select"
                style={{ width: '350', margin: '0 auto' }}
                options={countries}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange = {(e, newE) => this.setState({country:newE.label})}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label} ({option.code}) +{option.phone}
                  </React.Fragment> 
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    name = 'country'
                  />
                )}
              />
              <Buttonn variant="outlined" onClick={this.resetCountry} style={{marginTop:'5%'}}>Reset</Buttonn>
        </Rodal>

        <Rodal visible={this.state.visible2} onClose={()=> this.setState({visible2:false})} >
              <div className="business-popup">
                  <ul>{listItems}</ul>
              </div>
              <Buttonn variant="outlined" onClick={this.resetBusiness} style={{marginTop:'-32%', marginLeft:'81%'}}>Reset</Buttonn>
        </Rodal>

        <Rodal visible={this.state.visible3} onClose={()=> this.setState({visible3:false})} >
              <div className="business-popup" style={{marginTop:"5%"}}>
                <h5>Enter The Name Of City</h5>
              <TextField id="outlined-basic" label="Name of City" variant="outlined" style={{width:"100%",marginTop:'5%'}} onChange={(e)=>this.setState({cityName:e.target.value})} value={this.state.cityName ? this.state.cityName : ''} autoComplete='off'/>
              </div>
              <Buttonn variant="outlined" onClick={this.resetCity} style={{marginTop:'5%'}}>Reset</Buttonn>
        </Rodal>

        <Rodal visible={this.state.visible4} onClose={()=> this.setState({visible4:false})} >
              <div className="business-popup" style={{marginTop:"5%"}}>
                <h5>Enter The Name Of Business</h5>
              <TextField id="outlined-basic" label="Name of Business" variant="outlined" style={{width:"100%",marginTop:'5%'}} onChange={(e)=>this.setState({businessName:e.target.value})} value={this.state.businessName ? this.state.businessName : ''} autoComplete='off'/>
              </div>
              <Buttonn variant="outlined" onClick={this.resetName} style={{marginTop:'5%'}}>Reset</Buttonn>
        </Rodal>
      </div>
    );

  }
  
}

export default withRouter(SearchAdvert);
