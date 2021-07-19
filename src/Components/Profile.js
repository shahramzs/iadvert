import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Rodal from 'rodal'
import { Row, Col, Form, Alert, Button } from 'react-bootstrap'
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgIcon from '@material-ui/core/SvgIcon';
import a from '../img/loader1.svg'
import moment from 'moment'

let SERVER_URL = "http://127.0.0.1:8000";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            x: [],
            visible: false,
            email: '',
            text: '',
            visible2: false,
            visible3: false,
            dataImg: [],
            profileImg: [],
            loader: false,
            chatUser: '',
            chatUser2: '',
            disable: false
        };
    }

    async componentDidMount() {
        const token = this.props.match.params.token;

        let url = `${SERVER_URL}/src/api/profile.php`;
        const response = await fetch(url + '?token=' + token);
        const data = await response.json();
        this.setState({ data })
        // console.log('data',this.state.data);

        this.state.data.profile && this.state.data.profile.map(x =>
            this.setState({ x })
        )


        let url2 = `${SERVER_URL}/src/api/imgProfile.php`;
        const response2 = await fetch(url2 + '?token=' + token);
        const dataImg = await response2.json();
        this.setState({ dataImg })
        // console.log('data',this.state.dataImg);

        this.state.dataImg.imgProfile && this.state.dataImg.imgProfile.map(profileImg =>
            this.setState({ profileImg })
        )

        if (this.state.profileImg.user === sessionStorage.getItem('user')) {
            this.setState({ disable: true })
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    handleSubmit = (e) => {
        // const { token } = queryString.parse(this.props.location.search);
        const token = this.props.match.params.token;
        e.preventDefault();
        if (this.state.email === '' || this.state.text === '') {
            this.setState({ visible3: true })
            return false;
        }
        this.setState({ loader: true })
        console.log(`
          -- Submitting --
          email : ${this.state.email}
          text : ${this.state.text}
          token : ${token}
          emailDestination : ${this.state.x.email}
          `);

        let formData = new FormData();
        formData.append('text', this.state.text);
        formData.append('email', this.state.email);
        formData.append('token', token);
        formData.append('emailDestination', this.state.x.email);

        var self = this;
        axios({
            method: 'post',
            url: `${SERVER_URL}/src/api/emailSend.php`,
            data: formData,
            responseType: 'json',
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)

                if (response.data === "ok") {
                    self.setState({ loader: false, visible: false, visible2: true, })

                } else if (response.data === "error" || response.data === null) {
                    self.setState({ loader: false, visible: false, visible3: true })
                    return false;
                }
                return response;
            })
            .catch(function (response) {
                //handle error
                console.log(response)

            });


    }

    chat = async () => {
        if(sessionStorage.getItem('user')){
        
        const token = this.props.match.params.token;
        let url2 = `${SERVER_URL}/src/api/chatUser.php`;
        const response2 = await fetch(url2 + '?token=' + token);
        const data = await response2.json();
        this.setState({ chatUser: data && data.map(x => x.user) })
        const advertUser = this.state.chatUser.toString();

        this.props.history.push('/Chat')

        // uniq token for private chat
        const chat_token = btoa(moment().format('MMMM Do YYYY, h:mm:ss.SSS'));

        let formData = new FormData();
        formData.append('sender', sessionStorage.getItem('user'));
        formData.append('reciever', advertUser);
        formData.append('chatToken', chat_token);

        axios({
            method: 'post',
            url: `${SERVER_URL}/src/api/userInChat.php`,
            data: formData,
            responseType: 'json',
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                return response;
            })
            .catch(function (response) {
                //handle error
                console.log(response)

            });

        ///////////////////////////////////////////////////////web socket/////////////////////////////////////////
        var conn = new WebSocket('ws://localhost:5000');
        conn.onopen = (e) => {
            var items = {
                sender: sessionStorage.getItem('user'),
                reciever: advertUser,
                urlProfile: this.state.profileImg.urlProfile.replace('../public', ''),
                chat_token: chat_token,
                time: moment().format('LLL')
            }

            conn.send(JSON.stringify(items));
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    }else{
        alert('You Must Sign in to Can Chat! so Please Sign in.')
    }
    }

    activeImg = (e) => {
        e.preventDefault();
        const img = document.getElementById("mainImg");
        img.classList.toggle("activeImg")
    }

    render() {

        return (
            <div className="profile">
                <div className="profile-board">
                    <Link to="#" >
                        {this.state.profileImg.urlProfile ? <img id = 'mainImg' onClick={(e) => this.activeImg(e)} src={this.state.profileImg.urlProfile && this.state.profileImg.urlProfile.replace('../public', '')} alt={this.state.profileImg.user} /> : <SvgIcon component={AccountCircleIcon} style={{ fontSize: '250', marginLeft: '1%', color: '#4d94ff' }} className="profileIcon" />}
                    </Link>
                    <div className="profile-title">{this.state.x.fullname}</div>
                    <div className="profile-place">{this.state.x.city} - {this.state.x.country}</div>
                </div>

                <div className="profile-content">
                    <p>{this.state.x.title}t<br />{this.state.x.name}</p>
                    <div className="profile-button">
                        <div className="profile-btn">
                            <button onClick={() => this.setState({ visible: true })}>Message</button>
                        </div>

                        <div className="profile-btn">
                            <button disabled={this.state.disable} onClick={this.chat}>Chat</button>
                        </div>
                    </div>
                </div>
                <div className="profile-icons">
                    <li><Link to={{ pathname: "https://www.facebook.com/" + this.state.x.facebook }} target='_blank' ><FaFacebook size="1.5rem" /></Link></li>
                    <li><Link to={{ pathname: "https://www.twitter.com/" + this.state.x.twitter }} target='_blank' ><FaTwitter size="1.5rem" /></Link></li>
                    <li><Link to={{ pathname: "https://www.instagram.com/" + this.state.x.instagram }} target='_blank' ><FaInstagram size="1.5rem" /></Link></li>
                    <li><Link to={{ pathname: "https://www.linkedin.com/" + this.state.x.linkedin }} target='_blank' ><FaLinkedinIn size="1.5rem" /></Link></li>
                </div>

                <Rodal visible={this.state.visible} onClose={() => this.setState({ visible: false })} width={800} height={520} customStyles={{ marginTop: '7%' }}>
                    <h2 style={{ textAlign: 'center' }}>New Email to {this.state.x.fullname}</h2>
                    <Form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email To
                            </Form.Label>
                            <Col >
                                <Form.Control plaintext readOnly defaultValue={this.state.x.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" size='lg' name='email' onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                Enter Your Email Correctly.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text Of Email</Form.Label>
                            <Form.Control as="textarea" rows="6" style={{ resize: 'none' }} name='text' onChange={this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Rodal>

                <Rodal visible={this.state.visible2} onClose={() => this.setState({ visible2: false })} width={500} height={250}>
                    <Alert variant="success">
                        <Alert.Heading>Email Sent successfully</Alert.Heading>
                        <p>
                            You send an email to <strong>{this.state.x.email}</strong> correctly. I hope you had a great time in advert business.
                        </p>
                        <hr />
                        <p className="mb-0">
                            You can connect to <strong>{this.state.x.fullname}</strong> on email , phone or on socail media.
                        </p>
                    </Alert>
                </Rodal>

                <Rodal visible={this.state.visible3} onClose={() => this.setState({ visible3: false })} width={500} height={250}>
                    <Alert variant="danger">
                        <Alert.Heading>Email does not send !</Alert.Heading>
                        <p>
                            Please check email that enter on the box and check your text. the text must be less that 1000 characters.
                            after checking the inputs please try again.
                        </p>
                        <hr />
                        <p className="mb-0">
                            After checking the inputs please try again.
                        </p>
                    </Alert>
                </Rodal>
                <Rodal visible={this.state.loader} animation={"door"} onClose={() => this.setState({ loader: false })}>
                    <div style={{ textAlign: 'center', marginTop: '7%' }}>
                        <img src={a} alt="loader" />
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Please wait to send an email</p>
                    </div>
                </Rodal>
            </div>
        );
    }
}
export default withRouter(Profile);
