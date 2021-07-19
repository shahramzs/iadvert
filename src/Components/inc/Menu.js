import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom'
import { BsFillCaretDownFill } from "react-icons/bs";
import { MdAccountCircle, MdHelp, MdPerson, MdFeedback, MdAssignmentInd, MdLock } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight, FaAddressBook, FaEnvelope, FaExclamationCircle} from "react-icons/fa";
import { GiEarthAmerica} from "react-icons/gi";
import { RiLogoutBoxRLine} from "react-icons/ri";
import Rodal from 'rodal';
import {Form} from 'react-bootstrap'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Avatar from '@material-ui/core/Avatar';

const SERVER_URL = "http://127.0.0.1:8000";

class Menu extends Component {
    constructor(props){
        super(props);

        this.state= {
            visible:false,
            feedback:"",
            visible2:false,
            visible3:false,
            img:'',
            icon:null
        }
    }

   async componentDidMount(){
        const drop_btn = document.querySelector(".drop-btn span");
        const tooltip = document.querySelector(".tooltip");
        const menu_wrapper = document.querySelector(".wrapper2");
        const menu_bar = document.querySelector(".menu-bar");
        const setting_drop = document.querySelector(".setting-drop");
        const help_drop = document.querySelector(".help-drop");
        const setting_item = document.querySelector(".setting-item");
        const help_item = document.querySelector(".help-item");
        const setting_btn = document.querySelector(".back-setting-btn");
        const help_btn = document.querySelector(".back-help-btn");

      drop_btn.onclick = (()=>{
        menu_wrapper.classList.toggle("show");
        tooltip.classList.toggle("show");
      });

      setting_item.onclick = (()=>{
            menu_bar.style.marginLeft = "-400px";
            setTimeout(()=>{
            setting_drop.style.display = "block";
            }, 100);
        });


      help_item.onclick = (()=>{
            menu_bar.style.marginLeft = "-400px";
            setTimeout(()=>{
            help_drop.style.display = "block";
            }, 100);
      });


      setting_btn.onclick = (()=>{
            menu_bar.style.marginLeft = "-42px";
            setting_drop.style.display = "none";
      });

      help_btn.onclick = (()=>{
            help_drop.style.display = "none";
            menu_bar.style.marginLeft = "-42px";
      });        

      let url = `${SERVER_URL}/src/api/profileImage.php`;
      const response = await fetch(url+"?user="+sessionStorage.getItem('user'));
      const img = await response.json();
      this.setState({img})
      this.setState({icon : this.state.img && this.state.img.map(x => x.urlProfile.replace('../public',''))})
     
    }
    signOut = (e) => {
 // check users are online or not.
      let formData = new FormData();
      formData.append('user', sessionStorage.getItem('user'));
  
      axios({
          method: 'post',
          url : `${SERVER_URL}/src/api/offline.php`,
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
// /////////////////////////////////////////////////////////////////////////////
// send status of offline of users by socket
var conn = new WebSocket('ws://localhost:5003');
conn.onopen = (e) => {
var items = {user:sessionStorage.getItem('user')}     
conn.send(JSON.stringify(items));
}
////////////////////////////////////////////////////////////////////////////////
        e.preventDefault();
        sessionStorage.setItem('user','');
        sessionStorage.setItem('code','');
      Cookies.remove('info');
        sessionStorage.clear();
        this.props.history.push('/');
    }
    about = (e) => {
        e.preventDefault();
        this.props.history.push('./AdvertStory')
    }
    changeFeddback = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }); 
    }
    submitFeedback = (e) => {
        e.preventDefault();
        if(this.state.feedback === ""){
            this.setState({visible2:true})
        }else{
            let formData = new FormData();
            formData.append('email', sessionStorage.getItem('user'));
            formData.append('feedback', this.state.feedback);

            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/support.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                if(response.data === 'ok'){
                    self.setState({visible3:true,visible:false})
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })

        }
    }

    render() {
        return (
            <React.Fragment>
    <nav className="nav-item2">
        <div className="drop-btn">
            <Avatar alt={sessionStorage.getItem('user')} src={this.state.icon ? this.state.icon :  <MdAccountCircle size="2rem"/> } /> <span style={{marginTop: '-68%',marginRight: '-18%'}}><BsFillCaretDownFill/></span>
        </div>
    
       <div className="tooltip"></div>
    <div className="wrapper2">
        <ul className="menu-bar" style={{marginLeft:"-42px"}}>

            <li>
                <Link to="#" style={{fontSize:"16px"}}><div className="icon"><span><MdAccountCircle size="1.7rem"/></span></div>{sessionStorage.getItem('user')} </Link>
            </li>
        
            
            <li>
                <Link to="#" onClick={()=> this.props.history.push('./account')}><div className="icon"><span><IoIosHome size="1.7rem"/></span></div>Home</Link>
            </li>

            <li className="setting-item">
                <Link to="#"><div className="icon"><span><AiFillSetting size="1.7rem"/></span></div>Settings<i><FaArrowRight/></i></Link>
            </li>

            <li className="help-item">
                <Link to="#"><div className="icon"><span><MdHelp size="1.7rem"/></span></div>Help & support <i><FaArrowRight/></i></Link>
            </li>

            <li>
                <Link to="#" onClick={this.about}><div className="icon"><span><MdPerson size="1.7rem"/></span></div>About us </Link>
            </li>

            <li>
                <Link to="#" onClick={()=> this.setState({visible:true})}><div className="icon"><span><MdFeedback size="1.7rem"/></span></div>Feedback</Link>
            </li>
        </ul>
        

        <ul className="setting-drop" style={{marginLeft:"-5%"}}>
                <li className="arrow back-setting-btn"><span><FaArrowLeft/></span>Settings </li>
                <li><Link to="#" onClick={()=> this.props.history.push('./AdvertData')} style={{marginLeft:'1%'}}>
                            <div className="icon">
                            <span><MdAssignmentInd size="1.7rem"/></span></div>
                Personal info </Link></li>
                <li><Link to="#" onClick={()=> this.props.history.push('./ProfileAdvert')} style={{marginLeft:'1%'}}>
                            <div className="icon">
                                <span><MdLock size="1.7rem"/></span></div>
                Password </Link></li>
                <li><Link to="#" style={{marginLeft:'1%'}}>
                            <div className="icon">
                                <span><FaAddressBook size="1.7rem"/></span></div>
                Activity log </Link></li>
                <li><Link to="#" style={{marginLeft:'1%'}}>
                            <div className="icon">
                                <span><GiEarthAmerica size="1.7rem"/></span></div>
                Languages </Link></li>
                <li><Link to="#" onClick={this.signOut} style={{marginLeft:'1%'}}>
                            <div className="icon">
                                <span><RiLogoutBoxRLine size="1.7rem"/></span></div>
                Log out </Link></li>
            </ul>

            <ul className="help-drop" style={{marginLeft:"-5%"}}>
                <li className="arrow back-help-btn"><span><FaArrowLeft/></span>Help & support</li>
                <li><Link to="#" style={{marginLeft:'1%'}}>
                            <div className="icon">
                            <span><MdHelp size="1.7rem"/></span></div>
                Help centre </Link></li>
                <li><Link to="#" style={{marginLeft:'1%'}}>
                            <div className="icon">
                            <span><FaEnvelope size="1.7rem"/></span></div>
                Support Inbox </Link></li>
                <li><Link to="#" style={{marginLeft:'1%'}} onClick={()=> this.setState({visible:true})}>
                            <div className="icon">
                            <span><MdFeedback size="1.7rem"/></span></div>
                Send feedback </Link></li>
                <li><Link to="#" style={{marginLeft:'1%'}} onClick={()=> this.setState({visible:true})}>
                            <div className="icon">
                            <span><FaExclamationCircle size="1.7rem"/></span></div>
                Report problem </Link></li>
       </ul>
     </div>
</nav>

            <Rodal visible={this.state.visible} onClose={()=>this.setState({visible:false})} customStyles={{width:'700px', height:"400px",background:' #404040'}}>
               <Form style={{display:'flex', flexDirection:'column'}} onSubmit={this.submitFeedback}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{color:"#ffffff"}}>Email address</Form.Label>
                        <Form.Control type="email"  plaintext readOnly defaultValue ={sessionStorage.getItem('user')} size="lg" style={{color:"#ffffff"}}/>
                        <Form.Text className="text-muted" style={{color:"#ffffff"}}>
                        you log in and send us a feedback by this email.
                        </Form.Text>
                    </Form.Group> 
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{color:"#ffffff"}}>your comment</Form.Label>
                        <Form.Control as="textarea" rows="5" cols="50" size="lg" style={{resize: 'none'}} name="feedback" onChange={this.changeFeddback}/>
                    </Form.Group>
                    <div style={{display:'block'}} className="m-auto">
                    <Button color="primary" variant="outlined" type="submit" size="large">
                        Send
                    </Button>
                    <Button color="secondary" variant="outlined" type="button" size="large" className="ml-lg-5" onClick={()=> this.setState({visible:false})}>
                        Cancel
                    </Button>
                    </div>
                </Form>
            </Rodal>

            <Rodal visible={this.state.visible2} onClose={()=>this.setState({visible2:false})} customStyles={{background:' #404040'}}>
                <div style={{marginTop:"7%", width:"90%", marginLeft:'10%'}}>Please write your comment after that submit it.</div>
                <div style={{marginTop:"9%", marginLeft:'34%'}}><ErrorOutlineIcon style={{fontSize:'7rem'}} color="secondary"/></div>
            </Rodal>

            <Rodal visible={this.state.visible3} onClose={()=>this.setState({visible3:false})} customStyles={{background:' #404040'}}>
                <div style={{marginTop:"8%", width:"100%", marginLeft:'5%'}}>You submit support message successfully.</div>
                <div style={{marginTop:"10%", marginLeft:'34%'}}><DoneOutlineIcon style={{color: 'green', fontSize:'7rem'}}/></div>
            </Rodal>
</React.Fragment>
        );
    }
}

export default withRouter(Menu);