import React, { Component} from 'react';
import { Navbar, Nav, Modal, Button, NavDropdown} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Search from '../Search'
import Cookies from 'js-cookie'
import { FaRegUserCircle } from "react-icons/fa";




class Navbarr extends Component {
    constructor(props){
        super(props);

        this.state = {
            show:false,
            tab:false
        }

        
    }
    
    componentDidMount() {
      var self = this;
      window.addEventListener("scroll", function(){
        if(window.pageYOffset > 130){
          self.setState({tab:true})
        } else {
          self.setState({tab:false})
        }
      })
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
      sessionStorage.clear();
      Cookies.remove('info');
      this.props.history.push('/');
    }

    help = e => {
      e.preventDefault();
      this.props.history.push('/AdvertStory');
    }

    account = (e) => {
      this.props.history.push('/account')
    }

    handleShowPopup = () => {
      this.setState({show:true})    
    }
    handleClosePopup = () => {
      this.setState({show:false}) 
    }

    advert = () =>{
      this.props.history.push('/');
    }

    saved = () => {
      this.props.history.push('/Saved');
    }
    
  render(){

    return (
      <div> 
{ sessionStorage.getItem('user') ? 
          <Navbar collapseOnSelect className="bg-dark p-lg-3" expand="lg" variant="dark" fixed="top">
          <Navbar.Brand style={{fontFamily:"cassanda",cursor:'pointer'}} onClick={this.advert}>iAdvert</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link style={{width:"136px"}} className="pl-lg-5" onClick={this.freeAdvert}>Free advert</Nav.Link>
              <Nav.Link style={{width:"136px"}} className="pl-lg-5 ml-5" onClick={this.help}>Help</Nav.Link> 
              {this.state.tab ?
               <NavDropdown title={<FaRegUserCircle size="2rem"/>} id="collasible-nav-dropdown" style={{width:"110px"}} className="pl-lg-5">
               <NavDropdown.Item onClick={this.account}>account</NavDropdown.Item>
               <NavDropdown.Item onClick={this.saved}>Saved</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={this.signout}>Sign out</NavDropdown.Item>
             </NavDropdown>
            :  
              <NavDropdown title={sessionStorage.getItem('user')} id="collasible-nav-dropdown" style={{width:"110px"}} className="pl-lg-5">
                  <NavDropdown.Item onClick={this.account}>account</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.saved}>Saved</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.signout}>Sign out</NavDropdown.Item>
                </NavDropdown>
             }
                </Nav>
                  <Nav className="justify-content-end" >
                      <Nav.Link className="ertyhg" onClick={this.handleShowPopup}>
                         Search
                      </Nav.Link>
                  </Nav>
                 </Navbar.Collapse>
                 </Navbar> 
                 :
                 <Navbar collapseOnSelect className="bg-dark p-lg-3" expand="lg" variant="dark" fixed="top">
                    <Navbar.Brand style={{fontFamily:"cassanda" ,cursor:'pointer'}} onClick={this.advert}>iAdvert</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                   <Nav.Link style={{width:"136px"}} className="pl-lg-5" onClick={this.signin}>Free advert</Nav.Link>
                   <Nav.Link style={{width:"136px"}} className="pl-lg-5 ml-5" onClick={this.help}>Help</Nav.Link>
                <NavDropdown title="Register" id="collasible-nav-dropdown" style={{width:"110px"}} className="pl-lg-5">
                  <NavDropdown.Item  onClick={this.signup}>Sign up</NavDropdown.Item>
                  <NavDropdown.Item  onClick={this.signin}>Sign in</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Discounts</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end" >
                <Nav.Link  eventKey={2} className="ertyhg" onClick={this.handleShowPopup}>
                  Search
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

            }   

              <Modal 
                show={this.state.show} 
                onHide	={this.handleClosePopup} 
                size="lg" 
                dialogClassName="modal-100w"  
                backdrop="static" 
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                  <Modal.Header closeButton>
                    <Modal.Title>Search Advert</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div style={{marginTop: "-13%"}}>
                      <Search/>
                    </div> 
                  </Modal.Body>

                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClosePopup}>
                        Close
                      </Button>
                  </Modal.Footer>
               </Modal>  
      </div>
     
    );

   }

}

export default withRouter(Navbarr)
