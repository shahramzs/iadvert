import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import { MdShoppingCart, MdLocalShipping, MdLocalParking } from "react-icons/md";
import { AiFillGift, AiFillLike } from "react-icons/ai";
import { GiPriceTag } from "react-icons/gi"
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from '@material-ui/icons/Map';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
var numeral = require('numeral');



let SERVER_URL = "http://127.0.0.1:8000";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      details:[],
      x:[],
      num:0,
    };
  }
    
  async componentDidMount() {
    // const { token } = queryString.parse(this.props.location.search);
    const token = this.props.match.params.token;
   let url = `${SERVER_URL}/src/api/details.php`;
    
    const response = await fetch(url  + '?token='+ token);
    const data = await response.json();
    this.setState({data})
    //console.log('data',this.state.data);

    this.state.data.details && this.state.data.details.map(x => 
        this.setState({x:x, num:x.like_num})
      )
      document.title  = `${this.state.x.name} / Advert`; 

  }    
  
  componentWillReceiveProps(props){
    if(props.like=== 'inc'){
      this.setState({num:parseInt(this.state.num) + 1})
      console.log('likeInc',props.like)
    }else if(props.like === 'dec'){
      this.setState({num:parseInt(this.state.num) - 1})
      console.log('likeDec',props.like)
    }
  }
    
  render(){
    console.log('like',this.props.like)
    return (
      <div className="Details">
        <Container fluid>
          <Row>
            <Col>
               <h1 className="title2">{this.state.x.name}</h1>
            </Col>
            <Col>
              <h5 className="category2">{this.state.x.cat} / {this.state.x.title}</h5>
            </Col>
          </Row>  

          <Row>
            <Col>
              <div className="country2">{this.state.x.country} - {this.state.x.city}</div>
            </Col>
          </Row> 
          <Row>
          <Col>
                {/* <div className="details-like"><AiFillLike size="2rem"/>{' '}<i>{this.state.x.like_num ? numeral(this.state.x.like_num).format('0,0') : 0}</i></div> */}
                <div className="details-like"><AiFillLike size="2rem"/>{' '}<i>{numeral(this.state.num).format('0,0') }</i></div>
            </Col>
            <Col>
                <div className="details-view"><i>{this.state.x.view ? numeral(this.state.x.view).format('0,0') : 0}</i>{' '} <strong> Views</strong></div>
            </Col>
          </Row>
          <div className="line"></div>
          <Row className="options">
            <Col>
            <h3 style={{marginLeft:'3rem',marginTop:'-2%'}}><ListIcon style={{ fontSize: '3rem'}}/> More Features</h3>
            <ul>
              {this.state.x.internetShopping === 'true'  ? <li><MdShoppingCart size="1.5rem"/>{' '}<strong>internet shopping</strong><br/>
              <small className="small">you can buy any stuff from internet.</small>
              </li> : '' }
              {this.state.x.parking === 'true' ? <li><MdLocalParking size="1.5rem"/>{' '} <strong>parking</strong><br/>
              <small className="small">this business place have private parking for customers.</small>
              </li> : '' }
              {this.state.x.specialGift === 'true' ? <li><AiFillGift size="1.5rem"/>{' '} <strong>Special gift for customers</strong><br/>
              <small className="small">the business owners have special gift for customers.</small>
              </li> : '' }
              {this.state.x.specialDiscount === 'true' ? <li><GiPriceTag size="1.5rem"/> {' '}<strong>Special Discount for customers</strong><br/>
              <small className="small">the business owners have special discount for customers.</small>
              </li> : '' }
              {this.state.x.freeDelivery === 'true' ? <li><MdLocalShipping size="1.5rem"/>{' '} <strong>free delivery</strong><br/>
              <small className="small">this business place have free delivery.</small>
              </li> : '' }
            </ul>
            </Col>

            <Col>
              <ul className="options-address">
              <li>
                  <p className="tryui"><PersonIcon style={{marginLeft:'-7%', color:'grey'}}/>{' '}<strong style={{marginLeft:'2%'}}>Full Name</strong></p><br/>
                  <p className="rer3t"><i>{this.state.x.fullname}</i></p>
                </li>
                <li>
                  <p className="tryui"><MapIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}>Region</strong></p><br/>
                  <p className="rer3t"><i>{this.state.x.region}</i></p>
                </li>
                <li>
                  <p className="tryui"><PublicIcon style={{marginLeft:'-7%',color:'grey'}}/>{''}<strong style={{marginLeft:'2%'}}> Country - City</strong></p><br/>
                  <p className="rer3t"><i>{this.state.x.country} - {this.state.x.city}</i></p>
                </li>
                <li>
                  <p className="tryui"><LocationCityIcon style={{marginLeft:'-7%',color:'grey'}}/><strong style={{marginLeft:'2%'}}>State</strong></p><br/>
                  <p className="rer3t"><i>{this.state.x.state}</i></p>
                </li>
                <li>
                  <p className="tryui"><LocationOnIcon style={{marginLeft:'-7%',color:'grey'}}/><strong style={{marginLeft:'2%'}}>ZipCode</strong></p><br/>
                  <p className="rer3t"><i>{this.state.x.zipCode}</i></p>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="line"></div>
        </Container>  
     </div>
    );

  }
  
}

export default withRouter(Details); 