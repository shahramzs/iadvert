import React from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { MdShoppingCart, MdLocalShipping, MdLocalParking } from "react-icons/md";
import { AiFillGift } from "react-icons/ai";
import { GiPriceTag } from "react-icons/gi"
import { withRouter } from 'react-router'
import axios from 'axios'
import { MdKeyboardArrowLeft } from "react-icons/md";

let SERVER_URL = "http://127.0.0.1:8000";

class content extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                title: "",
                name: "",
                internetShopping: false,
                freeDelivery : false,
                parking : false,
                gift : false,
                discount : false,
                start : "",
                details : "",
                menuImage: null,
                data:[],
                error:[],
                loading:false
        }
    }

    componentDidMount() {
        document.title  = `${sessionStorage.getItem('user')} / Add Content`; 
        document.body.style.backgroundColor = '#e0e0d1';
        //jquery
        const url = `${SERVER_URL}/src/api/content.php`;
        axios.post(url).then(response => response.data).then((data) => {
            this.setState({data : data})
            console.log(this.state.data)
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    handleClick = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: !value.checked }, () => console.log(this.state));
    }

    handleUploadImage = (e) => {
        this.setState({ menuImage: e.target.files[0] }, () => console.log(this.state.menuImage));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading:true})
        console.log(`
            -- Submitting --
            user : ${sessionStorage.getItem('user')}
            title : ${this.state.title}
            name : ${this.state.name}
            internetShopping : ${this.state.internetShopping}
            freeDelivery : ${this.state.freeDelivery}
            parking : ${this.state.parking}
            gift : ${this.state.gift}
            discount : ${this.state.discount}
            start : ${this.state.start}
            details : ${this.state.details}
            menuImage : ${this.state.menuImage.name}
            token: ${sessionStorage.getItem('token')}
            `);

            let formData = new FormData();
            formData.append('user',sessionStorage.getItem('user'));
            formData.append('title', this.state.title);
            formData.append('name', this.state.name);
            formData.append('internetShopping', this.state.internetShopping);
            formData.append('freeDelivery', this.state.freeDelivery);
            formData.append('parking', this.state.parking);
            formData.append('gift', this.state.gift);
            formData.append('discount', this.state.discount);
            formData.append('start', this.state.start);
            formData.append('details', this.state.details);
            formData.append('menuImage', this.state.menuImage, this.state.menuImage.name);
            formData.append('token',sessionStorage.getItem('token'));
            
            var self = this;
            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/content.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }},
                onUploadProgress: progressEvent => {
                    console.log(progressEvent.loaded / progressEvent.total)
                  }
            })
            .then(function(response){
                //handle success
                console.log(response)
                
                if(response.data === "ok"){
                    self.setState({loading:false})
                    self.props.history.push({pathname:'/upload' ,  token: sessionStorage.getItem('token') });
                }else if(response.data === "not ok"){
                   
                    return false;
                }
                if(response.data === "error"){
                    self.setState({error:"this file is not suitable for uploading in site. please use the file with JPG or PNG format."})
                    return false;
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            });
///////////////////////////////////////////////////////web socket/////////////////////////////////////////
var conn = new WebSocket('ws://localhost:5000');
conn.onopen = (e) => {
conn.send(JSON.stringify({title:this.state.title, name:this.state.name}));
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    }

    backHandle = (e) => {
        e.preventDefault();
        this.props.history.push('/contact');
    }



    render(){

        if(!sessionStorage.getItem('user')){
            this.props.history.push('/');
           }
        
        return(
                <div className="content">
                    {this.state.loading && <div id="loader">
                                                    <div className="loading-dots">
                                                        <div className="bounce"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div> 
                        }
                    <form onSubmit={this.handleSubmit}>
                        <Container fluid>
                            <Row> 
                                <Col></Col>
                                <Col className="content-details" sm={8}>
                                 <div className="content-details-form">
                                    <Row><Col><h3>Your Business Details</h3></Col></Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="title">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control size="lg" type="text" placeholder="Business title" name="title" onChange={this.handleChange}  value={this.state.title} required/>
                                                    <Form.Text className="text-muted">
                                                    ex: Restaurant, Cafe, Clinick, Company .... 
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control size="lg" type="text" placeholder="name of your business" name="name" onChange={this.handleChange}  value={this.state.name} required/>
                                                    <Form.Text className="text-muted">
                                                    ex: Tesla, MacDonalds, Nike ....
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h4> more features about your business</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <input type="checkbox" name="internetShopping" className="internetShopping" onClick={this.handleClick} value={this.state.internetShopping} /><MdShoppingCart size="2rem"/> (internet shopping)
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <input type="checkbox" name="freeDelivery" className="freeDelivery" onClick={this.handleClick} value={this.state.freeDelivery}/><MdLocalShipping size="2rem"/> (free delivery)
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <input type="checkbox" name="parking" className="parking" onClick={this.handleClick} value={this.state.parking}/><MdLocalParking size="2rem"/> (parking)
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <input type="checkbox" name="gift" className="gift" onClick={this.handleClick} value={this.state.gift}/><AiFillGift size="2rem"/> (Special gift for customers)
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <input type="checkbox" name="discount" className="Discount" onClick={this.handleClick} value={this.state.discount}/><GiPriceTag size="2rem"/> (Special Discount for customers)
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Start and end hours of the day</Form.Label>
                                                    <Form.Control size="lg" type="text" placeholder="ex. 7Am to 5Pm" name="start" onChange={this.handleChange} value={this.state.start}required/>
                                                    <Form.Text className="text-muted">
                                                    ex: 7Am to 5Pm every day except sunday
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Form.Group controlId="moreDetails">
                                                <Form.Label>More Details</Form.Label>
                                                <Form.Control as="textarea" rows="6" name="details" onChange={this.handleChange} value={this.state.details} required/>
                                                <Form.Text className="text-muted">
                                                Expressing more details will make the audience more attracted to your business. So tell your business details as much as you can.
                                                    </Form.Text>
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.File id="menuImage" label="Menu, Catalog, Brochure image" name="menuImage" onChange={this.handleUploadImage} required/>
                                                    <Form.Text className="text-muted">
                                                    An image of the type of service and the prices of the goods and services you provide, as well as the details of your business, will attract more customers to you.
                                                        </Form.Text>
                                                         <div style={{color:"red"}}>{this.state.error}</div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{marginLeft:"5rem"}}>
                                            <Col><Button onClick={this.backHandle} size="lg" variant="link"><MdKeyboardArrowLeft size="2rem" />‌‌Back</Button></Col>
                                            <Col style={{alignItems:"right"}}><Button type="submit" size="lg" variant="info" type="submit">Next</Button></Col>
                                        </Row> 
                                    </div>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                   </form>
                </div>
            );
    }
    
}

export default withRouter(content);
