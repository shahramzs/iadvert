import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import Helmet from "react-helmet";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Buttonn from '@material-ui/core/Button';

const axios = require('axios').default;
const SERVER_URL = "http://127.0.0.1:8000";

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false)});
    

    Object.values(rest).forEach(val => {val === null && (valid = false)});
    return valid;
};

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const nameRegex = /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

class Signup extends Component {
    constructor(props){
       super(props);

       this.state = {
           fullName : "",
           email:  "",
           mobileNumber: "",
           password: "",
           passwordConfirm: "",
           show: false,
           show2: false,

           visible: false,
    
           users:[],

           formErrors:{
            fullName : "",
            email: "",
            mobileNumber: "",
            password: "",
            passwordConfirm: "",
           },
           showCaptcha:false,
           user_captcha_input:''

       }
    
    }

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    handleLink() {
        this.props.history.push('/Signin')
    }
    
    componentDidMount(){
        document.title  = "Sign up / Advert";

        const url = `${SERVER_URL}/src/api/register.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({users : data})
            console.log(this.state.users)
        })

        $(document).ready(function(){
            $(".wrapper").css("filter", "blur(8px)");
            setInterval(function(){ $(".wrapper").css("filter", "blur(0px)");}, 3000);
        });
        
        loadCaptchaEnginge(6); 

    }

    handleChange = e => {
        e.preventDefault();
        this.setState({show2:false})
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        const { password , passwordConfirm , fullName, mobileNumber, email } = this.state;


        switch (name) {
            case 'email' :
                formErrors.email = emailRegex.test(value) ? '' : 'Invalid Email address';
                break;
            case 'mobileNumber' :
               formErrors.mobileNumber = !Number(value) ? 'mobile number is not contain alphabet' : '';
                break;
            default : break;
        }

        if(mobileNumber.length < 10  && mobileNumber.length > 0){
            formErrors.mobileNumber = "mobile number must be 11 number";
        }

        if(fullName.length < 3 && fullName.length > 0){
            formErrors.fullName = 'Minimum 3 Characters Required';
        }else{
            formErrors.fullName = '';
        }

        if(nameRegex.test(fullName) === true){
            formErrors.fullName = 'fullname is not contain numbers';
          }else{
            formErrors.passwordConfirm = '';
          }
          
        this.setState({ formErrors, [name]: value });
    }

    handleChangePassword = e => {
        e.preventDefault();
        const { name, value } = e.target;
        if(e.target.value.length < 8 ){
            this.state.formErrors.password = 'Minimum 8 Characters Required';
        }else{
            this.state.formErrors.password = '';
        }
        this.setState({[name]: value }); 
    }

    handleChangeConfirm = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if(e.target.value.localeCompare(this.state.password) !== 0) {
            this.state.formErrors.passwordConfirm = "The passwords do not match";
        }else{
                this.state.formErrors.passwordConfirm = "";
        }
        this.setState({[name]: value });    
    }

    handleSubmit = e => {
        e.preventDefault();

        const { password , passwordConfirm , fullName, mobileNumber, email } = this.state;
        if(fullName === '' || email === '' || mobileNumber === '' || password === '' || passwordConfirm === ''){
            this.setState({show2 : true, show: false})
            return false;
        }
        
        if(this.state.user_captcha_input === ''){
            alert("Please enter the captcha code.")
            return false
        }

        if (validateCaptcha(this.state.user_captcha_input) === true) {
            document.getElementById('user_captcha_input').value = "";
            loadCaptchaEnginge(6); 
            this.setState({showCaptcha:false})

        if(formValid(this.state)){
            console.log(`
            -- Submitting --
            fullName : ${this.state.fullName}
            email : ${this.state.email}
            mobile : ${this.state.mobileNumber}
            password : ${this.state.password}
            `);

            let formData = new FormData();
            formData.append('fullName', this.state.fullName);
            formData.append('email', this.state.email);
            formData.append('mobileNumber', this.state.mobileNumber);
            formData.append('password', this.state.password);

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
                    self.setState({visible: true, show: false, show2: false})
                }else if(response.data === "You have an account, Please sign in."){
                    //user have an account
                    self.setState({show : true, show2: false})
                    return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });

        }else{
            console.error('Form Invalid - Display Error Message : This is an error on form or empty fields. please check it.');
        }
    }else {
        alert('Captcha Code Does Not Match');
    }

    }

    back = e => {
        e.preventDefault();
        this.props.history.push('/');
    }
    showCaptcha = (e) => {
        if(this.state.fullName === '' || this.state.email === '' || this.state.mobileNumber === '' || this.state.password === '' || this.state.passwordConfirm === ''){
            this.setState({show2:true})
            return false
        }else{
            this.setState({showCaptcha:true})
        }
    }

  render(){
      const { formErrors } = this.state;

      if(sessionStorage.getItem('user')){
        this.props.history.push('/');
       }
       
    return (
        <div className="wrapper">
            <Helmet>
                <meta name="title" property="title" content="Register"/>
                <meta name="description" property="description" content="Register to advert site - Add free advertisement for your business - Add some discount - Find everything you want"/>
                <meta name="keyword" property="keyword" content="Register - Free Business advertisement "/>
            </Helmet>
            <Button variant="secondary" as="button" type="button" style={{top:'3%', left:'1%', position:"absolute"}} onClick={this.back}>Back to Advert</Button>
            {this.state.show && <div className="errorr">You have an account. please <Link to="/signin">Sign in</Link></div> }
            {this.state.show2 && <div className="errorr">Please fill out All of the fields and next submit.</div> }
            <form  className="form-wrapper" onSubmit={this.handleSubmit} noValidate>
             <h1>Create an Advert Account</h1>
                <div className="fullName">
                    <label htmlFor="fullname">full Name</label>
                    <input 
                    type="text" 
                    className= {formErrors.fullName.length > 0 ? "error" : null}
                    placeholder="Full name" 
                    name="fullName" 
                    noValidate
                    onChange={this.handleChange}
                    required
                    value={this.state.fullName}
                    autoComplete="off"
                    />  
                    {formErrors.fullName.length > 0 && (<span className="errorMessage">{ formErrors.fullName}</span>)} 
                </div>

                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    className= {formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email" 
                    name="email" 
                    noValidate
                    onChange={this.handleChange}
                    required
                    value={this.state.email}
                    autoComplete="off"
                    />   
                    {formErrors.email.length > 0 && (<span className="errorMessage">{ formErrors.email}</span>)} 
                </div>

                <div className="MobileNumber">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input 
                    type="text" 
                    className= {formErrors.mobileNumber.length > 0 ? "error" : null}
                    placeholder="Mobile Number" 
                    name="mobileNumber" 
                    noValidate
                    onChange={this.handleChange}
                    required
                    value={this.state.mobileNumber}
                    autoComplete="off"
                    />   
                    {formErrors.mobileNumber.length > 0 && (<span className="errorMessage">{ formErrors.mobileNumber}</span>)} 
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    className= {formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password" 
                    name="password" 
                    noValidate
                    onChange={this.handleChangePassword}
                    required
                    value={this.state.password}
                    autoComplete="off"
                    /> 
                    {formErrors.password.length > 0 && (<span className="errorMessage">{ formErrors.password}</span>)}   
                </div>

                <div className="passwordConfirm">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input 
                    type="password" 
                    className= {formErrors.passwordConfirm.length > 0 ? "error" : null}
                    placeholder="Confirm Password" 
                    name="passwordConfirm" 
                    noValidate
                    onChange={this.handleChangeConfirm}
                    required
                    value={this.state.passwordConfirm}
                    autoComplete="off"
                    />   
                    {formErrors.passwordConfirm.length > 0 && (<span className="errorMessage">{ formErrors.passwordConfirm}</span>)} 
                </div>

                <div className="createAccount">
                    <button type="button" onClick={this.showCaptcha}>Create Account</button>
                    <small>Already Have An Account? <span className="signup_link">  <Link to="/Signin">  Sign in</Link></span> </small>
                </div>

                <Rodal visible={this.state.showCaptcha} animation={"door"} closeMaskOnClick= {false} onClose={()=>this.setState({showCaptcha:false})}>
                    <LoadCanvasTemplate/>
                    <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text" size="10" maxlength="6" onChange={this.handleChange}></input></div>
                    <Buttonn  variant="outlined" color="primary" style={{marginTop:'6%',marginLeft:'34%'}} type="submit">Submit</Buttonn>
                </Rodal>

            </form>

            <div className="popup_susscess">
                <Rodal visible={this.state.visible} closeMaskOnClick={false} onClose={this.hide.bind(this)} className = "success" >
                    <div className="popup_text">You Register Succesfully. Please Sign in.</div>
                    <button className="popup_btn" onClick={this.handleLink.bind(this)}>Sign in</button>
                </Rodal>

            </div>

        </div>
    );

  }
  
}

export default withRouter(Signup);
