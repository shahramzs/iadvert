import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {Container, Row, Col, Button, Nav, Navbar } from 'react-bootstrap'
import axios from 'axios';
import freeAdvert from '../img/freeAdvert.jpg'
import Rodal from 'rodal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {countries} from './ListCountries';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Buttonn from '@material-ui/core/Button';
import moment from 'moment'
// import Countdown from 'react-countdown';

let SERVER_URL = "http://127.0.0.1:8000";

const rand = () => Math.random(0).toString(36).substr(2);
const length = 32;
const code = (length) => (rand()+rand()+rand()+rand()).substr(0,length);
const token = code(length) ;

class FreeAdvert extends Component{
    constructor(props){
        super(props);

        this.state = {
            country: "",
            city: "",
            cat: "",
            countryClassName: "country",
            cityClassName: "city",
            businessCategory: [],
            data: [],
            loading : false,
            second: 3600,
            countryList:'',
            visible:false,
        }
        this.tick = this.tick.bind(this);
    }
   
     componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} /Add Free Advert`; 
        
        let url = `${SERVER_URL}/src/api/get_cat.php`;
     fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log('data',data);
            this.setState({businessCategory: data})
    });

    const url2 = `${SERVER_URL}/src/api/country.php`;
        axios.post(url2).then(response => response.data).then((data) => {
            this.setState({data : data})
            console.log(this.state.data)
        })

        sessionStorage.setItem('token', token);

    
        caches.open('v1').then(function(cache) {
            cache.delete('/images/image.jpg').then(function(response) {
            });
          })

          const url3 = `${SERVER_URL}/src/api/timerBlock.php`;
            axios.post(url3).then(response => response.data).then((data) => {
            this.setState({data2 : data})
            console.log(this.state.data2)
        })

          if(sessionStorage.getItem('token')){
             setInterval(this.tick, 1000);
          } 
    }

    tick() {
        if (this.state.second > 0) {
          this.setState({ second: this.state.second - 1 });
        } else {
          clearInterval(setInterval(this.tick, 1000));
          console.log(`
          -- Submitting --
          user : ${sessionStorage.getItem('user')}
          `);

          let formData = new FormData();
          formData.append('user',sessionStorage.getItem('user'));
          
        //   var self = this;
          axios({
              method: 'post',
              url : `${SERVER_URL}/src/api/timerBlock.php`,
              data : formData,
              responseType: 'json',
              config : {headers : { 'Content-Type': 'multipart/form-data' }}
          })
          .then(function(response){
              //handle success
              console.log(response)
              
              if(response.data === "ok"){
                  
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
      }

     space = (url) => {
        var str=url.toString();
        str=str.split("-").join(" ");
        return str;
    }

     submitHandler = (e) => {
        e.preventDefault();
        const { countryList, city} = this.state;
        if(countryList === '' || city === ''){
            this.setState({
                countryClassName: 'country-error',
                cityClassName: 'city-error',
            })
            return false;
        }

        this.setState({loading:true})

            console.log(`
            -- Submitting --
            user : ${sessionStorage.getItem('user')}
            country : ${this.state.countryList}
            city : ${this.state.city}
            cat : ${this.space(this.state.cat)}
            token: ${token}
            `);

            let formData = new FormData();
            formData.append('country', this.state.countryList);
            formData.append('city', this.state.city);
            formData.append('cat', this.state.cat);
            formData.append('user',sessionStorage.getItem('user'));
            formData.append('token',token);

            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/country.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "You Registered Successfully"){
                    self.setState({loading:false})
                    self.props.history.push({pathname:'/Location', code: sessionStorage.getItem('token')});
                }else if(response.data === "You Could not Register Successfully."){
                   
                    return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });

///////////////////////////////////////////////////////web socket/////////////////////////////////////////
            var conn = new WebSocket('ws://localhost:5000');
            conn.onopen = (e) => {
            var items = {country:this.state.countryList, 
                         city:this.state.city, 
                         cat:this.state.cat, 
                         token:sessionStorage.getItem('token'), 
                         user:sessionStorage.getItem('user'),
                         time:moment().format('L'),
                         id:'132'}
                         
            conn.send(JSON.stringify(items));
          };
////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    }

     signOut = (e) => {
        e.preventDefault();
        sessionStorage.setItem('user','');
        sessionStorage.clear();
        this.props.history.push('/');
    }

    advert = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        this.props.history.push('/');
    }

    changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const { country, city } = this.state;
        if(Number(country) || Number(city)){
            this.setState({
                countryClassName:"country-error",
                cityClassName: "city-error",
            })
            return false;
        }

        this.setState({ [name]: value }, () => console.log(this.state));
    }

    selectChange = (e) => {
        this.setState({cat: e.target.value});
    }

    resetCountry = () => {
        this.setState({countryList:''})
    } 

    render() {

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

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }

           let business = this.state.businessCategory;
        //    console.log("business",business);
           let catOption = business.map((cat) =>
           <option key={cat.id} value={cat.business}>{this.space(cat.business)}</option>
           );
        
        return(
                <div className="freeAdvert">
                        <Navbar bg="light" expand="lg" sticky="top">
                            <Navbar.Brand style={{fontFamily:"cassanda",marginLeft:"5%",fontSize:"1.5rem"}}>Advert</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-auto">
                                <Nav>
                                <Nav.Link onClick={this.advert}>Advert</Nav.Link>
                                <Nav.Link onClick={this.signOut}>Sign out</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                            {this.state.loading && <div id="loader">
                                                    <div className="loading-dots">
                                                        <div className="bounce"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div> 
                            }
                   <div className="freeAdvertpart1">
                       <img src={freeAdvert} alt="free advert"/>
                   </div>
                        <div className="freeAdvertpart2">
                            <Container>
                               <Row>
                                   <Col><h1>Let’s get started advert free.</h1></Col>
                                </Row>
                                <Row>
                                    <Col><div className="textStep"><b>Step 1</b></div></Col>
                                </Row>
                                
                                <Row>
                                    <Col><h3>What kind of business do you have?</h3></Col>
                                </Row>
                                <form onSubmit={this.submitHandler}>
                                    <Row>
                                        <Col>
                                        <select className="business" name="business" value={this.state.cat} onChange={this.selectChange}>
                                                { catOption }
                                        </select>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col> <input className={this.state.countryClassName} type="text" placeholder="ex.USA" name="country" onClick={() => this.setState({visible:true})} onChange={this.changeHandler} required noValidate value = {this.state.countryList} autoComplete="off"/></Col>
                                        <Col> <input className={this.state.cityClassName} type="text" placeholder="ex.Los Angeles" name="city"  onChange={this.changeHandler} required noValidate  value = {this.state.city} autoComplete="off"/></Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col><Button  type="submit" variant="info">Continue</Button> {' '}</Col>
                                    </Row>
                                </form>
                            </Container>
                         </div>

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
                                onChange = {(e, newE) => this.setState({countryList:newE.label})}
                                renderOption={(option) => (
                                <React.Fragment>
                                    <span>{countryToFlag(option.code)}</span>
                                    {option.label} ({option.code}) +{option.phone}
                                </React.Fragment> 
                                )}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={this.state.countryList ? this.state.countryList : "Choose a country"}
                                    variant="outlined"
                                    inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-country', 
                                    }}
                                    name = 'country'
                                    autoComplete="off"
                                />
                                )}
                            />
                            <Buttonn variant="outlined" onClick={this.resetCountry} style={{marginTop:'5%'}}>Reset</Buttonn>
                        </Rodal>
                </div>
            );
    }
}
export default withRouter(FreeAdvert);