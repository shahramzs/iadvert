import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Advert from './Components/Advert'
import Forget from './Components/Forget'
import FreeAdvert from './Components/FreeAdvert'
import Location from './Components/Location'
import Contact from './Components/Contact'
import content from './Components/content'
import upload from './Components/Upload'
import uploadImage from './Components/UploadImage'
import uploadVideo from './Components/UploadVideo'
import block from './Components/Block'
import verification from './Components/Verification'
import advertStory from './Components/AdvertStory'
import AdvertDetails from './Components/AdvertDetails'
import AdvertSite from './Components/AdvertSite'
import Error from './Components/Error'
import AdvertSearch from './Components/AdvertSearch'
import SearchCategory from './Components/SearchCategory'
import account from './Components/dashboard/Account'
import AdvertData from './Components/dashboard/AdvertData'
import AdvertLocation from './Components/dashboard/AdvertLocation'
import ProfileAdvert from './Components/dashboard/ProfileAdvert'
import AllImages from './Components/dashboard/AllImages'
import AllVideos from './Components/dashboard/AllVideos'
import Saved from './Components/dashboard/Saved'
import Discount from './Components/dashboard/Discount'
import DiscountSave from './Components/dashboard/DiscountSave'
import Notification from './Components/dashboard/Notification'
import chat from './Components/dashboard/Chat'
import Cookies from 'js-cookie'
import $ from 'jquery'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import Rodal from 'rodal'
import WifiOffIcon from '@material-ui/icons/WifiOff';


import Admin from './Components/admin/Admin'
import AdminBlock from './Components/admin/AdminBlock'
import AdminData from './Components/admin/AdminData'
import AdminDiscount from './Components/admin/AdminDiscount'
import AdminEmail from './Components/admin/AdminEmail'
import AdminImages from './Components/admin/AdminImages'
import AdminLocation from './Components/admin/AdminLocation'
import AdminNotification from './Components/admin/AdminNotification'
import AdminSupport from './Components/admin/AdminSupport'
import AdminTracking from './Components/admin/AdminTracking'
import AdminUsers from './Components/admin/AdminUsers'
import AdminVideos from './Components/admin/AdminVideos'


const ProgressBar = require('react-progress-bar-plus');
require('react-progress-bar-plus/lib/progress-bar.css');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      Lat: '',
      Lng: '',
      seen: false,
      online: true,
    }
  }

  componentDidMount() {

    window.addEventListener('DOMContentLoaded', () => {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;

      var perfData = window.performance.timing;
      var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
      var time = parseInt((EstimatedTime / 1000) % 60) * 100;

      this.setState({ progress: time })
    })

    window.addEventListener('load', () => {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;

      var perfData = window.performance.timing;
      var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
      var time = parseInt((EstimatedTime / 1000) % 60) * 100;

      this.setState({ progress: time })
    });

    window.addEventListener('loadend', () => {
      this.setState({ progress: -1 })
    });

    window.onloadeddata = () => {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;

      var perfData = window.performance.timing;
      var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
      var time = parseInt((EstimatedTime / 1000) % 60) * 100;

      this.setState({ progress: time })
    };

    window.addEventListener('loadedmetadata', () => {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;

      var perfData = window.performance.timing;
      var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
      var time = parseInt((EstimatedTime / 1000) % 60) * 100;

      this.setState({ progress: time })
    })

    window.addEventListener('progress', () => {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;

      var perfData = window.performance.timing;
      var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
      var time = parseInt((EstimatedTime / 1000) % 60) * 100;

      this.setState({ progress: time })
    });

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sessionStorage.getItem('user') && sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === '') {
      sessionStorage.setItem('user', '');
      sessionStorage.setItem('code', '');
      sessionStorage.clear();
      Cookies.remove('info');
      Cookies.remove('code');
    }

    if (sessionStorage.getItem('user') && Cookies.get('info') && sessionStorage.getItem('user') !== window.atob(Cookies.get('info'))) {
      sessionStorage.setItem('user', '');
      sessionStorage.setItem('code', '');
      sessionStorage.clear();
      Cookies.remove('info');
      Cookies.remove('code');
    }

    if (Cookies.get('info') && Cookies.get('info') === undefined || Cookies.get('info') === '') {
      sessionStorage.setItem('user', '');
      sessionStorage.setItem('code', '');
      sessionStorage.clear();
      Cookies.remove('info');
      Cookies.remove('code');
    }

    //admin
    if (sessionStorage.getItem('admin') && sessionStorage.getItem('admin') === undefined || sessionStorage.getItem('admin') === '') {
      sessionStorage.setItem('admin', '');
      sessionStorage.clear();
      Cookies.remove('admin');
    }

    if (sessionStorage.getItem('admin') && Cookies.get('admin') && sessionStorage.getItem('admin') !== window.atob(Cookies.get('admin'))) {
      sessionStorage.setItem('admin', '');
      sessionStorage.clear();
      Cookies.remove('admin');
    }

    if (Cookies.get('admin') && Cookies.get('admin') === undefined || Cookies.get('admin') === '') {
      sessionStorage.setItem('admin', '');
      sessionStorage.clear();
      Cookies.remove('admin');
    }

    $('html, body').animate({ scrollTop: '0px' }, 1000);
    // ///////////////////////////////////////////////check for seen in chat///////////////////////////////////////////////////////////////////////////////////////
    // const seen = () => {
    //   const SERVER_URL = "http://127.0.0.1:8000";
    //   if (sessionStorage.getItem('user')) {
    //     let formData = new FormData();
    //     formData.append('user', sessionStorage.getItem('user'));
    //     let self = this;
    //     axios({
    //       method: 'POST',
    //       url: `${SERVER_URL}/src/api/checkSeenChat.php`,
    //       data: formData,
    //       responseType: 'json',
    //       config: { headers: { 'Content-Type': 'multipart/form-data' } }
    //     })
    //       .then(function (response) {
    //         //handle success
    //         console.log(response)
    //         if (response.data === 'seen') {
    //           self.setState({ seen: true })
    //         }
    //         return response;
    //       })
    //       .catch(function (response) {
    //         //handle error
    //         console.log(response)

    //       })
    //   } else {
    //     return false;
    //   }
    // }
    // setInterval(() => {
    //   seen();
    // }, 2000)

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var on = navigator.onLine;
    if (on === false) {
      this.setState({ online: false })
    } else {
      this.setState({ online: true })
    }

    // ////////////////////////////////////////////////////////////SSE//////////////////////////////////////////////////////////////////
    if (typeof (EventSource) !== "undefined") {
      // Yes! Server-sent events support!
      var self = this;
      const SERVER_URL = "http://127.0.0.1:8000";
      var source = new EventSource(`${SERVER_URL}/src/api/demo_sse.php?user=${sessionStorage.getItem('user')}`);

      source.onopen = function () {
        console.log('open', 'the eventSource opend.')
      }

      source.onmessage = function (event) {
        // const message = JSON.parse(event.data);
        if (event.data === 'seen') {
          self.setState({ seen: true })
        }else{
          self.setState({ seen: false })
        }
        //console.log('SSE', event.data)
      };

    } else {
      // Sorry! No server-sent events support..
      console.log('SSE', 'no support')
    }
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }

  render() {
    return (
      <div className="App" >
        <ProgressBar className="autoProgressBar" percent={this.state.progress} spinner={false} />
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route path="/" exact component={AdvertSite} />
              <Route path="/advert" component={Advert} />
              <Route path="/advertDetails/:token" component={AdvertDetails} />
              <Route path="/searchCategory/:tag" component={SearchCategory} render={(props) => <SearchCategory {...props} />} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/forget" component={Forget} />
              <Route path="/FreeAdvert" component={FreeAdvert} />
              <Route path="/contact" component={Contact} />
              <Route path="/location" component={Location} />
              <Route path="/content" component={content} />
              <Route path="/upload" component={upload} />
              <Route path="/uploadImage" component={uploadImage} />
              <Route path="/uploadVideo" component={uploadVideo} />
              <Route path="/block" component={block} />
              <Route path="/verification" component={verification} />
              <Route path="/advertStory" component={advertStory} />
              <Route path="/advertSearch/:name?" component={AdvertSearch} render={(props) => <AdvertSearch {...props} />} />
              <Route path="/account" component={account} />
              <Route path="/advertData" component={AdvertData} />
              <Route path="/profileAdvert" component={ProfileAdvert} />
              <Route path="/advertLocation" component={AdvertLocation} />
              <Route path="/allImages" component={AllImages} />
              <Route path="/allVideos" component={AllVideos} />
              <Route path="/saved" component={Saved} />
              <Route path="/discount" component={Discount} />
              <Route path="/discountSave" component={DiscountSave} />
              <Route path="/notification" component={Notification} />
              <Route path="/Chat" component={chat} render={(props) => <chat {...props} />} />
              <Route path="/admin" component={Admin} />
              <Route path="/adminBlock" component={AdminBlock} />
              <Route path="/adminData" component={AdminData} />
              <Route path="/adminDiscount" component={AdminDiscount} />
              <Route path="/adminEmail" component={AdminEmail} />
              <Route path="/adminImages" component={AdminImages} />
              <Route path="/adminLocation" component={AdminLocation} />
              <Route path="/adminNotification" component={AdminNotification} />
              <Route path="/adminSupport" component={AdminSupport} />
              <Route path="/adminTracking" component={AdminTracking} />
              <Route path="/adminUsers" component={AdminUsers} />
              <Route path="/adminVideos" component={AdminVideos} />
              <Route component={Error} />
            </Switch>
          </Fragment>
          <Snackbar open={this.state.seen} onClose={() => this.setState({ seen: false })} severity="warning">
            <Alert severity="warning">
              You have some message. Please check your <strong><Link to="/Chat">chat.</Link></strong>
            </Alert>
          </Snackbar>
        </BrowserRouter>
        <Rodal visible={!this.state.online} animation={"door"} height={150} onClose={() => this.setState({ online: true })} customStyles={{ borderLeft: '3px solid red', borderRadius: '20px' }}>
          <div><span style={{ padding: '20px', background: '#ff0000', borderRadius: '2rem', color: ' #f2f2f2' }}><WifiOffIcon fontSize="large" /></span> </div><p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#ff6666', marginTop: '-8%' }}>You're offline now.</p>
          <ul style={{ marginTop: '8%' }}>
            <li>Checking the connection.</li>
            <li>Checking the proxy, firewall, and DNS configuration.</li>
            <li>Running Windows Network Diagnostics.</li>
          </ul>
        </Rodal>
      </div>
    );

  }

}

export default (App);
