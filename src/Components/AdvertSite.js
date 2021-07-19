import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import SlideShow from './SlideShow'
import Search from './Search'
import Features from './Features'
import Information from './Information'
import Footer from './inc/Footer'
import $ from 'jquery'
import axios from 'axios'
import Rodal from 'rodal'
import WifiOffIcon from '@material-ui/icons/WifiOff';


class AdvertSite extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            online:true,
            
        }
    }

  componentDidMount(){
      document.title  = "Home / Advert";

///////////////////////////// tracking///////////////////////////////////////////////////////////////////////////////////////////
$.getJSON('https://ipapi.co/json/', function(data) {
      
  const SERVER_URL = "http://127.0.0.1:8000";

  const track = JSON.parse(JSON.stringify(data));
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
     
  let formData = new FormData();
  formData.append('ip', track.ip);
  formData.append('country', track.country_name);
  formData.append('city', track.city);
  formData.append('region', track.region);
  formData.append('postal', track.postal);
  formData.append('latitude', track.latitude);
  formData.append('longitude', track.longitude);
  formData.append('timezone', track.timezone);
  formData.append('country_calling_code', track.country_calling_code);
  formData.append('currency_name', track.currency_name);
  formData.append('languages', track.languages);
  formData.append('asn', track.asn);
  formData.append('org', track.org);
  formData.append('originLat', position.coords.latitude);
  formData.append('originLng', position.coords.longitude);
  formData.append("userAgent",navigator.userAgent)

  axios({
    method: 'post',
    url : `${SERVER_URL}/src/api/tracking.php`,
    data : formData,
    responseType: 'json',
    config : {headers : { 'Content-Type': 'multipart/form-data' }}
})
.then(function(response){
    //handle success
    
    return response;
})
.catch(function(response){
    //handle error
    
})

}, 
(error)=> {
alert("Error Code = " + error.code + " - " + error.message);
});
} else {
alert('Geolocation is not supported by this browser. The geolocation property is not supported in IE8 and earlier versions.')
}

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////detection//////////////////////////////////////////////////////////////////
console.log('device',navigator.deviceMemory)
console.log('hardware',navigator.hardwareConcurrency)
console.log('connection',navigator.connection)
console.log("agent",navigator.userAgent)
console.log("agent",navigator.appCodeName)
console.log("agent",navigator.appName)
console.log("agent",navigator.appVersion)
console.log("agent",navigator.cookieEnabled)
console.log("agent",navigator.language)
console.log("agent",navigator.onLine)
console.log("agent",navigator.platform)
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     // check users are online or not.
     const SERVER_URL = "http://127.0.0.1:8000";
   if(sessionStorage.getItem('user')){
    let formData = new FormData();
    formData.append('user', sessionStorage.getItem('user'));

    axios({
        method: 'post',
        url : `${SERVER_URL}/src/api/online.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }}
    })
    .then(function(response){
        //handle success
        console.log(response)
        
        return response;
    })
    .catch(function(response){
        //handle error
        console.log(response)

    })
  }else{
    return false;
  }
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// send status of users by socket
var conn = new WebSocket('ws://localhost:5002');
conn.onopen = (e) => {
var items = {user:sessionStorage.getItem('user')}     
conn.send(JSON.stringify(items));
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('html, body').animate({scrollTop: '0px'}, 1000);

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}
  render(){
    return (
      <div className="AdvertSite">
        <SlideShow/>
        <Search/>
        <Features/>
        <Information/>
        <Footer/>
        <Rodal visible={!this.state.online} animation={"door"} height ={180} onClose={()=> this.setState({online:true})} customStyles={{borderLeft:'3px solid red', borderRadius:'20px'}}>
                <div style={{marginTop:'2%'}}><span style={{padding: '20px',background: '#ff0000',borderRadius: '2rem',color: ' #f2f2f2'}}><WifiOffIcon fontSize="large"/></span> </div><p style={{textAlign:'center',fontSize:'1.1rem',color:'#ff6666',marginTop:'-10%'}}>You're offline now.</p>
               <ul style={{marginTop:'6%'}}>
                 <li>Checking the connection.</li>
                 <li>Checking the proxy, firewall, and DNS configuration.</li>
                 <li>Running Windows Network Diagnostics.</li>
               </ul>
        </Rodal>
      </div>
    );

  }
  
}

export default withRouter(AdvertSite);
