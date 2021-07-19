import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Cookies from 'js-cookie'
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


class Signin extends Component {
    constructor(props){
       super(props);

       this.state = {
           email:  null,
           password: null,
           show: false,
           visible: false,
           users:[],
           formErrors:{
            email: "",
            password: "",
           },
           hashEmail:'',
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
    async componentDidMount(){
        document.title  = "Sign in / Advert";
        const url = `${SERVER_URL}/src/api/signin.php`;
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
        this.setState({show:false})
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        
        switch (name) {
            case 'email' :
                formErrors.email = emailRegex.test(value) ? '' : 'Invalid Email address';
                this.setState({captcha:false})
                break;
            case 'password' :
                formErrors.password = value.length < 8 ? 'Minimum 8 Characters Required' : '';
                this.setState({captcha:false})
                break;

            default : break;

        }
    

        this.setState({ formErrors, [name]: value });
    }  
    handleSubmit = e => {
        e.preventDefault();

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
            email : ${this.state.email}
            password : ${this.state.password}
            `);

            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);


            var self = this;
             axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/signin.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }},
            })
            .then(function(response){
                //handle success

                console.log(response)
               if(response.data === self.state.email){
                sessionStorage.setItem('user', response.data);
                Cookies.set('info', window.btoa(response.data));
                sessionStorage.setItem('code',window.btoa(new Date().getMilliseconds()))
                Cookies.set('code', sessionStorage.getItem('code'));
                self.props.history.push('/')
               }else if(response.data === 'admin'){
                sessionStorage.setItem('admin', response.data);
                Cookies.set('admin', window.btoa(response.data));
                self.props.history.push('/admin')
               }else if(response.data === 'Your Email or Password is wrong.'){
                self.setState({visible : true})
               }

                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })

        }else{
            this.setState({show: true})
            console.error('Form Invalid - Display Error Message : ');
        }
    }else {
        alert('Captcha Code Does Not Match');
    }

    }
    forget = e => {
        e.preventDefault();
        this.props.history.push('/Forget');
    }
    back = e => {
        e.preventDefault();
        this.props.history.push('/');
    }
    showCaptcha = (e) => {
        if(this.state.email === null || this.state.password === null){
            this.setState({show:true})
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
        <div className="wrapper" >
            <Helmet>
                <meta name="title" property="title" content="Sign in"/>
                <meta name="description" property="description" content="Sign in to your profile in advert site - Add free advertisement for your business - Add some discount "/>
                <meta name="keyword" property="keyword" content="Sign in - Free Business advertisement - Enter to your profile "/>
            </Helmet>
            <Button variant="secondary" as="button" type="button" style={{top:'3%', left:'1%',position:"absolute"}} onClick={this.back}>Back to Advert</Button>
            <h1 className="siteName">Advert</h1>
            {this.state.show && <div className="error-empty">Please fill all of the fields.</div> }
            <form  className="form-wrapper-signin" onSubmit={this.handleSubmit} noValidate>
             <h1>Sign in to your account</h1>
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
                    autoComplete="off"
                    />   
                    {formErrors.email.length > 0 && (<span className="errorMessage">{ formErrors.email}</span>)} 
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    className= {formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password" 
                    name="password" 
                    noValidate
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    /> 
                    {formErrors.password.length > 0 && (<span className="errorMessage">{ formErrors.password}</span>)}   
                </div>

                <div className="createAccount">
                    <button type="button" onClick={this.showCaptcha}>Signin</button>
                    <small>Don't have an account? <span className="signin_link">  <Link to="/signup">  Sign up </Link> </span> </small>
                </div>

                <Rodal visible={this.state.showCaptcha} animation={"door"} closeMaskOnClick= {false} onClose={()=>this.setState({showCaptcha:false})}>
                    <LoadCanvasTemplate/>
                    <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text" size="10" maxlength="6" onChange={this.handleChange}></input></div>
                    <Buttonn  variant="outlined" color="primary" style={{marginTop:'6%',marginLeft:'34%'}} type="submit">Submit</Buttonn>
                </Rodal>

            </form>

            <div className="popup_susscess">
                <Rodal visible={this.state.visible} animation={"door"} closeMaskOnClick= {false} onClose={this.hide.bind(this)}>
                    <div style={{marginTop: "30px"}} className="popup_text">Your email or password is wrong. please try again.</div>
                    <button className= 'forget_password' onClick={this.forget}>Forget Password?</button>
                </Rodal>
            </div>

        </div>

    );

  }
  
}

export default withRouter(Signin);
