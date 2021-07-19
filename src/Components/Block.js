import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Container, Row, Col, Button, Nav, Navbar, Form, Toast } from 'react-bootstrap'
import { MdBlock, MdSecurity } from "react-icons/md";

const SERVER_URL = "http://127.0.0.1:8000";

const rand=()=>Math.random(0).toString(9).substr(2);
const length = 6;
const number=(length)=>(rand()+rand()+rand()+rand()+rand()+rand()+rand()).substr(0,length);
const code = number(length);

class Block extends Component {
  constructor(props){
    super(props);

    this.state = {
        mobile: "",
        country:"",
        error_number:"",
        error_alphabet:"",
        data:[]
    };
  }
  componentDidMount() {
    
    const url = `${SERVER_URL}/src/api/unblock.php`;
    
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

            const url2 = `${SERVER_URL}/src/api/userBlock.php`;
            axios.post(url2).then(response => response.data).then((data) => {
            this.setState({users : data})
            console.log(this.state.users)
        })
  }
  
signOut = (e) => {
    e.preventDefault();
    sessionStorage.setItem('user','');
    sessionStorage.clear();
    this.props.history.push('/');
}

change = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { mobile } = this.state;

    if(mobile.length === 0){
        this.setState({error_alphabet: null});
        this.setState({error_number: null});
    }

    if(mobile.length < 11 && mobile.length > 0){
        this.setState({error_number: 'The mobile number must be 11 numbers.'});
    }else{
        this.setState({error_number: ''});
    }

    if(!Number(mobile) && mobile.length > 0){
        this.setState({error_alphabet: 'Mobile number is not correct. Please choose another one'});
    }else{
        this.setState({error_alphabet: ''});
    }

    
    
    this.setState({[name]: value }, () => console.log(this.state));
}

submit = (e) => {
    e.preventDefault();
    console.log(`
    -- Submitting --
    user : ${sessionStorage.getItem('user')}
    country : ${this.state.country}
    mobile : ${this.state.mobile}
    code : ${code}
    `);

    let formData = new FormData();
    formData.append('user',sessionStorage.getItem('user'));
    formData.append('country', this.state.country);
    formData.append('mobile', this.state.mobile);
    formData.append('code', code);
    var self = this;
    axios({
        method: 'post',
        url : `${SERVER_URL}/src/api/userBlock.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }}
    })
    .then(function(response){
        //handle success
        console.log(response)
        if(response.data === "ok"){
            //send sms to mobile number
            self.props.history.push({pathname:'/verification' });
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
  
  render(){

    return (
      <div className="block">
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand style={{fontFamily:"cassanda",marginLeft:"5%",fontSize:"1.5rem"}}>Advert</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-auto">
                <Nav>
                    <Nav.Link onClick={this.signOut}>Sign out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Container fluid>
            <Row>
                <Col>
                <Toast style={{margin:"0 auto",background:"tomato"}}>
                    <Toast.Header closeButton={false}>
                        <MdBlock size="2rem"className="rounded mr-2" color="red" />
                        <strong className="mr-auto" style={{textAlign:"center"}}>Block User</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body style={{textAlign:"center"}}>Your Account Access Limited.</Toast.Body>
                    <Toast.Body style={{textAlign:"center"}}>You Need To Confirm Your Mobile Number.</Toast.Body>
                </Toast>
                </Col>
            </Row>
           
            <Row style={{padding:"2rem"}}>
                <h2>Confirm your phone number</h2>
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasiccountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Enter your country" name="country" size="lg" onChange={this.change} required>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                select your country by code.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicMobile"> 
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Mobile number" name="mobile" size="lg" required onChange={this.change} className= {this.state.error_number || this.state.error_alphabet ? "text-error" : null}/>
                                <Form.Text className="text-muted">
                                Add your Mobile Number to Confirm.
                                </Form.Text>
                                {this.state.error_number && (<span className="text-error" style={{fontSize:"0.9rem",color:"red"}}>{this.state.error_number}</span>)}
                                <br />
                                {this.state.error_alphabet && (<span className="text-error" style={{fontSize:"0.9rem",color:"red"}}>{this.state.error_alphabet}</span>)}  
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicCheckbox">
                               <Form.Check type="checkbox" label="Text me a link" size="lg"/>
                               <Form.Text className="text-muted">
                                    <MdSecurity size="1.5rem" color="red"/>{' '}Your information is secured.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" size="lg">
                              Confirm
                            </Button>  
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
      </div>
    );

  }
  
}

export default withRouter(Block);
