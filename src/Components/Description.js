import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap';
import { RiFileList3Line } from "react-icons/ri";
import { BsClock } from "react-icons/bs";
import queryString from 'query-string'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Tooltip from '@material-ui/core/Tooltip';
import Rodal from 'rodal'
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';


let SERVER_URL = "http://127.0.0.1:8000";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      x:[],
      visible:false,
      data2:[]
    };
  }
    
  async componentDidMount() {

    // const { token } = queryString.parse(this.props.location.search);
    const token = this.props.match.params.token;
   let url = `${SERVER_URL}/src/api/description.php`;
    
    const response = await fetch(url  + '?token='+ token);
    const data = await response.json();
    this.setState({data})
    // console.log('data',this.state.data);

   this.state.data.description && this.state.data.description.map(x => 
        this.setState({x})
      )

    let url2 = `${SERVER_URL}/src/api/fetchMoreInfoUser.php`;
    const response2 = await fetch(url2  + '?token='+ token);
    const data2 = await response2.json();
    this.setState({data2})
  }    
  
      
  
  render(){

    return (
      <div className="Description">
        <Container fluid>
            <Row>
                <Col>
                    <div className="description">
                    <RiFileList3Line size="2rem"/><h3>Description</h3>
                    <p>
                      {this.state.x.details}
                    </p>
                    <BsClock size="1.5rem"/><p><strong>Open Hours</strong></p>
                    <p style={{marginTop:"-1%"}}><i>{this.state.x.start}</i></p>
                    </div>
                    <Tooltip title="Show More Information About This Business Advert">
                         <LiveHelpIcon style={{marginLeft:'3rem',fontSize:'35',color:'red',cursor:'pointer'}} onClick={()=> this.setState({visible:true})}/>
                    </Tooltip>
                    <div className="line"></div>
                </Col>
            </Row>
        </Container>

        <Rodal visible={this.state.visible} onClose={()=>this.setState({visible:false})} animation='fade' width={1000} height={500}>
           <h5 style={{textAlign:'center',margin:'2rem'}}>More Information</h5>
            {this.state.data2.info && this.state.data2.info.length === 0 ? <Alert variant="outlined" severity="error" style={{marginTop:"5rem"}}>There is not any more information! <strong>you can add more information about your business from your profile.</strong></Alert> : 
            <React.Fragment>
            {this.state.data2.info && this.state.data2.info.map((info , i) => 
            <React.Fragment key={i}>
               <Typography >{info.text}</Typography> <br/>
            </React.Fragment>
            )}
            </React.Fragment>
          }
        </Rodal>

      </div>
    );

  }
  
}

export default withRouter(Description);
