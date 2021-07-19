import React, { Component, Fragment } from 'react';
import Header from './inc/Header';
import Tags from './Tags';
import SearchAdvert from './SearchAdvert';
import Footer from './inc/Footer';
import axios from 'axios'
import { Toast } from 'react-bootstrap'
import { MdVerifiedUser } from "react-icons/md";
import queryString from 'query-string'


const SERVER_URL = "http://127.0.0.1:8000";

class AdvertSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
     redirect:false,
     toast:false,
     show:true,
     name:'',
     city:'',
     business:'',
     load:''
    };
  }
    
      componentDidMount() {
        const {data} = this.props.location;
        const url = `${SERVER_URL}/src/api/block.php`;
        
            axios.post(url).then(response => response.data).then((data) => {
                this.setState({data : data})
            })
    
    
                let formData = new FormData();
                formData.append('user',sessionStorage.getItem('user'));
                
                var self = this;
                axios({
                    method: 'post',
                    url : `${SERVER_URL}/src/api/block.php`,
                    data : formData,
                    responseType: 'json',
                    config : {headers : { 'Content-Type': 'multipart/form-data' }}
                })
                .then(function(response){
                    //handle success
                    // console.log(response)
                    
                    if(response.data === "ok"){
                      self.setState({redirect: true})
                      self.props.history.push("./block");
                    }else if(response.data === "not ok"){
                       
                        return false;
                    }
                    return response;
                })
                .catch(function(response){
                    //handle error
                    console.log(response)
    
                });
        
                if(data === 'ok'){
                  this.setState({toast:true});
                }
        

                const parsed = queryString.parse(this.props.location.search);
                this.setState({name:parsed.name, city:parsed.city, business:parsed.business, load:parsed.load})
               
               
      }
      
  close = (e) => {
    this.setState({toast:false})
  }

  
  render(){
    
    return (
      <div className="Advert">
        <Header />
        <Tags />
        <SearchAdvert name={this.state.name} city={this.state.city} business={this.state.business}/>
        <Footer />
      
      <Fragment>
          {this.state.toast && <Toast style={{position:"absolute",marginTop:"-90%",marginLeft:"39%",background:"#F96714"}} onClose={this.close} show={this.state.show} delay={5000} autohide>
          <Toast.Header>
            <MdVerifiedUser size="2rem" color="green"/>
            <strong className="mr-auto">Verification Accepted</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body style={{textAlign:"center"}}>Your Verification Accepted.</Toast.Body>
          </Toast>}
      </Fragment>
    </div>
    );

  }
  
}

export default AdvertSearch;
