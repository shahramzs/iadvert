import React, {  Component } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { withRouter } from 'react-router'
import axios from 'axios'
import contact from '../img/contact.jpg'

let SERVER_URL = "http://127.0.0.1:8000";

class Contact extends Component{
        constructor(props){
            super(props);

            this.state = {
                phone: "",
                email: "",
                instagram: "",
                linkedin: "",
                facebook:"",
                twitter:"",
                web: "",
                data:[],
                loading:false
        }
    }

    componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} / Add Contact`; 
        document.body.style.backgroundColor = '#ffffff';
        //jquery
        const url = `${SERVER_URL}/src/api/contact.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({data : data})
            console.log(this.state.data)
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }


    handleSubmit = (e) => {
        // const {data} = this.props.location;
        e.preventDefault();
        this.setState({loading:true})
        console.log(`
            -- Submitting --
            user : ${sessionStorage.getItem('user')}
            phone : ${this.state.phone}
            email : ${this.state.email}
            instagram : ${this.state.instagram}
            linkedin : ${this.state.linkedin}
            facebook : ${this.state.facebook}
            twitter : ${this.state.twitter}
            web : ${this.state.web}
            token: ${sessionStorage.getItem('token')}
            `);

            let formData = new FormData();
            formData.append('user',sessionStorage.getItem('user'));
            formData.append('phone', this.state.phone);
            formData.append('email', this.state.email);
            formData.append('instagram', this.state.instagram);
            formData.append('linkedin', this.state.linkedin);
            formData.append('facebook', this.state.facebook);
            formData.append('twitter', this.state.twitter);
            formData.append('web', this.state.web);
            formData.append('token',sessionStorage.getItem('token'));
            
            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/contact.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                    self.setState({loading:false})
                    self.props.history.push({pathname:'/content',  token: sessionStorage.getItem('token') });
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



    backHandle = (e) => {
        e.preventDefault();
        this.props.history.push('/location');
    }

    
    render(){

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }
           
        return(
                <div className="contact">
                    {this.state.loading && <div id="loader">
                                                    <div className="loading-dots">
                                                        <div className="bounce"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div> 
                        }
                    <form onSubmit={this.handleSubmit}>
                        <Container fluid >
                                    <Row>
                                        <Col sm={7} className="contact-info">
                                                <h3>How Can Customers Contact You?</h3>
                                                <Form.Label>Your Business Telephone Number</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="eg.01.555.0089" name="phone" onChange={this.handleChange} value={this.state.phone} required/>
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control size="lg" type="email" placeholder="eg.tigerclub@yahoo.com" name="email" onChange={this.handleChange} value={this.state.email} required/>
                                                <Row>
                                                    <Col className="Instagram">
                                                        <Form.Label>Instagram</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.@teslamotors" name="instagram" onChange={this.handleChange} value={this.state.instagram} required/>
                                                    </Col>
                                                    <Col className="Linkedin">
                                                        <Form.Label>Linkedin</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.tesla-motors" name="linkedin" onChange={this.handleChange} value={this.state.linkedin} required />
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                                <Row>
                                                    <Col className="Facebook">
                                                        <Form.Label>Facebook</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.@teslamotors" name="facebook" onChange={this.handleChange} value={this.state.facebook} required/>
                                                    </Col>
                                                    <Col className="Twitter">
                                                        <Form.Label>Twitter</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.tesla-motors" name="twitter" onChange={this.handleChange} value={this.state.twitter} required />
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Site or Weblog (optional)</Form.Label>
                                                        <Form.Control size="lg" type="text" placeholder="eg.www.tesla.com" name="web" onChange={this.handleChange} value={this.state.web} />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col> <Button onClick={this.backHandle} variant="link" size="lg"><MdKeyboardArrowLeft size="2rem" />Back</Button></Col>
                                                    <Col style={{marginLeft:"9rem"}}><Button type="submit" className="next1" variant="info" size="lg">Next</Button>{' '}</Col>
                                                    
                                                </Row>
                                        </Col>
                                        <Col sm={5} className="contact-image">
                                            <Row>
                                                <Col>
                                                     <img src={contact} alt="contact" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                        </Container>
                   </form>
                </div>
            );
    }
    
}

export default withRouter(Contact);
