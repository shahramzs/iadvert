import React from 'react'
import {Container, Row, Col, Form } from 'react-bootstrap'
import { withRouter } from 'react-router';
import UploadNav from './UploadNav';
import $ from 'jquery';
import axios from 'axios'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';




let SERVER_URL = "http://127.0.0.1:8000";

class UploadVideo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           video: [],
           error: false,
           data:[],
           visible:false,
           percentage:0,
           loading:false,
           
    };
}

    componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} / Upload Videos`; 
        $(document).ready(function(){
            $('.videoIcon').addClass('active');
    
          })

    }


    handleFinish = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        this.props.history.push('/account');
    }


    handleChange = async (e) => {
        e.preventDefault();
        this.setState({
            video: e.target.files[0]
       });

            this.setState({visible:true,loading:true})

            console.log(`
            -- Submitting --
             user : ${sessionStorage.getItem('user')}
             token: ${sessionStorage.getItem('token')}
             video : ${e.target.files[0]}
            `);
            
            let formData = new FormData();
            formData.append('user',sessionStorage.getItem('user'));
            formData.append('token',sessionStorage.getItem('token'));
            formData.append('video',e.target.files[0]);

        
            var self = this;
           await axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/uploadVideo.php`,
                data : formData,
                responseType: 'json',
                maxContentLength: 2000000000000,
                maxBodyLength: 2000000000000,
                config : {headers : { 'Content-Type': 'multipart/form-data' }},
                onUploadProgress: ProgressEvent => {
                    console.log('upload progress :'+ Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%")
                    self.setState({percentage:Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%"})
                }
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                    //ok
                    self.setState({visible:false})
                    sessionStorage.removeItem('token');
                    self.props.history.push('/account');
                }else{
                  //not ok
                    self.setState({visible:false})
                    alert('there is a problem when uploading data! please try again with different file and size!');
                return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });
        
    }
    
    render(){

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }
        
        return(
                <div className="upload">
                    <UploadNav />
                    <Container fluid>
                        <Row className="video">
                         <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <Row><Col><h4>Add Videos to your Advert</h4></Col></Row>
                                <Row><Col><p>Videos help to customers staying in touch with you. you can start with one and add more after you publish.</p></Col></Row>
                                <Row><Col>{this.state.error && <div style={{color:"red",marginLeft:"10rem",marginRight:"10rem"}}>Please Select a Video.</div> }</Col></Row>
                                <div className="uploadVideo"> 
                                   <input type="file" id="upload-video" name="video" onChange={this.handleChange} accept=".avi, .mov, .mp4, .ogg, .webm" multiple/> 
                                    <label htmlFor="upload-video">
                                        <CloudUploadIcon style={{ fontSize: 140,color:'grey' , marginTop:'6rem'}}/>
                                        <p style={{marginRight:'9rem',fontSize:'1rem'}}>upload videos</p>
                                    </label>
                                </div>  
                            </Form>
                            <Row><Col><Button style={{marginLeft:"22rem"}}  onClick={this.handleFinish}>Finish the register data with out uploading the video</Button></Col></Row>
                        </Row>
                    </Container>
                    <div className="popup_susscess">
                            <Rodal visible={this.state.visible} animation={"door"} closeMaskOnClick={false} showCloseButton={false}>
                                {this.state.loading && <div id="loader">
                                                        <div className="loading-dots">
                                                            <div className="bounce"></div>
                                                            <div className="bounce2"></div>
                                                            <div className="bounce3"></div>
                                                        </div>
                                                    </div> 
                                }
                                    <div className="progressBar">
                                        <div className="filler" style={{width:`${this.state.percentage}`, textAlign:"center",lineHeight:"1"}}> 
                                        {this.state.percentage}
                                        </div>
                                    </div>
                            </Rodal>
                         </div>
                </div>
            );
    }
    
}

export default withRouter(UploadVideo);
