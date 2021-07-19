import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Row, Form, Alert, Toast, Container, Col } from 'react-bootstrap'
import $ from 'jquery';
import { FiShare, FiHeart } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";

import Rodal from 'rodal'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaWhatsapp, FaHeart  } from "react-icons/fa";
import { AiFillLike, AiOutlineFilePdf, AiOutlineQrcode, AiOutlineCloudDownload } from "react-icons/ai";
import axios from 'axios'
import moment from 'moment'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { BsBookHalf  } from "react-icons/bs";
import img from '../img/image.png'
import f from '../img/1.mp4'
import TextField from '@material-ui/core/TextField';
import Buttonn from '@material-ui/core/Button';
import Cookies from 'js-cookie'
var QRCode = require('qrcode.react');


let SERVER_URL = "http://127.0.0.1:8000";
// const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)* .com$/);
const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
const nameRegex = /[0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
const mobileRegex = /[0-9](\d{10})$/;
const passRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

export const pointerIcon = new L.Icon({
  iconUrl: '../../icon.png',
  iconRetinaUrl: '../../icon.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [60, 70],
  
})

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[],
    loading:true,
    url:[],
    visible: false,
    visible2:false,
    visible3:false,
    visible4:false,
    email:'',
    password:'',
    users:[],
    error:false,
    like:false,
    likee:false,
    info:[],
    data_map:[],
    selfLat:'',
    selfLng:'',
    visible5:false,
    url_catalog:'',
    data_catalog:'',
    data_map2:[],
    x:[],
    lat_map:'',
    lng_map:'',
    url_map:'',
    video:[],
    showVideo:false,
    visibleSignup:false,
    fullname_signup:'',
    email_signup:'',
    mobile_signup:'',
    password_signup:'',
    cpassword_signup:'',
    errorSignupName:false,
    errorSignupName2:false,
    errorSignupEmail:false,
    errorSignupEmail2:false,
    errorSignupMobile:false,
    errorSignupMobile2:false,
    errorSignupPass:false,
    errorSignupPass2:false,
    errorSignupCpass:false,
    errorSignupCPass2:false,
    errorNotMatch:false,
    qrcode:false,
    };
  }

  async componentDidMount() {
        
       $(document).ready(function(){
         var win = $(window);
         var target = $('.boxgrid__item');
         win.on('scroll', function(){
          var top = win.scrollTop() / 5;
            target.css('transform','translateY('+ '-'+top +'%)')
         })

       });


      const token = this.props.match.params.token;
      

       let url = `${SERVER_URL}/src/api/picture.php`;
        const response = await fetch(url  + '?token='+ token);
        const data = await response.json();
        this.setState({data})
        if(data){
          this.setState({loading:false})
        }
        this.setState({url : this.state.data.pic && this.state.data.pic.map(x => x.url.replace('../public',''))})
        


          const url2 = `${SERVER_URL}/src/api/signin.php`;
          axios.post(url2).then(response => response.data).then((data) => {
            this.setState({users : data})
        })


        let url4 = `${SERVER_URL}/src/api/like2.php`;
        const response_like = await fetch(url4  + '?user='+ sessionStorage.getItem('user') +'&'+'token=' + token);
        const data_like = await response_like.json();
        if(data_like === 'ok'){
          this.setState({like:true});
        } else{
          this.setState({like:false});
        }


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


    let url_catalog = `${SERVER_URL}/src/api/catalog.php`;
    const response_catalog = await fetch(url_catalog  + '?token='+ token);
    const data_catalog = await response_catalog.json();
    this.setState({data_catalog})
    this.setState({url_catalog : this.state.data_catalog.catalog && this.state.data_catalog.catalog.map(x => x.url.replace('../public',''))})
       

    let url_map2 = `${SERVER_URL}/src/api/locate.php`;
    const response_map2 = await fetch(url_map2  + '?token='+ token);
    const data2 = await response_map2.json();
    this.setState({data_map2:data2})
    this.state.data_map2.locate && this.state.data_map2.locate.map(x => 
        this.setState({x})
      )
      this.setState({lat_map: this.state.x.lat , lng_map: this.state.x.lng})
      this.setState({url_map: this.state.x.url ? this.state.x.url.replace('../public','') : img})

     


      let url_video = `${SERVER_URL}/src/api/video.php`;
      const response_video = await fetch(url_video  + '?token='+ token);
      const data_video = await response_video.json();
      this.setState({video : data_video && data_video.map(x => x.url.replace('../public',''))})

  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({[name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    if(this.state.email === '' || this.state.password === ''){
      this.setState({error:true})
    }else{

    console.log(`
            -- Submitting --
            email : ${this.state.email}
            password : ${this.state.password}
            `);

            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);

            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/signin.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
               if(response.data === self.state.email){
                sessionStorage.setItem('user', response.data);
                Cookies.set('info', window.btoa(response.data));
                sessionStorage.setItem('code',window.btoa(new Date().getMilliseconds()))
                Cookies.set('code', sessionStorage.getItem('code'));
                self.setState({visible3:false})
                window.location.reload();
               }else{
                self.setState({error : true})
               }

                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })
          }
  }

   saveAdvert = async(e) =>{
    e.preventDefault();
      if(sessionStorage.getItem('user')){
        //like an advert
        this.setState({like:!this.state.like, likee:!this.state.likee, dislike:this.state.dislike })
        // const { token } = queryString.parse(this.props.location.search);
        const token = this.props.match.params.token;
        
        let formData = new FormData();
            formData.append('user', sessionStorage.getItem('user'));
            formData.append('token', token);
          var self = this;
          await  axios({
              method: 'post',
              url : `${SERVER_URL}/src/api/like.php`,
              data : formData,
              responseType: 'json',
              config : {headers : { 'Content-Type': 'multipart/form-data' }}
          })
        .then(function (response) {
          //console.log(response);
          if(response.data === 'insert'){
            self.setState({likee:true})
            self.props.likeeNum('inc');
          }else if(response.data === 'delete'){
            self.setState({likee:false})
           self.props.likeeNum('dec');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        this.setState({visible3:true});
      }
  }

  showVideo = (e) => {
    e.preventDefault();
    this.setState({showVideo:true})
  }

  submitSignup = (e) => {
    e.preventDefault();

    const { password_signup , cpassword_signup , fullname_signup, mobile_signup, email_signup } = this.state;
        if(fullname_signup === '' ){
            this.setState({errorSignupName : true})
            return false;
        }
        if(email_signup === '' ){
            this.setState({errorSignupEmail : true})
            return false;
        }
        if(mobile_signup === '' ){
          this.setState({errorSignupMobile : true})
          return false;
        }
        if(password_signup === '' ){
          this.setState({errorSignupPass : true})
          return false;
      }
      if(cpassword_signup === '' ){
        this.setState({errorSignupCpass : true})
        return false;
    }

    console.log(`
    -- Submitting --
    fullname : ${this.state.fullname_signup}
    email : ${this.state.email_signup}
    mobileNumber : ${this.state.mobile_signup}
    password : ${this.state.password_signup}
    `);
if(password_signup === cpassword_signup){
  this.setState({errorSignupCpass:false, errorNotMatch:false});

    let formData = new FormData();
    formData.append('fullName', this.state.fullname_signup);
    formData.append('email', this.state.email_signup);
    formData.append('mobileNumber', this.state.mobile_signup);
    formData.append('password', this.state.password_signup);

    var self = this;
    axios({
        method: 'post',
        url : `${SERVER_URL}/src/api/register.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }}
    })
    .then(function(response){
        //handle success
        console.log(response)
       if(response.data === "You Registered Successfully"){
        self.setState({visible3:true, visibleSignup:false})
       }else if(response.data === "You have an account, Please sign in."){
        self.setState({visible3:true, visibleSignup:false})
       }

        return response;
    })
    .catch(function(response){
        //handle error
        console.log(response)

    })
  }else{
    this.setState({errorSignupCpass:true, errorNotMatch:true});
    return false;
  }
  }

  changeSignup = (e) => {
    e.preventDefault();
    const { password_signup , cpassword_signup , fullname_signup, mobile_signup, email_signup } = this.state;
    const { name, value } = e.target;
    this.setState({[name]: value });

  if(fullname_signup !== '' ){
      this.setState({errorSignupName : false})
  }
  if(email_signup !== '' ){
    this.setState({errorSignupEmail : false})
  }
  if(mobile_signup !== '' ){
    this.setState({errorSignupMobile : false})
  }
  if(password_signup !== '' ){
    this.setState({errorSignupPass : false})
  }
  if(cpassword_signup !== '' ){
    this.setState({errorSignupCpass : false})
  }

  if(fullname_signup.length < 3 ){
    this.setState({errorSignupName2 : true, errorSignupName : true})
    return false;
  }else{
    this.setState({errorSignupName2 : false, errorSignupName : false})
  }
  if(nameRegex.test(fullname_signup) === true){
    this.setState({errorSignupName2 : true, errorSignupName : true})
    return false;
  }else{
    this.setState({errorSignupName2 : false, errorSignupName : false})
  }

  if(emailRegex.test(email_signup) === false){
    this.setState({errorSignupEmail2 : true, errorSignupEmail : true})
    return false;
  }else{
    this.setState({errorSignupEmail2 : false, errorSignupEmail : false})
  }

  if(mobileRegex.test(mobile_signup) === false){
    this.setState({errorSignupMobile2 : true, errorSignupMobile : true})
    return false;
  }else{
    this.setState({errorSignupMobile2 : false, errorSignupMobile : false})
  }

  if(password_signup.length < 7){
    this.setState({errorSignupPass2 : true, errorSignupPass : true})
    return false;
  }else{
    this.setState({errorSignupPass2 : false, errorSignupPass : false})
  }

  if(passRegex.test(password_signup) === true){
    this.setState({errorSignupPass2 : true, errorSignupPass : true})
    return false;
  }else{
    this.setState({errorSignupPass2 : false, errorSignupPass : false})
  }

  if(cpassword_signup.length < 7){
    this.setState({errorSignupCPass2 : true, errorSignupCpass : true})
    return false;
  }else{
    this.setState({errorSignupCPass2 : false, errorSignupCpass : false})
  }

  if(passRegex.test(cpassword_signup) === true){
    this.setState({errorSignupCPass2 : true, errorSignupCpass : true})
    return false;
  }else{
    this.setState({errorSignupCPass2 : false, errorSignupCpass : false})
  }
  
  }
  
  pdf = () => {
    
    let formData = new FormData();
    formData.append('token',this.props.match.params.token);

    var self = this;
    axios({
      method: 'get',
      url : `${SERVER_URL}/src/api/pdf.php`,
      data : formData,
      responseType: 'json',
      config : {headers : { 'Content-Type': 'multipart/form-data' }}
  })
.then(function (response) {
  console.log(response);
  window.open(`${SERVER_URL}/src/api/pdf.php?token=`+self.props.match.params.token, "_blank");
})
.catch(function (error) {
  console.log(error);
});

}

download = () => {
  const canvas = document.getElementById("qrcode");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "AdvertQrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

share = (e) => {
  e.preventDefault()
  this.setState({visible2:true})
}

  render(){

    const zoomOutProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 0.3,
      arrows: true,
      pauseOnHover:true
    };

    const zoom1OutProperties = {
      duration: 1500,
      transitionDuration: 500,
      infinite: true,
      scale: 0.3,
      arrows: false,
    };

    return (
      <div className="picturesApp">
            <main className="main"> 
                  <article className="section" >
                    <header className="section__header" style={{backgroundImage: this.state.url[0] ? 'url("'+this.state.url[0] + '")' : 'url("'+img+ '")'}} >
                    </header>   
            <div className="section__content">
                      <ul className="boxgrid">
                        <li className="boxgrid__item">
                          <Link to="#" className="box box--image">
                            <img src={this.state.url[1] ? this.state.url[1] : this.state.url[0]} className="box__img" alt="" />
                          </Link>
                        </li>
                        <li className="boxgrid__item boxgrid__item--wide">
                          <Link to="#" className="box box--image">
                            <img src={this.state.url[2] ? this.state.url[2] : this.state.url[0]} className="box__img" alt="" />
                          </Link>
                        </li>
                        <li className="boxgrid__item boxgrid__item--push">
                          <Link to="#" className="box box--image">
                            <img src={this.state.url[3] ? this.state.url[3] : this.state.url[0]} className="box__img" alt="" />
                          </Link>
                        </li>
                        <li className="boxgrid__item">
                          <Link to="#" className="box box--image">
                            <img src={this.state.url[4] ? this.state.url[4] : this.state.url[0]} className="box__img" alt="" />
                          </Link>
                        </li>
                        <li className="boxgrid__item boxgrid__item--push">
                          <Link to="#" className="box box--video" onClick={(e) => this.showVideo(e)}>
                            <video width="320" height="240" src={this.state.video[0] ? this.state.video[0] : f} controls className="box__img">
                                {/* <source src={this.state.video[0]} type="video/mp4"/>
                                <source src={this.state.video[0]} type="video/ogg"/>
                                <source src={this.state.video[0]} type="video/webm"/> */}
                                Your browser does not support HTML video.
                              </video>
                          </Link>
                        </li>
                        <li className="boxgrid__item" >
                          <Link to="#" className="box box--image">
                            <img src={this.state.url[5] ? this.state.url[5] : this.state.url[0]} className="box__img" alt="" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    </article>
                </main>

            <Button className="allPhotos" variant="light" onClick={() => this.setState({visible:true})}>Show all photos</Button>{' '}
            <Button className="showMap" variant="link" style={{textDecoration:"none",color:"whiteSmoke"}} onClick={()=>this.setState({visible4:true})}> <FaMapMarkedAlt color="whiteSmoke"/>{'  '} Show map</Button>
            <Button className="showCatalog" variant="link" style={{textDecoration:"none",color:"whiteSmoke"}} onClick={()=>this.setState({visible5:true})}> <BsBookHalf color="white"/>{'  '} Show Catalog</Button>
            <Button onClick = {this.pdf} className="showPdf" variant="link" style={{textDecoration:"none",color:"whiteSmoke"}}  > <AiOutlineFilePdf color="white"/>{'  '} PDF</Button>
            <div className="save"> 
              <Link to="#" style={{textDecoration:"none"}} onClick={this.saveAdvert}>
                {this.state.like & this.state.like ? <FaHeart color="white"/> : <FiHeart color="white"/> }
                {' '} <span style={{color:"white"}} >Save</span>
              </Link>
            </div>

            <div className="share">
            <Link to="#" style={{textDecoration:"none"}} onClick={(e) => this.share(e)}>
                <FiShare color="white"/>{' '}
                <span style={{color:"white"}} >Share</span>
            </Link>
            </div>

            <Rodal visible={this.state.visible} onClose={()=> this.setState({visible:false})} width={1366} height={700} customStyles={{zIndex:'1050',overflow: 'hidden',}}>
              <div className="slide-container" >
              <Button style={{position:'absolute',float:'right', marginLeft:'-5rem',marginTop:'4%',zIndex:'1063'}} variant="outline-dark" onClick={()=> this.setState({visible:false})}>Close</Button>
                {this.state.url && this.state.url.length === 0  ? 
                    <div style={{color:'red',fontSize:'1.5rem',textAlign:'center',lineHeight:'6'}}>There is not any image to show.</div>
                  :
                  <Zoom {...zoomOutProperties} >
                    {this.state.url && this.state.url.map((x,i) => ( 
                          <div className="each-slide" key={i} style={{width: "100%",backgroundSize:'contain',backgroundPosition:'center'}}>
                               <picture>
                                  <source media="(min-width:650px)" srcset={x}/>
                                  <source media="(min-width:465px)" srcset={x}/>
                                  <img  className="lazy" key={i} src={x} alt="business map" style={{borderRadius:'0.5rem',width:"70%",objectFit:'contain',verticalAlign:'bottom',marginTop:'2%'}}/>
                               </picture>
                               <span style={{position:'absolute',fontSize:'1.5rem', marginLeft:'10%',marginTop:'35rem'}}>{i+1}/{this.state.url.length}</span>
                        </div>
                    ))}
                  </Zoom>
                }
                  </div>
            </Rodal>

            <Rodal visible={this.state.visible2} onClose={()=> this.setState({visible2:false})} animation='rotate' width={500} height={600}>
               <div className="share-part">
                 <h3>Share This Advert Business To Your Family Or Your Friends</h3>
                 <ul>
                   <li><div data-href="https://developers.facebook.com/docs/plugins/" ><Link target="_blank" to={{pathname : "https://www.facebook.com/sharer/sharer.php?u=http://www.advert.com/AdvertDetails/"+this.props.match.params.token+"&amp;src=sdkpreparse"}} className="fb-xfbml-parse-ignore" style={{fontSize:'1.5rem'}}><FaFacebookF size='1.5rem'/> {' '} Facebook</Link></div></li>
                   <li><Link className="twitter-share-button" to={{pathname : "https://twitter.com/intent/tweet?text=http://www.advert.com/AdvertDetails/"+this.props.match.params.token}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaTwitter size='1.5rem' /> {' '} Twitter</Link></li>
                   <li><Link to={{pathname : "https://www.instagram.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaInstagram size='1.5rem'/> {' '} Instagarm</Link></li>
                   <li><Link target="_blank" to={{pathname:"mailto:someone@something.com?subject=Business Advert&body=http://www.advert.com/AdvertDetails/"+ this.props.match.params.token}} style={{fontSize:'1.5rem'}}><FaEnvelope size='1.5rem'/> {' '} Email</Link></li>
                   <li><Link to={{pathname : "https://api.whatsapp.com/send?text=http://www.advert.com/AdvertDetails/"+this.props.match.params.token}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaWhatsapp size='1.5rem'/> {' '} WhatsApp</Link></li>
                   <li><Link to = "#" style={{fontSize:'1.5rem'}} onClick={()=>this.setState({qrcode:true})}><AiOutlineQrcode size='1.5rem'/> Qrcode</Link></li>
                 </ul>
               </div>
            </Rodal>

            <Rodal visible={this.state.visible3} onClose={()=> this.setState({visible3:false})} width={600} height={450} animation='flip' customStyles={{borderRadius:'0.5rem'}}>
                <h3 style={{textAlign:'center'}}>Log In to your profile.</h3>
                {this.state.error ? <Alert variant='danger'> user name or password are incorrect. </Alert> : ''}
                <Form style={{desplay:'flex', flexDirection:'column', marginTop:'2%'}} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail2">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" size='lg' name="email" onChange={this.handleChange}/>
                      <Form.Text className="text-muted">
                        Please Enter Your Email Correctly.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" size='lg' name="password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginTop:'2%'}}>
                      Submit
                    </Button>
                    <small style={{marginTop:'2%'}}>Don't have an account? <span className="signin_link">  <Link to="#" style={{textDecoration:'none'}} onClick={() => this.setState({visibleSignup:true, visible3:false})}>  Sign up </Link> </span> </small>
                </Form>
           </Rodal>

           <Rodal visible={this.state.visible4} onClose={()=> this.setState({visible4:false})} animation='door' width={1000} height={600}>
              <Container fluid>
                <Row>
                  <Col>
                    <Map className="mapCat-fragment" center={[this.state.lat_map,this.state.lng_map]} zoom={2}>
                      <TileLayer
                        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                        <Marker  position={[this.state.lat_map, this.state.lng_map]}>
                            <Popup style={{width:"5rem",height:"100vh"}}>
                            <Link to='#'>
                              <div>
                                <p style={{textAlign:'center', cursor:'text'}}>{this.state.x.name} - {this.state.x.title}</p>
                                <hr/>
                                {/* <img style={{width:'100%'}} src={this.state.url_map ? this.state.url_map : img} alt={this.state.x.name}/> */}
                                <div className="slide-container" style={{marginLeft:'-30%'}}>
                                  {this.state.url && this.state.url.length === 0 ?
                                    <p style={{marginLeft:'22%',cursor:'text'}}>There is not any image to show.</p>
                                    :  
                                    <Zoom {...zoom1OutProperties} >
                                      {this.state.url && this.state.url.map((x,i) => ( 
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
                              </div>
                            </Link>
                            <Link to={{pathname: "https://waze.com/ul?ll="+this.state.lat_map+","+this.state.lng_map+"&navigate=yes&zoom=17 "}} target="_Blank" style={{textDecoration:'none',marginTop:'2%', marginLeft:'37%', fontSize:'1.5rem'}}>waze</Link>
                            </Popup>
                        </Marker>
                    
                        <Marker position={[this.state.selfLat, this.state.selfLng]} icon={pointerIcon}>
                          <Popup>
                            {sessionStorage.getItem('user') ? sessionStorage.getItem('user') : <strong>I'm Here!</strong>}
                          </Popup>
                        </Marker>
                    </Map>
                  </Col>
                </Row>
              </Container> 
           </Rodal>

           <Rodal visible={this.state.visible5} onClose={()=> this.setState({visible5:false})} animation='rotate' width={1000} height={600}>
               <div className="share-part" style={{display: 'inline-block',height: '100%',width: '100%',backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat: 'no-repeat'}}>
                 <h3>Business Catalog</h3>
                 <picture>
                   <source media="(min-width:650px)" srcset={this.state.url_catalog}/>
                   <source media="(min-width:465px)" srcset={this.state.url_catalog}/>
                   <img src={this.state.url_catalog}  style={{marginLeft:'5%',borderRadius:'0.5rem',width:'100%',height:'85%',position:'absolute',objectFit:'contain', verticalAlign:'bottom'}} alt="advert catalog business"/>
                 </picture>
               </div>
            </Rodal>

           <Toast onClose={() => this.setState({likee:false})} show={this.state.likee} delay={3000} autohide style={{backgroundColor:'Lightgreen', marginTop:'-65%', marginLeft:'2%'}}>
              <Toast.Header>
                <AiFillLike size='1.5rem'/> {' '}
                <strong className="mr-auto">Advert Like</strong>
                <small>{moment().format('lll')}</small>
              </Toast.Header>
              <Toast.Body>You Like This Business Advert.</Toast.Body>
          </Toast>

        <Rodal visible={this.state.showVideo} onClose={()=> this.setState({showVideo:false})} animation='rotate' width={1366} height={700}>
          <div className="slide-container">
                <Button style={{position:'absolute',float:'right', marginLeft:'-5rem',marginTop:'4%',zIndex:'1063'}} variant="outline-dark" onClick={()=> this.setState({showVideo:false})}>Close</Button>
                    {this.state.video && this.state.video.length === 0  ? 
                    <div style={{color:'red',fontSize:'1.5rem',textAlign:'center',lineHeight:'6'}}>There is not any video to show.</div>
                    :
                    <Zoom {...zoomOutProperties}>
                      {this.state.video && this.state.video.map((x,i) => ( 
                            <div className="each-slide" key={i} >
                                <video  controls className="lazy" key={i} src={x}  width="70%" style={{marginTop:'2%',verticalAlign: 'middle',borderRadius:'0.5rem'}}/>
                                <span style={{position:'absolute',fontSize:'1.5rem', marginLeft:'10%',marginTop:'35rem'}}>{i+1}/{this.state.video.length}</span>
                          </div>
                      ))}
                    </Zoom>
                  }
            </div>            
        </Rodal>

        <Rodal visible={this.state.visibleSignup} onClose={()=> this.setState({visibleSignup:false})} animation='door' width={700} height={650} style={{overflow:'auto'}}>
          <div className="slide-container">
              <h3 style={{textAlign:'center', marginBottom:'2%'}}>Create an Advert Account</h3>
              <form noValidate autoComplete="off" onSubmit={this.submitSignup} style={{display:'flex', flexDirection:'column', padding:'2rem'}}>
                <TextField 
                    error = {this.state.errorSignupName ? true : false}
                    helperText= {this.state.errorSignupName2 ? "Your name is incorrect. you must enter name more than 2 character and don't enter any number or other characters." : ''}
                    id="fullname" 
                    name="fullname_signup" 
                    label="Fullname" 
                    variant="outlined" 
                    style={{width:'100%', marginBottom:'4%'}} 
                    onChange={this.changeSignup}
                />
                <TextField 
                error = {this.state.errorSignupEmail ? true : false}
                helperText= {this.state.errorSignupEmail2 ? "The format of your email is not correct." : ''}
                    id="emailSignup" 
                    name="email_signup" 
                    label="Email" 
                    variant="outlined" 
                    style={{width:'100%', marginBottom:'4%'}} 
                    onChange={this.changeSignup}
                />
                <TextField 
                 error = {this.state.errorSignupMobile ? true : false}
                 helperText= {this.state.errorSignupMobile2 ? "Please enter your mobile number correctly. you should enter 11 digit number!" : ''}
                  id="mobileSignup" 
                  name="mobile_signup" 
                  label="Mobile Number" 
                  variant="outlined" 
                  style={{width:'100%', marginBottom:'4%'}} 
                  onChange={this.changeSignup}
                />
                <TextField 
                  error = {this.state.errorSignupPass ? true : false}
                  helperText= {this.state.errorSignupPass2 ? "Please enter your password! your password must be more than 6 characters" : ''}
                  id="passwordSignup" 
                  name="password_signup" 
                  label="Password" 
                  variant="outlined" 
                  style={{width:'100%', marginBottom:'4%'}} 
                  onChange={this.changeSignup}
                />
                <TextField 
                 error = {this.state.errorSignupCpass ? true : false}
                //  helperText= {this.state.errorSignupCPass2 ? "Please enter your password again!" : ''} 
                 helperText= {this.state.errorNotMatch ? "passwords not match!" : ''} 
                  id="confirm_password_Signup" 
                  name="cpassword_signup" 
                  label="Confirm Password" 
                  variant="outlined" 
                  style={{width:'100%',marginBottom:'4%'}} 
                  onChange={this.changeSignup}
                />
                <Buttonn color="primary" type="submit" size="large" style={{marginBottom:'2%'}}>Sign up</Buttonn>
                <p><small>Already Have An Account? <Link to="#" style={{textDecoration:'none'}} onClick={()=> this.setState({visibleSignup:false, visible3:true})}>Sign in</Link></small></p>
              </form>
            </div>            
        </Rodal>

        <Rodal visible={this.state.qrcode} onClose={()=> this.setState({qrcode:false})} animation='rotate' width={600} height={500}>
            <div style={{marginLeft:'19%'}}>
              <QRCode 
                id="qrcode"
                value = {"http://www.advert.com/AdvertDetails/"+ this.props.match.params.token } 
                size={350}
                bgColor={"#fcfcfc"}
                fgColor={"#000000"}
                level={"H"}
                renderAs={"convas"}
                />
            </div>
            <div style={{marginTop:'6%',marginLeft:'40%'}}>
              <Buttonn color="primary" onClick={this.download}><AiOutlineCloudDownload size="1.5rem"/> {''} Download</Buttonn>
            </div>
        </Rodal>

        <div id="fb-root"></div>
      </div>
    );

  }
  
}

export default withRouter(Pictures);
