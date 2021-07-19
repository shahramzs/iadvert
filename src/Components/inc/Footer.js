import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import ContentInfo from './ContentInfo'
import { withRouter, Link } from 'react-router-dom'




class Footer extends Component {


  advertStory = (e) => {
    e.preventDefault();
    this.props.history.push('/AdvertStory');
  }

  render(){

    return (
      <div className="footer">
        <Container>
          <Row>
            <Col className='about'>
              <ul>
                <li style={{fontWeight:"bold", fontSize:"14px"}}>ABOUT</li>
                <li>Diversity & Belonging</li>
                <li>Against Discrimination</li>
                <li>Accessibility</li>
                <li>Trust & Safety</li>
              </ul>
            </Col>

            <Col className='COMMUNITY'>
            <ul>
                <li style={{fontWeight:"bold", fontSize:"14px"}}>COMMUNITY</li>
                <Link to="" onClick={this.advertStory}><li>iAdvert Story</li></Link>
                <li>iAdvert Associates</li>
                <li>iAdvert for Work</li>
                <li>Gift cards</li>
              </ul>
            </Col>

            <Col className='ADVERT'>
            <ul>
                <li style={{fontWeight:"bold", fontSize:"14px"}}>iADVERT</li>
                <li>Free Advert</li>
                <li>Open Homes</li>
                <li>Community Center</li>
                <li>Resource Center</li>
              </ul>
            </Col>

            <Col className='SUPPORT'>
            <ul>
                <li style={{fontWeight:"bold", fontSize:"14px"}}>SUPPORT</li>
                <li>Help Center</li>
                <li>Updates for COVID-19</li>
                <li>Cancellation options</li>
                <li>Neighborhood Support</li>
              </ul>
            </Col>
          </Row>
        </Container>

        <ContentInfo />
      </div>
    );

  }
  
}

export default withRouter(Footer);
