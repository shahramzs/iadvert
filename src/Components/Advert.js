import React, { Component, Fragment } from 'react';
import Header from './inc/Header';
import Tags from './Tags';
import BodyAdvert from './BodyAdvert';
import Footer from './inc/Footer';
import axios from 'axios'
import { Toast } from 'react-bootstrap'
import { MdVerifiedUser } from "react-icons/md";
import { withRouter } from 'react-router-dom'
import Helmet from "react-helmet";
import WifiOffIcon from '@material-ui/icons/WifiOff';
import Rodal from 'rodal'
import $ from 'jquery'

const SERVER_URL = "http://127.0.0.1:8000";

class Advert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
     redirect:false,
     toast:false,
     show:true,
     online:true,
    };
  }
    
   componentDidMount() {
        document.title  = "AllAdvert / Advert";
        const {data} = this.props.location;
        const url = `${SERVER_URL}/src/api/block.php`;
        
            axios.post(url).then(response => response.data).then((data) => {
                this.setState({data : data})
            })
    
            console.log(`
                -- Submitting --
                user : ${sessionStorage.getItem('user')}
                `);
    
                let formData = new FormData();
                formData.append('user',sessionStorage.getItem('user'));
                
                var self = this;
                axios({
                    method: 'post',
                    url : `${SERVER_URL}/src/api/block.php`,
                    data : formData,
                    responseType: 'json',
                    config : {headers : { 'Content-Type': 'multipart/form-data' }}
                })
                .then(function(response){
                    //handle success
                    // console.log(response)
                    
                    if(response.data === "ok"){
                      self.setState({redirect: true})
                      self.props.history.push("./block");
                    }else if(response.data === "not ok"){
                       
                        return false;
                    }
                    return response;
                })
                .catch(function(response){
                    //handle error
                    console.log(response)
    
                });
        
                if(data === 'ok'){
                  this.setState({toast:true});
                }

                sessionStorage.removeItem('token');
                
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // check users are online or not.
   if(sessionStorage.getItem('user')){
    let formData = new FormData();
    formData.append('user', sessionStorage.getItem('user'));

    var self = this;
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
// /////////////////////////////////////////////////////////////////////////////
$('html, body').animate({scrollTop: '0px'}, 1000);
}
      
  close = (e) => {
    this.setState({toast:false})
  }

  
  render(){


    return (
      <div className="Advert">
        <Helmet>
                <meta name="title" property="title" content="All Free Businesses advertisement"/>
                <meta name="description" property="description" content="All Free Businesses advertisement"/>
                <meta name="keyword" property="keyword" content="All Advert  - Free Businesses advertisement - discount "/>
          </Helmet>
        <Header />
        <Tags />
        <BodyAdvert />
        <Footer />
      
      <Fragment>
          {this.state.toast && <Toast style={{position:"absulate",marginTop:"-90%",marginLeft:"39%",background:"#F96714"}} onClose={this.close} show={this.state.show} delay={5000} autohide>
          <Toast.Header>
            <MdVerifiedUser size="2rem" color="green"/>
            <strong className="mr-auto">Verification Accepted</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body style={{textAlign:"center"}}>Your Verification Accepted.</Toast.Body>
          </Toast>}
      </Fragment>
      <Rodal visible={!this.state.online} animation={"door"} height ={166} onClose={()=> this.setState({online:true})} customStyles={{borderLeft:'3px solid red', borderRadius:'20px'}}>
                <div><span style={{padding: '20px',background: '#ff0000',borderRadius: '2rem',color: ' #f2f2f2'}}><WifiOffIcon fontSize="large"/></span> </div><p style={{textAlign:'center',fontSize:'1.1rem',color:'#ff6666',marginTop:'-8%'}}>You're offline now.</p>
               <ul style={{marginTop:'8%'}}>
                 <li>Checking the connection.</li>
                 <li>Checking the proxy, firewall, and DNS configuration.</li>
                 <li>Running Windows Network Diagnostics.</li>
               </ul>
        </Rodal>
    </div>
    );

  }
  
}

export default withRouter(Advert);
