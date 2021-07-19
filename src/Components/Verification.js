import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import { Nav, Navbar } from 'react-bootstrap'
import { MdVerifiedUser } from "react-icons/md";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import $ from 'jquery'

const SERVER_URL = "http://127.0.0.1:8000";

class Verification extends Component {
  constructor(props){
    super(props);

    this.state = {
        loading:false,
        visible:false,
        data:[],
        error:false,
        code:'',
        empty:false
        
    };
  }
  componentDidMount() {

    const url = `${SERVER_URL}/src/api/verify.php`;
    
    axios.post(url).then(response => response.data).then((data) => {
        this.setState({data : data})
    })


    //jquery
    $(function() {
        // 'use strict';
      
        var body = $('body');
      
        function goToNextInput(e) {
          var key = e.which,
            t = $(e.target),
            sib = t.next('input');
      
          if (key !== 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
          }
      
          if (key === 9) {
            return true;
          }
      
          if (!sib || !sib.length) {
            sib = body.find('input').eq(0);
          }
          sib.select().focus();
        }
      
        function onKeyDown(e) {
          var key = e.which;
      
          if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
          }
      
          e.preventDefault();
          return false;
        }
        
        function onFocus(e) {
          $(e.target).select();
        }
      
        body.on('keyup', 'input', goToNextInput);
        body.on('keydown', 'input', onKeyDown);
        body.on('click', 'input', onFocus);
      
      });
    //---------------------------------------------------------------------
    const url2 = `${SERVER_URL}/src/api/unblock.php`;
    
        axios.post(url2).then(response => response.data).then((data) => {
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
                url : `${SERVER_URL}/src/api/unblock.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                  self.setState({redirect: true})
                  self.props.history.push("./");
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

  close = (e) => {
    this.setState({ visible: false });
  }
  
signOut = (e) => {
    e.preventDefault();
    sessionStorage.setItem('user','');
    sessionStorage.clear();
    this.props.history.push('/');
}


changeNumber = (e) => {
    e.preventDefault();
    this.props.history.push('/block');
}

change = (event) => {
  event.preventDefault();
  const{name,value} = event.target;
  
  this.setState({code: this.state.code + event.target.value});

  this.setState({[name]: value }, () => console.log(this.state)); 
}


submit = (e) => {
    e.preventDefault();
    this.setState({visible:true,loading:true})

    if(this.state.code === ''){
      this.setState({visible:true,empty:true});
    }else{
    this.setState({visible:false,empty:false});
    console.log(`
            -- Submitting --
            user : ${sessionStorage.getItem('user')}
            code : ${this.state.code}
            `);


            let formData = new FormData();
            formData.append('user',sessionStorage.getItem('user'));
            formData.append('code', this.state.code);
            
            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/verify.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                  self.setState({visible:false,loading:false})
                   self.props.history.push({pathname:'/', data: "ok"}); 
                }else if(response.data === "not ok"){
                    self.setState({error:true,visible:true,loading:false})
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
  
  render(){

    return (
      <div className="verification">
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand style={{fontFamily:"cassanda",marginLeft:"5%",fontSize:"1.5rem"}}>Advert</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-auto">
                <Nav>
                    <Nav.Link onClick={this.signOut}>Sign out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
            <div className="popup_susscess">
                <Rodal visible={this.state.visible} animation={"door"} closeMaskOnClick= {false} showCloseButton={false}>
                        {this.state.loading && <div id="loader2">
                                <div className="loading-dots">
                                    <div className="bounce"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            </div> 
                        }  
                        <p style={{fontSize:"2rem", textAlign:"center", paddingTop:"2.5rem", fontFamily:"cassanda"}}>Please Wait</p>            
                </Rodal>
                {this.state.error && <Rodal visible={this.state.visible} animation={"door"} onClose={this.close} closeMaskOnClick= {false} showCloseButton={true}>
                    <p style={{fontSize:"2rem", textAlign:"center", paddingTop:"2rem"}}>Your code is not correct.</p>
                    <Link to="" style={{textDecoration:"none",padding:"6rem",fontSize:"1.3rem"}} onClick={this.submit}>Send code again</Link><br /><br/>
                    <Link to="" style={{textDecoration:"none",padding:"3rem",fontSize:"1.3rem",paddingLeft: "6rem"}} onClick={this.changeNumber}>Change phone number</Link>         
                </Rodal>}

                {this.state.empty && <Rodal visible={this.state.visible} animation={"door"} onClose={this.close} closeMaskOnClick= {false} showCloseButton={true}>
                    <p style={{fontSize:"2rem", textAlign:"center", paddingTop:"2rem"}}>Please Fill the Fields With Code That Sent to Your Mobile.</p>      
                </Rodal>}
            </div>
            <div id="verification-details">
                <div id="dialog">
                    <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
                    <span>(we want to make sure it's you before we contact our movers)</span>
                        <div id="form">
                            <form onSubmit={this.submit}>
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}"  onChange={this.change} />
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}"  onChange={this.change} />
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}"  onChange={this.change} />
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.change} />
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}"  onChange={this.change} />
                                <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}"  onChange={this.change} />
                                <button className="btn btn-primary btn-embossed" type="submit">Verify</button>
                            </form>
                        </div>
                    <div>
                    <span>Didn't receive the code</span><br />
                    <Link to="" onClick={this.submit}>Send code again</Link><br />
                    <Link to="" onClick={this.changeNumber}>Change phone number</Link>
                    </div>
                    <MdVerifiedUser size="2rem" color="red"/>
                </div>
            </div>
      </div>
    );

  }
  
}

export default withRouter(Verification);
