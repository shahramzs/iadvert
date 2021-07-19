import React, { Component, Fragment } from 'react';
import { Row, Col, Button, ListGroup, Alert} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHeart, faEye } from '@fortawesome/free-solid-svg-icons'
import loader from '../img/loader1.svg'
import axios from 'axios'
import Rodal from 'rodal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {countries} from './ListCountries';
import Skeleton from '@material-ui/lab/Skeleton';
import img from '../img/image.png'
import Buttonn from '@material-ui/core/Button';
import $ from 'jquery'
import Masony from "react-masonry-component";
var numeral = require('numeral');


let SERVER_URL = "http://127.0.0.1:8000";

class IconAdvert extends Component{
  constructor(props){
    super(props);
    this.state = {
        loading:true,
        found:false,
        searchIcon:[],
        hasMore:true,
        visible:false,
        visible2:false,
        visible3:false,
        visible4:false,
        country:'',
        business : ['Small Business', 'Industrial Business', 'Internet Business', 'Home Business', 'Non-Internet Service Businesses', 'Medical Business'],
        searchBusiness:'',
        cityName:'',
        businessName:'',
        tag:'',
        data:[],
        load:0,
        tab:false,
        grid:false

    }
  }

  async componentDidMount(){ 
  
    this.fetchData()

    var self = this;
    window.addEventListener("scroll", function(){
      if(window.pageYOffset > 130){
        self.setState({tab:true})
      } else {
        self.setState({tab:false})
      }
    })

  }

  dot = (url) => {
    var str = url.toString();
    str = str.split("-").join(" ");
    return str;
    }
  
  async componentWillReceiveProps(props) { 
    let url = `${SERVER_URL}/src/api/icon.php`;
    var self = this;
   await axios.get(url, {
      params: {
        tag: self.dot(props.match.params.tag),
        load:0
      }
    })
    .then(function (response) {
      self.setState({searchIcon:response.data})
      if(response.data){
          self.setState({loading:false,load:0})
        }
        if(response.data.length !== 0){
          self.setState({found:false})
        }else{
          self.setState({found:true})
        }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
     });  

     let url2 = `${SERVER_URL}/src/api/icon2.php`;
    const response2 = await fetch(url2+"?tag="+props.match.params.tag);
    const data = await response2.json();
    this.setState({data})

    $('html, body').animate({scrollTop: '0px'}, 1000);

  }

   fetchData = async() => {
      let url = `${SERVER_URL}/src/api/icon.php`;
      const response = await fetch(url+"?tag="+this.dot(this.props.match.params.tag)+"&load="+ this.state.load + 8);
      const searchIcon = await response.json();
      this.setState(state => ({
        searchIcon:[...state.searchIcon,...searchIcon],
        load:this.state.load + 8
      }))

  }

  clickLink(id) {
    this.setState(prevState => ({
      searchBusiness:prevState.business.filter(el => el === id ),
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
    document.title  = `${this.dot(this.props.match.params.tag)} / Advert`; 

    const listItems = this.state.business.map((job) =>
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

    const filter = this.state.searchIcon && this.state.searchIcon.filter((infoAdvert) => {
      let name =  (infoAdvert.country.toLowerCase().includes(this.state.country.toLowerCase()) && infoAdvert.city.toLowerCase().includes(this.state.cityName.toLowerCase()) && infoAdvert.name.toLowerCase().includes(this.state.businessName.toLowerCase()) ) 
      return name;
      })

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
            <Col style={{fontSize:"20px", fontWeight:"bold"}}>{this.dot(this.props.match.params.tag)} Advertisment</Col>
            </Row>
            {this.state.tab ?
              <Row style={{position:'fixed',zIndex:'2000',top:"4px",overflowX:"hidden",left:'30%'}}>
              <Col style={{marginLeft:'-4%'}}>
                <ListGroup horizontal style={{border:"none"}}>
                  <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark" onClick={()=>this.setState({visible:true})}>{this.state.country? this.state.country : 'Country'}</Button></ListGroup.Item>
                  <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark" onClick={()=>this.setState({visible3:true})}>{this.state.cityName ? this.state.cityName : 'City'}</Button></ListGroup.Item>
                  <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark"onClick={()=>this.setState({visible4:true})}>{this.state.businessName ? this.state.businessName: 'Name'}</Button></ListGroup.Item>
                  <ListGroup.Item style={{background:'transparent'}}><Button style={{color:'silver'}} variant="outline-dark"onClick={()=> this.setState({grid:!this.state.grid})}>Grid</Button></ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            :
            <Row>
              <Col>
                <ListGroup horizontal style={{border:"none"}}>
                  <ListGroup.Item><Button variant="outline-dark" onClick={()=>this.setState({visible:true})}>{this.state.country? this.state.country : 'Country'}</Button></ListGroup.Item>
                  <ListGroup.Item><Button variant="outline-dark" onClick={()=>this.setState({visible3:true})}>{this.state.cityName ? this.state.cityName : 'City'}</Button></ListGroup.Item>
                  <ListGroup.Item><Button variant="outline-dark"onClick={()=>this.setState({visible4:true})}>{this.state.businessName ? this.state.businessName: 'Name'}</Button></ListGroup.Item>
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
          <Fragment> {this.state.found ? <Row className="NoFound"><Alert variant='danger'><Alert.Heading  >No advert Found</Alert.Heading><p>Please Check your Searching Sentences and try it Again.</p></Alert></Row> :
          
          <InfiniteScroll
              dataLength={this.state.searchIcon.length} 
              next={this.fetchData}
              hasMore={this.state.data.length === this.state.searchIcon.length ? false : true}
              //loader={<div className="loader" key={0} ><img style={{marginLeft:"48%"}} src={loader} alt="loader"/></div>} 
              // endMessage={
                //  <p style={{ textAlign: 'center' }}>
                 // <b>Yay! You have seen it all</b>
               // </p>
            // }
              > 
    {filter.length !== 0 ? 
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
     {filter.map((infoAdvert, id) =>  
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
            {filter.map((infoAdvert, id) =>
              <Col key={id} className="RowAdvert" md={3} style={{marginTop:"10px",textAlign:"center"}}>
                    <Link to={`/AdvertDetails/${infoAdvert.token}`}>
                    <div className="sm-advert" style={{backgroundImage: infoAdvert.url === null ? 'url("'+ img +'")' : 'url("'+ infoAdvert.url.replace('../public','') +'")'  }} >
                          <span className="number-pic" style={{background:"rgba(0,0,0,0.4)", width:"25%", height:"12%", float:"right", borderRadius:"5%", color: "white"}}>{infoAdvert.numPic}<FontAwesomeIcon icon={faCamera} style={{background: "transparent", marginLeft: "15%"}}/> </span>
                          <span className="favorite-star"><FontAwesomeIcon icon={faHeart} style={{background: "transparent"}}/></span>
                          <span className="favorite_number" style={{background: "transparent", float: "right", color: "white", marginRight: "54%"}}>{infoAdvert.like_num ? numeral(infoAdvert.like_num).format('0,0') : 0}</span>
                          <div style={{marginTop:"-10%"}}>
                          <span className="number-view" style={{background: "transparent", float: "right", color: "white", marginRight: "-6%", marginTop:"9%"}}>{infoAdvert.view ? numeral(infoAdvert.view).format('0,0') : 0}</span>
                          <span className="view-icon" ><FontAwesomeIcon icon={faEye} color="#000000"/></span>
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

<Rodal visible={this.state.visible} onClose={()=> this.setState({visible:false})} width={500}>
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

export default withRouter(IconAdvert);
