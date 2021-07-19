import React from 'react';
import { Navbar, Container,  Nav} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import { MdVideocam } from "react-icons/md";


class UploadNav extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {
       

    }

    

    
    image = (e) => {
        const code = sessionStorage.getItem('token');
        e.preventDefault();
        this.props.history.push({pathname:'/uploadImage',token: code});
    }
     video = (e) => {
        const code = sessionStorage.getItem('token');
        e.preventDefault();
        this.props.history.push({pathname:'/uploadVideo',token: code});
    }

     signout = (e) => {
        e.preventDefault();
        sessionStorage.setItem('user','');
        sessionStorage.clear();
        this.props.history.push('/');
    }
    
    render(){
    return (
      <div className="uploadNav">
            <Navbar fixed="top" expand="sm" variant="dark" bg="dark" >
                <Container>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={this.image} ><RiImageAddLine size="5rem" className="imageIcon"/></Nav.Link>
                        <Nav.Link onClick={this.video}><MdVideocam size="5rem" className="videoIcon"  /></Nav.Link>
                        <Nav.Link onClick={this.signout} className="uploadSignout">Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
      </div>
    );
    }
  
}

export default withRouter(UploadNav);
