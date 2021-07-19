import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Button } from 'react-bootstrap'
import a from '../img/loader1.svg'
import $ from 'jquery'


const axios = require('axios').default;
const SERVER_URL = "http://127.0.0.1:8000";

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false)});
    

    Object.values(rest).forEach(val => {val === null && (valid = false)});
    return valid;
};

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class Forget extends Component {
    constructor(props){
       super(props);

       this.state = {
           email:  null,
          show:false,
          show2:false,
          show3: false,
        
           visible: false,

           users:[],

           formErrors:{
            email: "",
            loader:false
           }

       }
    
    }

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    componentDidMount(){
        document.title  = "Forget Password / Advert";

        const url = `${SERVER_URL}/src/api/forget.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({users : data})
            console.log(this.state.users)
        })

        $(document).ready(function(){
            $(".wrapper").css("filter", "blur(8px)");
            setInterval(function(){ $(".wrapper").css("filter", "blur(0px)");}, 3000);
        });
        
    }
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        
        switch (name) {
            case 'email' :
                formErrors.email = emailRegex.test(value) ? '' : 'Invalid Email address';
                break;
            default : break;

        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }


    handleSubmit = e => {
        e.preventDefault();

        this.setState({loader:true})

        if(formValid(this.state)){
            console.log(`
            -- Submitting --
            email : ${this.state.email}
            `);

            let formData = new FormData();
            formData.append('email', this.state.email);


            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/forget.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                if(response.data === "your password recovery correctly and sent to your email."){
                    self.setState({loader:false, visible : true, show: false, show2: false, show3: false})
                }else if(response.data === 'password recovery email did not send. please try again.'){
                    self.setState({loader: false, show: true, show2: false, show3: false})
                }else if(response.data === 'Your email dose not register in our system.'){
                    self.setState({loader:false, show2 : true, show: false, show3: false})
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })

        }else{
            this.setState({loader:false, show3: true, show: false, show2: false})
            console.error('Form Invalid - Display Error Message : ');
        }
    }

    back = e => {
        e.preventDefault();
        this.props.history.push('/signin');
    }

    signin = (e) => {
        e.preventDefault();
        this.props.history.push('/signin');
    }

  render(){
      const { formErrors } = this.state;
    return (
        <div className="wrapper">
            <Button variant="secondary" as="button" type="button" style={{top:'3%', left:'1%',position:"absolute"}} onClick={this.back}>Back to Advert</Button>
            <h1 className="siteName">Advert</h1>
            {this.state.show && <div className="error-forget">Recovery Password email didn't send. please try again.</div> }
            {this.state.show2 && <div className="error-forget">Your email dose not register in our system. please <Link to="/Signup" style={{textDecoration:'none'}}>sign up</Link></div> }
            {this.state.show3 && <div className="error-forget">Please Fill out All of the Fields and next Submit.</div> }
            <form className="form-wrapper-forget" onSubmit={this.handleSubmit} noValidate>
             <h1>Recovery Password</h1>
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
                    />   
                    {formErrors.email.length > 0 && (<span className="errorMessage">{ formErrors.email}</span>)} 
                </div>

                <div className="createAccount">
                    <button type="submit">Submit</button>
                    <small>Don't have an account? <span className="signin_link">  <Link to="/signup">  Sign up </Link> </span> </small>
                </div>
            </form>

            <div className="popup_susscess">
                <Rodal visible={this.state.visible} animation={"door"} closeMaskOnClick= {false}onClose={this.hide.bind(this)}>
                    <div style={{marginTop: "30px"}} className="popup_text">the password sent to your email. please check your email.</div>
                    <button className= 'sign_in' onClick={this.signin}>Sign in</button>
                </Rodal>
            </div>

            <Rodal visible={this.state.loader} animation={"door"} onClose={()=> this.setState({loader:false})}>
                <div style={{textAlign:'center', marginTop:'7%'}}>
                   <img src={a} alt="loader"/>
                   <p style={{fontSize:'1.5rem', fontWeight:'bold'}}>Please wait to send an email</p>
                </div>
            </Rodal>

        </div>
    );

  }
  
}

export default Forget;
