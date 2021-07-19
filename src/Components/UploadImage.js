import React from 'react'
import {Container, Row, Col, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import UploadNav from './UploadNav'
import $ from 'jquery';
import ImageUploader from 'react-images-upload';
import axios from 'axios'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Button from '@material-ui/core/Button';

let SERVER_URL = "http://127.0.0.1:8000";

class UploadImage extends React.Component{

        constructor(props){
            super(props);

            this.state = {
               pictures: [],
               error: false,
               data:[],
               loading:false,
               percentage:0,
               visible: false,
        };
    }

    componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} / Upload Images`; 
        document.body.style.backgroundColor = '#ffffff';
        //jquery
        $(document).ready(function(){
            $('.imageIcon').addClass('active');
          })

          const url = `${SERVER_URL}/src/api/uploadImage.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({data : data})
            console.log(this.state.data)
        })

    }


    handleChange = (pictureFiles) => {
        this.setState({
            pictures: [...pictureFiles],
            error:false,
        }, () => console.log(this.state.pictures)); 

    }

    // handleChange = (e) => {
    //     this.setState({ pictures: [...e.target.files] })
    // }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.pictures === ""){
            this.setState({error: true})
            return false;
        }else{
            this.setState({error:false})

            this.setState({visible:true,loading:true})
            
            console.log(`
            -- Submitting --
             user : ${sessionStorage.getItem('user')}
             pictures : ${this.state.pictures}
             token: ${sessionStorage.getItem('token')}
            `);
                
            let formData = new FormData();
            formData.append('user',sessionStorage.getItem('user'));
            this.state.pictures.forEach((pic) => {
                formData.append('pictures[]',pic);
            })
            // formData.append('pictures[]',this.state.pictures);
            formData.append('token',sessionStorage.getItem('token'));
            
            var self = this;
            axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/uploadImage.php`,
                data : formData,
                responseType: 'json',
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
                    self.props.history.push({pathname:'/uploadVideo',  token: sessionStorage.getItem('token') });
                }else if(response.data === "not ok"){
                  //not ok

                return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });
        }
///////////////////////////////////////////////////////web socket/////////////////////////////////////////
        var conn = new WebSocket('ws://localhost:5000');
        conn.onopen = (e) => {
        conn.send(JSON.stringify({ url: URL.createObjectURL(this.state.pictures[0]), numPic: this.state.pictures.length.toString(), close:1}));
      };
////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    }
    
    render(){

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }

        return(
                <div className="upload">
                    <UploadNav />
                        <Container fluid>
                            <Row className="image">
                                <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <Row><Col><h4>Add Photos to your Advert</h4></Col></Row>
                                    <Row><Col><p>Photos help to customers staying in touch with you. you can start with one and add more after you publish.</p></Col></Row>
                                    <Row><Col>{this.state.error && <div style={{color:"red",marginLeft:"10rem",marginRight:"10rem"}}>Please Select a photo.</div> }</Col></Row>
                                        <div className="uploadImage">
                                                <ImageUploader
                                                        accept=".jpg, .gif, .png, .gif"
                                                        withIcon={true}
                                                        buttonText='Choose Images'
                                                        onChange={this.handleChange}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                        withPreview={true}
                                                        withLabel={true}
                                                        label='accepted: jpg, gif, png'
                                                        fileSizeError="file size is too big"
                                                        name='pictures'
                                                        singleImage={false}
                                                    />
                                                    {/* <input type="file" name="pictures" onChange={this.handleChange} multiple/> */}
                                        </div>
                                        <Row className="imageSubmit">
                                            <Col>
                                            <Button size="lg" variant="outlined" color="primary" type="submit" >Submit</Button>{' '}
                                            </Col>
                                        </Row>
                                </Form>
                            </Row>
                        </Container>
                        <div className="popup_susscess">
                            <Rodal visible={this.state.visible} animation={"door"} closeMaskOnClick= {false} showCloseButton={false}>
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

export default withRouter(UploadImage);
