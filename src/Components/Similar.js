import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import {Alert, AlertTitle} from '@material-ui/lab';
import Parts from './Parts'
import img from '../img/image.png'

let SERVER_URL = "http://127.0.0.1:8000";


class Similar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound:false,
      data:[],
      x:[],
      url:'',
      data2:[],
    };
  }
    
  async componentDidMount() {

    // const { token } = queryString.parse(this.props.location.search);
    const token = this.props.match.params.token;
    let url = `${SERVER_URL}/src/api/similar.php`;
      
      const response = await fetch(url  + '?token='+ token);
      const data = await response.json();
      this.setState({data})
      //  console.log('data',this.state.data);

      if(this.state.data.similar && this.state.data.similar.length !== 0){
        this.state.data.similar && this.state.data.similar.map(x => 
          this.setState({x})
        )
        this.setState({url : this.state.data.similar && this.state.data.similar.map(x => x.url ? x.url.replace('../public','') : img)})
      }else{
        this.setState({notFound:true})
      }
      
      // let url2 = `${SERVER_URL}/src/api/similarLike.php`;
      // const response2 = await fetch(url2  + '?token='+ this.state.x.token+'&user='+sessionStorage.getItem('user'));
      // const data2 = await response2.json();
      // this.setState({data2})
      // if(data2 === 'Exist'){
      //   this.setState({like: true})
      // }else{
      //   this.setState({like: false})

      // }
     
  }    

  render(){
    return (
      <Container fluid className="similar">
         <Row>
           <Col>
              <h3>Similar Advert</h3>
           </Col>
         </Row>

      <Fragment>
         {this.state.notFound ? <Row className="ml-sm-5">
                                         <Alert severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                  <AlertTitle>Similar Advert Doesn't Exist</AlertTitle>
                                                  <p>There is no similar advert for this advertisement!</p>
                                          </Alert> 
                             </Row> : 
    <Row className="similar-part">
      {this.state.data.similar && this.state.data.similar.map((info,i) => 
        <Parts info={info} key={i}/>
           )}
    </Row>
         }
         </Fragment>

      </Container>
    );

  }
  
}

export default withRouter(Similar);
