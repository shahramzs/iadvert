import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHeart, faEye } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom';


import a from "../img/a.jpg"




class RowAdvert extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }
    componentDidMount() {
      document.body.style.backgroundColor = '#258EA6';
      //jquery
      
  }

  advert = e=> {
    e.preventDefault();
    this.props.history.push('/signin');
  }
  
  render(){
    return (
      <div className="RowAdvert">
            <Col sm style={{marginTop:"20px",textAlign:"center"}}>
              <div className="sm-advert" style={{backgroundImage:`url(${a})`}} onClick={this.advert}>
                <span className="number-pic" style={{background:"rgba(0,0,0,0.4)", width:"25%", height:"12%", float:"right", borderRadius:"5%", color: "white"}}>5&nbsp;<FontAwesomeIcon icon={faCamera} style={{background: "transparent", marginLeft: "15%"}}/> </span>
                <span className="favorite-star"><FontAwesomeIcon icon={faHeart} style={{background: "transparent"}}/></span>
                <span className="favorite_number" style={{background: "transparent", float: "right", color: "grey", marginRight: "54%"}}>23&nbsp;</span>
                <div style={{marginTop:"-10%"}}>
                <span className="number-view" style={{background: "transparent", float: "right", color: "grey", marginRight: "-47%"}}>105&nbsp;</span>
                <span className="view-icon"><FontAwesomeIcon icon={faEye} style={{background: "transparent",marginTop: "3%"}}/></span>
                </div>
                  <div className="sm-text-advert">
                      <h4 style={{float:"left"}}>SuperMarket</h4>
                      <p style={{float:"left"}}> Small Business</p>
                      <h4 className="sm-advert-time" style={{float: "right", background: "transparent" ,marginLeft: "-5%" ,fontSize: "13px", padding:"4%"}}>5 july 2020</h4>
                      <p className="sm-advert-city" style={{float: "right",marginTop: "7%", marginLeft: "3%", fontSize: "13px"}}>USA - Los Angeles</p>
                  </div>
              </div>
            </Col>
      </div>
    );

  }
  
}

export default withRouter(RowAdvert);
