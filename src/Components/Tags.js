import React, { Component } from 'react';
import { Row, Col, Card} from 'react-bootstrap'
import { Link, withRouter } from "react-router-dom";
import business1 from '../img/1.svg'
import business2 from '../img/2.svg'
import business3 from '../img/3.svg'
import business4 from '../img/4.svg'
import business5 from '../img/5.svg'
import business6 from '../img/6.svg'
import Skeleton from '@material-ui/lab/Skeleton';
var numeral = require('numeral');


const SERVER_URL = "http://127.0.0.1:8000";

class Tags extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tag:['Small-Business', 'Internet-Business', 'Non-Internet-Service-Business', 'Industrial-Business', 'Home-Business', 'Medical-Business'],
      tagNum:[],
      num:[],
      loading:true
    };
  }
   async componentDidMount() {
      let url = `${SERVER_URL}/src/api/catNumber.php`;
      const response = await fetch(url);
      const tagNum = await response.json();
      this.setState({tagNum:tagNum, loading:false})
      
    
      if(this.state.tagNum){
        this.state.tagNum.catNumber.map(num => 
            this.setState({num:[num.SB,num.INB,num.NISB,num.IB,num.HB,num.MB]})
          )
      }
      
  }

  space = (url) => {
    var str=url.toString();
    str=str.split("-").join(" ");
    return str;
    }
  
  render(){

    return (
      <div className="Tags">
        {this.state.loading ? <Row style={{marginLeft:'0%'}}>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                                <Col><Skeleton variant="rect" width={150} height={150} /></Col>
                              </Row> 
        :
          <Row>
            <Col style={{textAlign:"center", background:"transparent"}}>
              <Link to={`/searchCategory/${this.state.tag[0]}`} style={{textDecoration:'none', color:'black'}}>
                <Card style={{width:"80%", background:"transparent"}} >
                    <Card.Img variant="top" src={business1} style={{width:"40%", margin:"0 auto"}}/>
                      <Card.Body>
                        <Card.Title style={{fontSize:"15px"}}>{this.space(this.state.tag[0])}</Card.Title>
                        <Card.Text>{this.state.num[0] ? numeral(this.state.num[0]).format('0,0') : 0}</Card.Text>
                      </Card.Body>
               </Card>
            </Link>
            </Col>

            <Col sm style={{textAlign:"center"}}>
              <Link to={`/searchCategory/${this.state.tag[1]}`} style={{textDecoration:'none', color:'black'}}>
                    <Card style={{width:"80%", background:"transparent"}}>
                            <Card.Img variant="top" src={business2} style={{width:"40%", margin:"0 auto"}}/>
                              <Card.Body>
                                <Card.Title style={{fontSize:"14px"}}>{this.space(this.state.tag[1])}</Card.Title>
                                <Card.Text>{this.state.num[1] ? numeral(this.state.num[1]).format('0,0') : 0}</Card.Text>
                              </Card.Body>
                    </Card>
              </Link>
            </Col>

            <Col sm style={{textAlign:"center"}}> 
              <Link to={`/searchCategory/${this.state.tag[2]}`} style={{textDecoration:'none', color:'black'}}>
                  <Card style={{width:"80%", background:"transparent"}}>
                    <Card.Img variant="top" src={business3} style={{width:"35%", margin:"0 auto"}}/>
                        <Card.Body>
                            <Card.Title style={{fontSize:"12px",width:"102%"}}>{this.space(this.state.tag[2])}</Card.Title>
                            <Card.Text>{this.state.num[2] ? numeral(this.state.num[2]).format('0,0') : 0}</Card.Text>
                          </Card.Body>
                  </Card>
              </Link>
            </Col>

            <Col sm style={{textAlign:"center"}}>
              <Link to={`/searchCategory/${this.state.tag[3]}`} style={{textDecoration:'none', color:'black'}}>
                    <Card style={{width:"80%", background:"transparent"}} >
                      <Card.Img variant="top" src={business4} style={{width:"40%", margin:"0 auto"}}/>
                          <Card.Body>
                              <Card.Title style={{fontSize:"13px",width:"102%"}}>{this.space(this.state.tag[3])}</Card.Title>
                              <Card.Text>{this.state.num[3] ? numeral(this.state.num[3]).format('0,0') : 0}</Card.Text>
                            </Card.Body>
                    </Card>
              </Link>
            </Col>

            <Col sm style={{textAlign:"center"}}> 
              <Link to={`/searchCategory/${this.state.tag[4]}`} style={{textDecoration:'none', color:'black'}}>
                  <Card style={{width:"80%", background:"transparent"}} >
                      <Card.Img variant="top" src={business5} style={{width:"40%", margin:"0 auto"}}/>
                          <Card.Body>
                              <Card.Title style={{fontSize:"15px"}}>{this.space(this.state.tag[4])}</Card.Title>
                              <Card.Text>{this.state.num[4] ? numeral(this.state.num[4]).format('0,0') : 0}</Card.Text>
                            </Card.Body>
                  </Card>
              </Link>
            </Col>

            <Col sm style={{textAlign:"center"}}> 
              <Link to={`/searchCategory/${this.state.tag[5]}`} style={{textDecoration:'none', color:'black'}}>
                  <Card style={{width:"80%", background:"transparent"}} >
                      <Card.Img variant="top" src={business6} style={{width:"40%", margin:"0 auto"}}/>
                          <Card.Body>
                              <Card.Title style={{fontSize:"14px",width:"102%"}}>{this.space(this.state.tag[5])}</Card.Title>
                              <Card.Text>{this.state.num[5] ? numeral(this.state.num[5]).format('0,0') : 0}</Card.Text>
                            </Card.Body>
                  </Card>
              </Link>
            </Col>
          
            </Row>
          }
      </div>
    );

  }
  
}

export default withRouter(Tags);
