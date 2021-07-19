import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineContacts } from "react-icons/ai";
import Profile from './Profile'
import queryString from 'query-string'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import WebIcon from '@material-ui/icons/Web';

let SERVER_URL = "http://127.0.0.1:8000";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      x:[]
    };
  }
    
  async componentDidMount() {

    // const { token } = queryString.parse(this.props.location.search);
    const token = this.props.match.params.token;
   let url = `${SERVER_URL}/src/api/address.php`;
    
    const response = await fetch(url  + '?token='+ token);
    const data = await response.json();
    this.setState({data})
    // console.log('data',this.state.data);

   this.state.data.address && this.state.data.address.map(x => 
        this.setState({x})
      )

  }    
      
  
  render(){

    return (
      <Container fluid className="address">
        <Row>
            <Col>
            <AiOutlineContacts size="2rem"/>{' '}<h3>Contact Adverter</h3>
            </Col>
        </Row>
        <Row >
            <Col className="adser">
                <ul>
                    <li><LocationOnIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Address</strong></li><br/>
                    <p><i>{this.state.x.streetAddress}</i></p>
                    <li><AddLocationIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Optional Address</strong></li><br/>
                    <p><i>{this.state.x.optional}</i></p>
                    <li><EmailIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Email</strong></li><br/>
                    <p><i>{this.state.x.email}</i></p>
                    <li><PhoneInTalkIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Business phone</strong></li><br/>
                    <p><i>{this.state.x.phone}</i></p>
                    <li><WebIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Business Web site</strong></li><br/>
                    <p><i>{this.state.x.web}</i></p>
                </ul>
            </Col>

            <Col className="prtyuio23">
                <Profile/>
            </Col>
        </Row>
        <div className="line" style={{width:"101%",marginLeft:"-1%"}}></div>
      </Container>
    );

  }
  
}

export default withRouter(Address);
