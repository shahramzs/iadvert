import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
 



class ContentInfo extends Component {
  render(){

    return (
      <div className="ContentInfo">
              <Container>
                  <Row>
                        <Col xs={5} className="copyright-col-1">
                            © 2021 iAdvert, Inc. All rights reserved· Privacy· Terms· Sitemap
                        </Col>

                        <Col style={{textAlign:"right"}} className="en">
                            <FontAwesomeIcon icon={faMap} style={{background: "transparent"}}/> English(US)
                        </Col>
                        <Col className="socail">
                           <ul style={{textAlign:"right"}}>
                               <li><FaFacebookF size={"1.5em"}/> </li>
                               <li><FaInstagram size={"1.5em"}/></li>
                               <li><FaLinkedinIn size={"1.5em"} /></li>
                               <li><FaTwitter size={"1.5em"}/></li>
                           </ul>
                        </Col>
                  </Row>
              </Container>
      </div>
    );

  }
  
}

export default ContentInfo;
