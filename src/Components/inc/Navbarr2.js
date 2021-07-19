import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import $ from 'jquery';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie'




class Navbarr2 extends Component {
    constructor(props){
        super(props);

        this.state = {

        }

        
    }
    
    componentDidMount() {
          
    }
      
    signin = e => {
      e.preventDefault();
      this.props.history.push('../signin');
    }

    signup = e => {
      e.preventDefault();
      this.props.history.push('../signup');
    }

    freeAdvert = e => {
      e.preventDefault();
      this.props.history.push('../freeAdvert');
    }

    signout = e => {
      e.preventDefault();
      sessionStorage.setItem('user','');
      sessionStorage.setItem('code','');
      Cookies.remove('info');
      sessionStorage.clear();
      this.props.history.push('/');
    }

    help = e => {
      e.preventDefault();
      this.props.history.push('/help');
    }

    account = (e) => {
      this.props.history.push('/account')
    }
    
  render(){
    return (
      <div className="nabvarr">
  
{ sessionStorage.getItem('user') ? 
          <Navbar className="p-lg-3" expand="lg" sticky="top" style={{backgroundColor:"transparent !important",color:"#000",fontWeight:"bold"}}>
          <Navbar.Brand style={{fontFamily:"cassanda",color:"#000",fontWeight:"bold"}} href="/">iAdvert</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link style={{width:"136px",color:"#000",fontWeight:"bold"}} className="pl-lg-5" onClick={this.freeAdvert}>Free advert</Nav.Link>
              <Nav.Link style={{width:"136px",color:"#000",fontWeight:"bold"}} className="pl-lg-5 ml-5" onClick={this.help}>Help</Nav.Link>
              <NavDropdown title={sessionStorage.getItem('user')} id="basic-nav-dropdown" style={{width:"110px",color:"#000",fontWeight:"bold"}} className="pl-lg-5">
                  <NavDropdown.Item style={{color:"#000",fontWeight:"bold"}} onClick={this.account}>account</NavDropdown.Item>
                  <NavDropdown.Item style={{color:"#000",fontWeight:"bold"}} onClick={this.signin}>Saved</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{color:"#000",fontWeight:"bold"}} onClick={this.signout}>Sign out</NavDropdown.Item>
                </NavDropdown> 
                </Nav>
              {/* <Form inline className="justify-content-end">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 search" />
                  <Button variant="outline-success">Search</Button>
              </Form> */}
                  <Nav className="mr-auto">
                    <Nav.Link style={{color:"#000",fontWeight:"bold"}} >More deets</Nav.Link>
                    <Nav.Link eventKey={2} style={{color:"#000",fontWeight:"bold"}} >
                      Dank memes
                    </Nav.Link>
                </Nav>
                 </Navbar.Collapse>
                 </Navbar> 
                 :
                 <Navbar className="p-lg-3" expand="lg" sticky="top" style={{backgroundColor:"transparent !important",color:"#000",fontWeight:"bold"}}>
                    <Navbar.Brand style={{fontFamily:"cassanda",color:"#000",fontWeight:"bold"}} href="/">iAdvert</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                   <Nav.Link style={{width:"145px",color:"#000",fontWeight:"bold"}} className="pl-lg-5" onClick={this.signin}>Free advert</Nav.Link>
                   <Nav.Link style={{width:"136px",color:"#000",fontWeight:"bold"}} className="pl-lg-5 ml-5" onClick={this.help}>Help</Nav.Link>
                <NavDropdown title="Register" id="basic-nav-dropdown" style={{width:"110px",color:"#000"}} className="pl-lg-5">
                  <NavDropdown.Item  style={{color:"#000",fontWeight:"bold"}} onClick={this.signup}>Sign up</NavDropdown.Item>
                  <NavDropdown.Item  style={{color:"#000",fontWeight:"bold"}} onClick={this.signin}>Sign in</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{color:"#000",fontWeight:"bold"}}>Discounts</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* <Form inline className="justify-content-end">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 search" />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <Nav>
                <Nav.Link style={{color:"#000",fontWeight:"bold"}}>More deets</Nav.Link>
                <Nav.Link eventKey={2} style={{color:"#000",fontWeight:"bold"}}>
                  Dank memes
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
  }
      </div>
    );

  }
  
}

export default withRouter(Navbarr2);
