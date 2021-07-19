import React, { Component, Fragment } from 'react';
import Header from './inc/Header';
import Tags from './Tags';
import IconAdvert from './IconAdvert';
import Footer from './inc/Footer';
import axios from 'axios'
import { Toast } from 'react-bootstrap'
import { MdVerifiedUser } from "react-icons/md";



const SERVER_URL = "http://127.0.0.1:8000";

class SearchCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
     redirect:false,
     toast:false,
     show:true,
    };
  }
    
   componentDidMount() {
        const {data} = this.props.location.search;
      
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

    }
    
      
  close = (e) => {
    this.setState({toast:false})
  }

  
  render(){

    return (
      <div className="Advert">
        <Header />
        <Tags />
        <IconAdvert tag={this.props.match.params.tag}/>
        <Footer />
      
      <Fragment>
          {this.state.toast && <Toast style={{position:"absulate",marginTop:"-90%",marginLeft:"39%",background:"#F96714"}} onClose={this.close} show={this.state.show} delay={5000} autohide>
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

export default SearchCategory;
