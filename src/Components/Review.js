import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col, Button, FormControl, Alert, InputGroup, Form, Toast  } from 'react-bootstrap'
import { BsFillStarFill } from "react-icons/bs";
import Rodal from 'rodal';
import axios from 'axios'
import moment from 'moment'
import a from '../img/advertUser.png'
import TextField from '@material-ui/core/TextField';
import Buttonn from '@material-ui/core/Button';
import Cookies from 'js-cookie'
import {AlertTitle} from '@material-ui/lab';
import Alertt from '@material-ui/lab/Alert';

let SERVER_URL = "http://127.0.0.1:8000";
const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
const nameRegex = /[0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
const mobileRegex = /[0-9](\d{10})$/;
const passRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;


class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:true,
      visible:false,
      name:'',
      text:'',
      users:[],
      comment:false,
      commentError:false,
      token:"",
      show2:true,
      dataReview:[],
      x:[],
      notFound:false,
      visible2:false,
      dataReview2:[],
      dataImage:[],
      email:'',
      password:'',
      errorCommentName:'',
      errorCommentText:'',
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
      errorNotMatch:false
    };
  }
    
     async componentDidMount() {
        // const { token } = queryString.parse(this.props.location.search);
        const token = this.props.match.params.token;
        this.setState({token:token})

        let url2 = `${SERVER_URL}/src/api/review.php`;
        const response = await fetch(url2  + '?token='+ token);
        const dataReview = await response.json();
        this.setState({dataReview})
        console.log('dataReview',dataReview);
    
        if(this.state.dataReview.review && this.state.dataReview.review.length !== 0){
          this.state.dataReview.review.map(x => 
            this.setState({x})
          )
        }else{
          this.setState({notFound:true})
        }


        let url3 = `${SERVER_URL}/src/api/review2.php`;
        const response2 = await fetch(url3  + '?token='+ token);
        const dataReview2 = await response2.json();
        this.setState({dataReview2})

      }
      
      addReview = () => {
        if(sessionStorage.getItem('user')){
          this.setState({visible:true})
        }else{
          this.setState({visible3:true})
        }
          
      }

      hide = () => {
        this.setState({visible:false})
      }

      handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }, () => console.log(this.state));
        this.setState({errorCommentName:false, errorCommentText:false})
      }
  
      submit = (e) => {
        e.preventDefault();
      if(this.state.name === '' || this.state.name === null){
        this.setState({errorCommentName:true})
        return false;
      }
      if(this.state.text === '' || this.state.text === null){
        this.setState({errorCommentText:true})
        return false;
      }
        console.log(`
            -- Submitting --
            name : ${this.state.name}
            text : ${this.state.text}
            token : ${this.state.token}
            `);

            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('text', this.state.text);
            formData.append('token', this.state.token);
            formData.append('user', sessionStorage.getItem('user'));

            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/comment.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "You Registered Successfully"){
                    self.setState({comment:true, visible:false})
                }else if(response.data === "error" || response.data === null){
                    self.setState({comment:false, commentError:true, visible:false})
                    return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });
        
      }

      handleUserSubmit = (e) => {
        e.preventDefault();
    
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

      handleChangeUser = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }, () => console.log(this.state));
    
        if(this.state.email === '' || this.state.password === ''){
          this.setState({error:true})
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
      <Container fluid className="Review">
        <Row>
            <Col>
               <BsFillStarFill color="red" size="1.3rem"/>{' '}<h3>{this.state.x.num ? this.state.x.num : 0}{' '}Reviews</h3>
            </Col>
        </Row>

        <Fragment>
        {this.state.notFound  ? <Row className="ml-lg-5" >                          
                                         <Alertt severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                <AlertTitle>Review Advert!</AlertTitle>
                                                <p>There is no review for this advert.</p>
                                          </Alertt> 
                               </Row> : 
        <Row className="review-part">
          {this.state.dataReview.review  && this.state.dataReview.review.map((info, i) =>
              <div className="reviewPart" key={i}>
                <ul>
                  <li>
                    <img src={info.urlProfile ? info.urlProfile.replace('../public','') : a } alt={info.name}/>
                    <div style={{width:"30%",marginLeft: "19%",marginTop: "-12%"}}>
                        <p style={{fontWeight:"bold"}}>{info.name}</p>
                        <p style={{color:"silver",marginTop: "-5%"}}>{info.time}</p>
                    </div>
                  </li>
                  <li style={{marginTop:'27px'}}>
                    <p>
                       {info.text}
                    </p>
                  </li>
                </ul>  
            </div>
         )} 
       
         </Row>
          }
        </Fragment>

         <Row>
           <Col>
               <div style={{marginLeft:"4rem",marginTop:"2rem",marginBottom:"4%"}}><Button onClick={()=> this.setState({visible2:true}) } size="lg" variant="outline-dark">Show all {this.state.x.num ? this.state.x.num : 0} Reviews</Button></div> 
           </Col>
         </Row>
         <Row className="ml-xl-5">
              <Alert show={this.state.show} variant="dark">
              <Alert.Heading>Add Review For This Advert</Alert.Heading>
                <p>
                  You can write your experiences about this advert and business here to Inform those who intend to use the services of this business.
                </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={this.addReview} variant="outline-dark">
                 Add Review
                </Button>
              </div>
            </Alert>
         </Row>

         {this.state.comment ? <Row style={{marginLeft:"0"}}>
                                      <Toast onClose={()=> this.setState({show2:false})} show={this.state.show2} delay={5000} autohide className="ml-xl-5 mb-md-5" style={{width:"100%", background:' #80ffaa'}}>
                                        <Toast.Header>
                                          
                                          <strong className="mr-auto">Advert success</strong>
                                          <small>{moment().format('LL')}</small>
                                        </Toast.Header>
                                        <Toast.Body>You Register Review Successfully.</Toast.Body>
                                      </Toast>
                               </Row> : ''}

         {this.state.commentError ? <Row style={{marginLeft:"0"}}>
                                          <Toast onClose={()=> this.setState({show2:false})} show={this.state.show2} delay={5000} autohide className="ml-xl-5 mb-md-5" style={{width:"100%", background:'#ffb3b3'}}>
                                            <Toast.Header >
                                              
                                              <strong className="mr-auto">Advert Error</strong>
                                              <small>{moment().format('LL')}</small>
                                            </Toast.Header>
                                            <Toast.Body>There is an error on registering review.</Toast.Body>
                                          </Toast>
                               </Row> : ''}

            <Rodal visible={this.state.visible} onClose={this.hide} width={700} height={550} animation='door'>
              <i style={{color:'orange' }}>For your comment shown here just select your profile image in your profile account.</i>
              <h2 style={{textAlign:'center'}}>Add New Advert Review</h2>
                  <Form style={{display:'flex', flexDirection:'column'}} onSubmit={this.submit}>
                        <Form.Group controlId="formBasicEmail3">
                          <Form.Label>Email address or Full name</Form.Label>
                            <InputGroup className="mb-2">
                              <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl  placeholder="Email Address or full Name" size="lg" name="name" onChange={this.handleChange}/>
                            </InputGroup>
                          {this.state.errorCommentName ? 
                            <Form.Text style={{color:'red'}}>
                            Please Enter Your Name or Email. 
                            </Form.Text> : 
                            <Form.Text className="text-muted">
                            Your email will be displayed in the Review section. 
                            </Form.Text>
                          }
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea11">
                          <Form.Label>Review Text</Form.Label>
                          <Form.Control as="textarea" rows="8" style={{resize:'none'}} name="text" onChange={this.handleChange}/>
                          {this.state.errorCommentText ?
                            <Form.Text style={{color:'red'}}>
                            Please Enter Your Comment. 
                            </Form.Text> :
                            <Form.Text className="text-muted">
                            Please quote only about your personal experience of this business and do not mention inappropriate phrases.
                            </Form.Text>
                          }
                        </Form.Group>
      
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                    </Form>
            </Rodal>

            <Rodal visible={this.state.visible2} onClose={() => this.setState({visible2:false})} width={1000} height={500} animation='zoom' customStyles={{overflow: 'scroll'}}>
                          <Row className="review-part">
                            {this.state.dataReview2.review  && this.state.dataReview2.review.map((info, i) =>
                                <div className="reviewPart" key={i}>
                                  <ul>
                                    <li>
                                      <img style={{width:'22%',marginLeft:'-5%'}} src={info.urlProfile ? info.urlProfile.replace('../public','') : a} alt={info.name}/>
                                      <div style={{width:"30%",marginLeft: "19%",marginTop: "-12%"}}>
                                          <p style={{fontWeight:"bold"}}>{info.name}</p>
                                          <p style={{color:"silver",marginTop: "-5%"}}>{info.time}</p>
                                      </div>
                                    </li>
                                    <li>
                                      <p>
                                        {info.text}
                                      </p>
                                    </li>
                                  </ul>  
                              </div>
                          )} 
                      </Row>
            </Rodal>

            <Rodal visible={this.state.visible3} onClose={()=> this.setState({visible3:false})} width={600} height={450} animation='flip' customStyles={{borderRadius:'0.5rem'}}>
                <h3 style={{textAlign:'center',marginTop:'5%'}}>Log In to your profile.</h3>
                {this.state.error ? <Alert variant='danger'> user name or password are incorrect. </Alert> : ''}
                <Form style={{desplay:'flex', flexDirection:'column', marginTop:'2%'}} onSubmit={this.handleUserSubmit}>
                    <Form.Group controlId="formBasicEmail2">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" size='lg' name="email" onChange={this.handleChangeUser}/>
                      <Form.Text className="text-muted">
                        Please Enter Your Email Correctly.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" size='lg' name="password" onChange={this.handleChangeUser}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginTop:'2%'}}>
                      Submit
                    </Button>
                    <small style={{marginTop:'2%'}}>Don't have an account? <span className="signin_link">  <Link to="#" style={{textDecoration:'none'}} onClick={() => this.setState({visibleSignup:true, visible3:false})}>  Sign up </Link> </span> </small>
                </Form>
           </Rodal>

           <Rodal visible={this.state.visibleSignup} onClose={()=> this.setState({visibleSignup:false})} animation='door' width={700} height={650} style={{overflow:'auto'}}>
          <div className="slide-container">
              <h3 style={{textAlign:'center', marginBottom:'2%', marginTop:'2%'}}>Create an Advert Account</h3>
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
                 helperText= {this.state.errorSignupCPass2 ? "Please enter your password again!" : ''} 
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

      </Container>
    );

  }
  
}

export default withRouter(Review);


