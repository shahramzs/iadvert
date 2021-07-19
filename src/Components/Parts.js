import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom'
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import img from '../img/image.png'
import Rodal from 'rodal'
import TextField from '@material-ui/core/TextField';
import Buttonn from '@material-ui/core/Button';
import Cookies from 'js-cookie'
import {Alert, AlertTitle} from '@material-ui/lab';
import { Form, Button } from 'react-bootstrap'

let SERVER_URL = "http://127.0.0.1:8000";
const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
const nameRegex = /[0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
const mobileRegex = /[0-9](\d{10})$/;
const passRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;


class Parts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound:false,
      data:[],
      x:[],
      url:'',
      visible3:false,
      like:false,
      data2:[],
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
      error:false,
      name:'',
      password:'',
      likes:[]
    };
  }
    
  async componentDidMount() {
        const token = this.props.match.params.token;
        let url = `${SERVER_URL}/src/api/similar.php`;
          
          const response = await fetch(url  + '?token='+ token);
          const data = await response.json();
          this.setState({data})
          //console.log('data',this.state.data);
    
          if(this.state.data.similar && this.state.data.similar.length !== 0){
            this.state.data.similar && this.state.data.similar.map(x => 
              this.setState({x})
            )
            this.setState({url : this.state.data.similar && this.state.data.similar.map(x => x.url ? x.url.replace('../public','') : img)})
          }else{
            this.setState({notFound:true})
          }
          
          let url2 = `${SERVER_URL}/src/api/similarLike.php`;
          const response2 = await fetch(url2  + '?user='+sessionStorage.getItem('user'));
          const data2 = await response2.json();
          this.setState({data2})
          if(data2 === 'notExist'){
            return false;
          }else{
            this.setState({likes: data2 && data2.map(info => info.token)})
          }
            //console.log('data2',this.state.likes)

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
          }
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
      
        saveAdvert = (token) => {
            if(sessionStorage.getItem('user')){
              //like an advert
              
              let formData = new FormData();
                  formData.append('user', sessionStorage.getItem('user'));
                  formData.append('token', token);
                var self = this;
                  axios({
                    method: 'post',
                    url : `${SERVER_URL}/src/api/like.php`,
                    data : formData,
                    responseType: 'json',
                    config : {headers : { 'Content-Type': 'multipart/form-data' }}
                })
              .then(function (response) {
                console.log(response);
                if(response.data === 'insert'){
                  //like 
                  self.setState({like:true})
                }else if(response.data === 'delete'){
                   //dislike
                   self.setState({like:false})
                   self.setState({likes: self.state.likes.filter(id=>id!==token)})
                 }
              })
              .catch(function (error) {
                console.log(error);
              });
            }else{
              this.setState({visible3:true});
            }
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
  
  render(){

    return (
      <React.Fragment>
        <div className="parts" key={this.props.key}>
          <Link to={`/AdvertDetails/${this.props.info.token}`} target='_blank'>
          <img src={this.props.info.url ? this.props.info.url.replace('../public','') : img} alt={this.props.info.title}/>
          </Link>
          <span><Link to="#" onClick={() => this.saveAdvert(this.props.info.token)}> {this.state.likes && this.state.likes.includes(this.props.info.token) || this.state.like  ? <FaHeart /> : <FiHeart /> } </Link></span>
          <ul>
              <li>
                  <p><strong>{this.props.info.title}</strong></p>
              </li>
              <li>
                  <p>{this.props.info.name}</p>
              </li>
              <li>
                  <small><i>{this.props.info.country} - {this.props.info.city}</i></small>
              </li>
          </ul>  
        </div>
       
        <Rodal visible={this.state.visible3} onClose={()=> this.setState({visible3:false})} width={600} height={450} animation='flip' customStyles={{borderRadius:'0.5rem'}}>
                <h3 style={{textAlign:'center'}}>Log In to your profile.</h3>
                {this.state.error ? <Alert severity='error'> user name or password are incorrect. </Alert> : ''}
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

           <Rodal visible={this.state.visibleSignup} onClose={()=> this.setState({visibleSignup:false})} animation='door' width={700} height={650} style={{overflow:'auto'}}>
            <div className="slide-container">
              <h3 style={{textAlign:'center',marginBottom:'2%'}}>Create an Advert Account</h3>
              <form noValidate autoComplete="off" onSubmit={this.submitSignup} style={{display:'flex', flexDirection:'column'}}>
                <TextField 
                    error = {this.state.errorSignupName ? true : false}
                    helperText= {this.state.errorSignupName2 ? "Your name is incorrect. you must enter name more than 2 character and don't enter any number or other characters." : ''}
                    id="fullname" 
                    name="fullname_signup" 
                    label="Fullname" 
                    variant="outlined" 
                    style={{width:'100%', marginBottom:'3%'}} 
                    onChange={this.changeSignup}
                />
                <TextField 
                error = {this.state.errorSignupEmail ? true : false}
                helperText= {this.state.errorSignupEmail2 ? "The format of your email is not correct." : ''}
                    id="emailSignup" 
                    name="email_signup" 
                    label="Email" 
                    variant="outlined" 
                    style={{width:'100%', marginBottom:'3%'}} 
                    onChange={this.changeSignup}
                />
                <TextField 
                 error = {this.state.errorSignupMobile ? true : false}
                 helperText= {this.state.errorSignupMobile2 ? "Please enter your mobile number correctly. you should enter 11 digit number!" : ''}
                  id="mobileSignup" 
                  name="mobile_signup" 
                  label="Mobile Number" 
                  variant="outlined" 
                  style={{width:'100%', marginBottom:'3%'}} 
                  onChange={this.changeSignup}
                />
                <TextField 
                  error = {this.state.errorSignupPass ? true : false}
                  helperText= {this.state.errorSignupPass2 ? "Please enter your password! your password must be more than 6 characters" : ''}
                  id="passwordSignup" 
                  name="password_signup" 
                  label="Password" 
                  variant="outlined" 
                  style={{width:'100%', marginBottom:'3%'}} 
                  onChange={this.changeSignup}
                />
                <TextField 
                 error = {this.state.errorSignupCpass ? true : false}
                 helperText= {this.state.errorSignupCPass2 ? "Please enter your password again!" : ''} 
                 helperText= {this.state.errorNotMatch ? "passwords not match!" : ''} 
                  id="confirm_password_Signup" 
                  name="cpassword_signup" 
                  label="Confirm Password" 
                  variant="outlined" 
                  style={{width:'100%',marginBottom:'3%'}} 
                  onChange={this.changeSignup}
                />
                <Buttonn color="primary" type="submit" size="large" style={{marginBottom:'1%'}}>Sign up</Buttonn>
                <p><small>Already Have An Account? <Link to="#" style={{textDecoration:'none'}} onClick={()=> this.setState({visibleSignup:false, visible3:true})}>Sign in</Link></small></p>
              </form>
            </div>            
        </Rodal>
    </React.Fragment>
    );

  }
  
}

export default withRouter(Parts);
