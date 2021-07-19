import React, { Component } from 'react';
import { withRouter } from 'react-router'
import Header from './inc/Header';
import Pictures from './Pictures';
import Details from './Details';
import Description from './Description'
import Address from './Address'
import Locate from './Locate'
import Similar from './Similar'
import Review from './Review'
import Footer from './inc/Footer';
import axios from 'axios'
import UserDiscount from './UserDiscount';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery'
import Cookies from 'js-cookie'
const SERVER_URL = "http://127.0.0.1:8000";

class AdvertDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      load: false,
      num: '',
    };
  }

  componentDidMount() {

    const url = `${SERVER_URL}/src/api/block.php`;
    axios.post(url).then(response => response.data).then((data) => {
      this.setState({ data: data })
    })


    let formData = new FormData();
    formData.append('user', sessionStorage.getItem('user'));

    var self = this;
    axios({
      method: 'post',
      url: `${SERVER_URL}/src/api/block.php`,
      data: formData,
      responseType: 'json',
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success

        if (response.data === "ok") {
          self.setState({ redirect: true })
          self.props.history.push("./block");
        } else if (response.data === "not ok") {

          return false;
        }
        return response;
      })
      .catch(function (response) {
        //handle error
        console.log(response)

      });

    // const { token } = queryString.parse(this.props.location.search);
    this.setState({ token: this.props.match.params.token })


    //set view of adverts
    let formDataView = new FormData();
    formDataView.append('token', this.props.match.params.token);

    axios({
      method: 'post',
      url: `${SERVER_URL}/src/api/view.php`,
      data: formDataView,
      responseType: 'json',
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success
        return response;
      })
      .catch(function (response) {
        //handle error
        console.log(response)

      });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    $('html, body').animate({ scrollTop: '0px' }, 1000);
  }

  progress = () => {
    this.setState({ load: true })
  }

  loaded = () => {
    this.setState({ load: false })
  }


  likeNum = (likee) => {
    this.setState({ num: likee})
  }

  componentWillReceiveProps(){
    if(Cookies.get('info')){
      sessionStorage.setItem('user',window.atob(Cookies.get('info')))
      sessionStorage.setItem('code',Cookies.get('code'))
    }else{
      sessionStorage.setItem('user','');
      sessionStorage.setItem('code','');
      sessionStorage.clear();
      Cookies.remove('info');
      Cookies.remove('code');
      // this.props.history.push('/');
    }
    
  }

  render() {
    return (
      <div className="AdvertDetails" onLoadStart={this.progress} onLoadedData={this.loaded}>
        <Backdrop style={{ color: '#fff', zIndex: '100' }} open={this.state.load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <React.Fragment>
          <Header />
          <Pictures token={this.state.token} likeeNum={this.likeNum.bind(this)} />
          <Details like={this.state.num} />
          <Description />
          <Address />
          <UserDiscount token={this.state.token} />
          <Locate />
          <Similar />
          <Review />
          <Footer />
        </React.Fragment>
      </div>
    );

  }

}

export default withRouter(AdvertDetails);
