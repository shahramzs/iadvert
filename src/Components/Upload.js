import React, {  Component } from 'react'
import {Container } from 'react-bootstrap'
import { withRouter } from 'react-router'
import  UploadNav  from './UploadNav'
import help from "../img/image-help.png"
import { FiSun } from "react-icons/fi";
import { IoMdPhoneLandscape } from "react-icons/io";
import { RiFileList3Line } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
import { MdVideocam } from "react-icons/md";

class Upload extends Component{
        constructor(props){
            super(props)

            this.state={

            }
        }

        componentDidMount(props) {
            document.body.style.backgroundColor = '#ffffff';
            //jquery
            document.title  = `${sessionStorage.getItem('user')} / Upload Image And Video`; 
        }

   render(){
      

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }
        return(
                <div className="upload">
                    <UploadNav/>
                        <Container fluid >
                            <div className="uploadText">
                                <p>
                                  <IoMdPhoneLandscape size={'2rem'}/> Take Photos in landscape mode to capture as much of your business place and your services as possible. shoot from corners to add perspective.
                                </p>
                                <p>
                                <FiSun size={'2rem'}/>   Spaces look best in nutural light. if it's nighttime, turn on your lights. Avoid using flash.
                                </p>
                                <p>
                                 <RiFileList3Line size={'2rem'}/>    every details about your services is important and sometimes customers needs to know about them.
                                </p>
                                <p>
                                  include all places and your services and your staff pricess will access.
                                </p>
                                 <div style={{border:"0.5px dashed #000000",marginBottom:"1rem"}}></div>
                                <p>
                                 you can switch between uploading image and uploading video with the icon on the header.
                                 </p>
                                 <p> Using this icon <RiImageAddLine size={"2rem"}/> on the header for uploading image to the server. </p>
                                 <p> Using this icon <MdVideocam size={"2rem"}/> on the header for uploading video to the server. </p>
                                
                                <img src={help} alt="landscape"/>
                            </div>
                        </Container>
                </div>
            );
        }
}

export default withRouter(Upload);
