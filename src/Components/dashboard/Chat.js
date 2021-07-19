import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StorageIcon from '@material-ui/icons/Storage';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import axios from 'axios'
import Rodal from 'rodal'
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import img from '../../img/image.png'
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'js-cookie'
import moment from 'moment'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import a from '../../img/advertUser.png'
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ScrollToBottom from 'react-scroll-to-bottom'
import $ from 'jquery'
import InfiniteScroll from 'react-infinite-scroller';
import ChatIcon from '@material-ui/icons/Chat';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import VideoPhone from './VideoPhone'
import song from '../../img/chat.mp3'
var numeral = require('numeral');
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1: {
    maxWidth: 345,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  menuText: {
    marginLeft: '5%',
    color: 'silver',
    cursor: 'pointer',
  },
  chatBoard:{
    background: "#ffffff",
    height:'560px',
    margin:'0 auto',
    display:'flex',
    flexDirection:'row',
    border:'none',
    padding:'0 !important',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)',
    marginTop:'-2%'
  },
  chatBoardText:{
    height:'560px',
    borderLeft:'1px solid silver',
    border:'none',
    padding:'0',
    overflow:'hidden'
  },
  chatBoardUser:{
    height:'560px',
    border:'none',
    padding:'0',
    overflow:'hidden'
  },
  chatBoardUserPart1:{
    height:'12%',
    borderBottom:'1px solid silver',
  },
  chatBoardUserPart2:{
    height:'88%',
   overflow:'auto'
  },
  chatBoardTextPart1:{
    height:'12%',
    borderBottom:'1px solid silver',
    display: 'grid',
    gridTemplateColumns: '25% 50% 25%',
  },
  chatBoardTextPart2:{
    height:'88%',
  },
  listUsers:{
    display: 'grid',
    gridTemplateColumns: '20% 80%',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  chatBoardTextPart21:{
    height: '90%',
    overflow:'auto'
  },
  chatBoardTextPart22:{
    height: '10%',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  inputImage:{
    display:'none'
  }
}));

const SERVER_URL = "http://127.0.0.1:8000";

 function Chat(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const AllAdvert = (e) => {
    e.preventDefault();
    props.history.push('../account'); 
  }
  const AllData = (e) => {
    e.preventDefault();
    props.history.push('../advertData'); 
  }
  const location = (e) => {
    e.preventDefault();
    props.history.push('../advertLocation'); 
  }
  const profile = (e) => {
    e.preventDefault();
    props.history.push('../profileAdvert'); 
  }
  const chat = (e) => {
    e.preventDefault();
    props.history.push('../Chat'); 
  }
  const image = (e) => {
    e.preventDefault();
    props.history.push('../allImages'); 
  }
  const video = (e) => {
    e.preventDefault();
    props.history.push('../allVideos'); 
  }
  const save = (e) => {
    e.preventDefault();
    props.history.push('../saved'); 
  }
  const discount = (e) => {
    e.preventDefault();
    props.history.push('../discount'); 
  }
  const discountSave = (e) => {
    e.preventDefault();
    props.history.push('../discountSave'); 
  }
  const notification = (e) => {
    e.preventDefault();
    props.history.push('../notification'); 
  }
  const signOut = (e) => {
    // check users are online or not.
    const SERVER_URL = "http://127.0.0.1:8000";
    let formData = new FormData();
    formData.append('user', sessionStorage.getItem('user'));

    axios({
        method: 'post',
        url : `${SERVER_URL}/src/api/offline.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }}
    })
    .then(function(response){
        //handle success
        console.log(response)
        
        return response;
    })
    .catch(function(response){
        //handle error
        console.log(response)

    })
// /////////////////////////////////////////////////////////////////////////////
// send status of offline of users by socket
var conn = new WebSocket('ws://localhost:5003');
conn.onopen = (e) => {
var items = {user:sessionStorage.getItem('user')}     
conn.send(JSON.stringify(items));
}
////////////////////////////////////////////////////////////////////////////////
    e.preventDefault();
    sessionStorage.setItem('user','');
    sessionStorage.setItem('code','');
      Cookies.remove('info');
    sessionStorage.clear();
    props.history.push('/');

  }
  
const handleExpandClick = () => {
  setExpanded(!expanded);
};

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><AccountCircleIcon/>{''}{sessionStorage.getItem('user')}</MenuItem>
      <MenuItem onClick={signOut}><ExitToAppIcon/> {''} Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="secondary"> */}
            <MailIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          {/* <Badge badgeContent={seen} color="secondary"> */}
            <NotificationsIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

  const StyledBadge2 = withStyles((theme) => ({
    badge: {
      backgroundColor: 'red',
      color: 'red',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

  const[showOption, setShowOption] = React.useState(false);
///////////////////////////////////////////////////seo site name//////////////////////////////////////////////////////////////////
React.useEffect(() => {
  document.title  = 'Chat / Advert';

  return () => {
  
  }
}, [])
// ////////////////////////////////////////////////scroll to bottom/////////////////////////////////////////////////////////////////////////////////
const messagesEndRef = React.useRef(null)
React.useEffect(() => {
      const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }
    $('#chatBox').animate({scrollTop: $('body').height() + $('#chatBox').height()}, 100);
    scrollToBottom()
    var chatWindow = document.getElementById("#chatBoard2");
    var height = $('#chatBoard2')[0].scrollHeight
    var top = $('#chatBoard2')[0].scrollTop

  }, []);
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const[user,setUser] = React.useState({user:'', urlProfile:''})
  React.useEffect(() => {     
    if(!sessionStorage.getItem('user')){
      props.history.push('/');
     }
      const SERVER_URL = "http://127.0.0.1:8000";
      const userChat =  props.location.pathname.replace("/Chat/",'');
      let url = `${SERVER_URL}/src/api/chatUserProfile.php`;
      const fetchData = async () => {
      const {data} = await axios.get(url+'?token=' + userChat+'&user='+sessionStorage.getItem('user'));
        data && data.map(x => 
            setUser(x)
          )
         
       }
    fetchData();
    return () => {
      //
    }
  }, [props.location.pathname.replace("/Chat/",'')])
  console.log('user',user) 
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const[user2,setUser2] = React.useState({user:'', urlProfile:''})
  React.useEffect(() => {
      const SERVER_URL = "http://127.0.0.1:8000";
      let url = `${SERVER_URL}/src/api/chatUserProfileImage.php`;
      const fetchData = async () => {
      const {data} = await axios.get(url+'?user=' + sessionStorage.getItem('user'));
        data && data.map(x => 
          setUser2(x)
          )
       }
    fetchData();
    return () => {
      //
    }
  }, [props.location.pathname.replace("/Chat/",'')])
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const[chatUser,setChatUser] = React.useState([])
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  let url2 = `${SERVER_URL}/src/api/userChatFetch.php`;
    const fetchData2 = async () => {
    const {data} = await axios.get(url2+'?user='+ sessionStorage.getItem('user'));
    setChatUser(data)
    }
  ////////////////webSocket//////////////////////////////////////////////////////////////////////////////////////////////
  var conn = new WebSocket('ws://localhost:5000');
  conn.onopen = function(e) {
    console.log("Connection established! port: 5000");
  };

  conn.onmessage = (e) => {
     const ws1 = JSON.parse(e.data)
 
  if(ws1.sender === sessionStorage.getItem('user')){
    setChatUser(ws1)      
  }    
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fetchData2();
  return () => {
    //
  }
}, [props.location.pathname.replace("/Chat/",'')])
console.log('chatuser',chatUser)
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// handle message
const[disabled , setdisabled ] = React.useState(false);
const[message, setMessage] = React.useState({ message:""});
const handleMessage = (prop) => (event) => {
  if( document.getElementById('message').value === '' ){
    setdisabled(false)
  }else{
    setdisabled(true)
    setMessage({...message,[prop]: event.target.value });
  }
 
}

////////////////webSocket//////////////////////////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
var conn = new WebSocket('ws://localhost:5005');
conn.onopen = function(e) {
  console.log("Connection established! port: 5005");
};

conn.onmessage = (e) => {
   const ws = JSON.parse(JSON.parse(e.data))
if(ws.sender === sessionStorage.getItem('user')){
   setChatUser([...chatUser,ws])   
}    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return () => {
  //
  }
}, [])
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// take the message to server and send them to reciever
React.useEffect(() => {
  
  var conn = new WebSocket('ws://localhost:5001');
  conn.onopen = function(e) {
  console.log("Connection established! port:5001");
  };
  conn.onmessage = function(e) {
    const msg = JSON.parse(e.data);

  //if(msg.token === props.location.pathname.replace("/Chat/",'')){
    if( msg.sender === sessionStorage.getItem('user')){
      $('#chatBox').append("<span class='senderMsg'>"+ msg.message.message +"</span>");
      $('#chatBox').append("<span class='chatTime1'>"+ moment().format('llll') +"</span>");
    }
    if( msg.reciever === sessionStorage.getItem('user')){
      $('#chatBox').append("<div style='width:6%;border-radius:50%'><img style='display: flex; vertical-align: middle;border-style: none;border-radius: 20px;' width='100%' alt= " + msg.sender + " src= "+msg.recieverImg +" /></div>")
      $('#chatBox').append("<span class='recieverMsg'>"+msg.message.message+"</span>");
      $('#chatBox').append("<span class='chatTime2' style='margin-left:0'>"+ moment().format('llll') +"</span>");
      $('#chatBox').append("<span><audio autoplay><source src="+ song +" type='audio/mpeg'></audio></span>")
    }
  //}
};

  return () => {
    //
  }
}, [])

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// send message
const handleSend = async (e) => {

  let formData = new FormData();
   formData.append('sender', sessionStorage.getItem('user'));
   formData.append('reciever', user.reciever);
   formData.append('token',  props.location.pathname.replace("/Chat/",''));
   formData.append('msg', message.message);

      console.log(`
      -- Submitting --
      sender: ${sessionStorage.getItem('user')}
      reciever : ${user.reciever}
      token: ${props.location.pathname.replace("/Chat/",'')}
      msg: ${message.message}
      `);

  await axios({
       method: 'POST',
       url : `${SERVER_URL}/src/api/userChat.php`,
       data : formData,
       responseType: 'json',
       config : {headers : { 'Content-Type': 'multipart/form-data' }},
   })
   .then(function(response){
       //handle success
       console.log(response)
       
   })
   .catch(function(response){
       //handle error
       console.log(response)

   })

   var conn2 = new WebSocket('ws://localhost:5001');
   conn2.onopen = function(e){
   console.log("Connection established! port 5001");
   const item3 = {sender: sessionStorage.getItem('user'), reciever: user.reciever, recieverImg: user2.urlProfile.replace('../public',''), token: props.location.pathname.replace("/Chat/",''),message: message}
   conn2.send(JSON.stringify(item3))
   };

      setdisabled(false)
      document.getElementById('message').value = ''

///////////////////////////
var conn = new WebSocket('ws://localhost:5005');
conn.onopen = (e) => {
var items2 = {reciever:sessionStorage.getItem('user'), 
             sender:user.reciever, 
             urlProfile:user2.urlProfile.replace('../public',''),
             chat_token: props.location.pathname.replace("/Chat/",''),
             time: moment().format('LLL')
            }
             
conn.send(JSON.stringify(items2));
};
////////////////////////////////////////////////////////////////////////////////////////////////////////// 
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// send pictures by socket on chat
 const handleSendImage = async (event) => {

  let formData = new FormData();
   formData.append('sender', sessionStorage.getItem('user'));
   formData.append('reciever', user.reciever);
   formData.append('token',  props.location.pathname.replace("/Chat/",''));
   formData.append('img', event.target.files[0]);

      console.log(`
      -- Submitting --
      sender: ${sessionStorage.getItem('user')}
      reciever : ${user.reciever}
      token: ${props.location.pathname.replace("/Chat/",'')}
      img: ${event.target.files[0]}
      `);

  await axios({
       method: 'POST',
       url : `${SERVER_URL}/src/api/saveImage.php`,
       data : formData,
       responseType: 'json',
       config : {headers : { 'Content-Type': 'multipart/form-data' }},
   })
   .then(function(response){
       //handle success
       console.log(response)
       
   })
   .catch(function(response){
       //handle error
       console.log(response)

   })

  var conn = new WebSocket('ws://localhost:5004');
  conn.onopen = function(e) { 
    var reader = new FileReader();
    var image = event.target.files[0];
    var slice = image.slice(0, 500000);
    reader.onload = function(evt){
      var arrayBuffer = evt.target.result; 
    
        const item = { sender: sessionStorage.getItem('user'), reciever: user.reciever, recieverImg: user2.urlProfile.replace('../public',''), token: props.location.pathname.replace("/Chat/",''), img: arrayBuffer, imgUrl: URL.createObjectURL(event.target.files[0])}
        conn.send(JSON.stringify(item)) 
    }
  reader.readAsDataURL(slice);
  // reader.readAsArrayBuffer(slice);
  console.log("Connection established! port5004");
 };

  console.log('imageUrl', img)
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
// recieve image by socket
React.useEffect(() => {  
  var conn = new WebSocket('ws://localhost:5004');
  conn.onopen = function(e) {
  console.log("Connection established! port:5004");
  };
  conn.onmessage = function(e) {
    const msg = JSON.parse(e.data);
      if( msg.sender === sessionStorage.getItem('user')){
        $('#chatBox').append("<div style='width:30%; float:right; margin-top: 7%;'><img style='display: flex; vertical-align: middle;border-style: none;border-radius: 20px;' width='100%' alt= " + msg.sender + " src= "+ msg.imgUrl +" /></div>")
        $('#chatBox').append("<span class='chatTime1'>"+ moment().format('llll') +"</span>");
      }
      if( msg.reciever === sessionStorage.getItem('user')){
        $('#chatBox').append("<div style='width:6%;border-radius:50%'; marginTop: '30%'><img style='display: flex; vertical-align: middle;border-style: none;border-radius: 20px;' width='100%' alt= " + msg.reciever + " src= "+msg.recieverImg +" /></div>")
        $('#chatBox').append("<div style='width:30%;float:left; margin-top: 0;' ><img style='display: flex; vertical-align: middle;border-style: none;border-radius: 20px;' width='100%' alt= " + msg.reciever + " src="+ msg.img +" /></div>")
        $('#chatBox').append("<span class='chatTime2' style='margin-left: 1%'>"+ moment().format('llll') +"</span>");
        $('#chatBox').append("<span><audio autoplay><source src="+ song +" type='audio/mpeg'></audio></span>")
      }
      console.log('msg',msg)

  };
  return () => {
    //
  }
}, [])

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fetch chat msg from database
const[msg, setMsg] = React.useState('')
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const sender = sessionStorage.getItem('user')
  const token =  props.location.pathname.replace("/Chat/",'');
  let url = `${SERVER_URL}/src/api/chatMsg.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?sender='+sender+"&token="+token);
    setMsg(data)

  }
fetchData();

  return () => {
    //
  }
}, [props.location.pathname.replace("/Chat/",'')])
console.log('msg',msg)
 // ////////////////////show status of users by socket//////////////////////////////////////////////////////////////////////////////
 const[userStatus, setUserStatus] = React.useState([])
React.useEffect(() => {
var conn = new WebSocket('ws://localhost:5002');
conn.onopen = function(e) {
  console.log("Connection established!");
};
conn.onmessage = (e) => {
  const ws = JSON.parse(JSON.parse(e.data))        
  setUserStatus(ws.user)
}
  return () => {
    //
  }
}, [])

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  let url = `${SERVER_URL}/src/api/checkOnline.php`;
  const fetchData = async () => {
  // const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  const {data} = await axios.get(url);
  data && data.map((x) => 
     setUserStatus(state=>[...state,x.user])
   )
  
  }
fetchData();
  return () => {
    //
  }
}, [])

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// show status of offline of users
React.useEffect(() => {
var conn = new WebSocket('ws://localhost:5003');
conn.onopen = function(e) {
  console.log("Connection established!");
};
conn.onmessage = (e) => {
  const ws = JSON.parse(e.data)  
  let newId = userStatus && userStatus.filter(info => {
    return ws !== info.reciever;
  });     
  setUserStatus(newId)
}
  return () => {
    //
  }
}, [])

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const[chatImage, setChatImage] = React.useState('')
const[showImg, setShowImg] = React.useState(false)
const showImage = async (id) => {

  setShowImg(true)

  let formData = new FormData();
  formData.append('id', id);

     console.log(`
     -- Submitting --
     id: ${id}
     `);

 await axios({
      method: 'POST',
      url : `${SERVER_URL}/src/api/showPicInChat.php`,
      data : formData,
      responseType: 'json',
      config : {headers : { 'Content-Type': 'multipart/form-data' }},
  })
  .then(function(response){
      //handle success
      console.log(response)
      response && response.data.map(x => 
        setChatImage(x.url)
        )
      
  })
  .catch(function(response){
      //handle error
      console.log(response)

  })

}
// /////////////////////////////////////////Delete chat history/////////////////////////////////////////////////////////////////////////////////////////
  const deleteChatHistory = async (e) => {
  
    let formData = new FormData();
    formData.append('token',  props.location.pathname.replace("/Chat/",''));
 
       console.log(`
       -- Submitting --
       token: ${props.location.pathname.replace("/Chat/",'')}
       `);
 
   await axios({
        method: 'POST',
        url : `${SERVER_URL}/src/api/deleteChatHistory.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }},
    })
    .then(function(response){
        //handle success
        console.log(response)
        if(response.data === 'delete'){
          setShowOption(false)
          setMsg('')
        }
    })
    .catch(function(response){
        //handle error
        console.log(response)
 
    })
  }
// /////////////////////////////////////////Delete user chat/////////////////////////////////////////////////////////////////////////////////////////
  const deleteUserChat = async (id) => {

    setShowOption(false)
    let newUser = chatUser && chatUser.filter(info => {
      return id !== info.chat_token;
    });
  setChatUser(newUser);
  setUser('')

    let formData = new FormData();
    formData.append('token',  props.location.pathname.replace("/Chat/",''));
 
       console.log(`
       -- Submitting --
       token: ${props.location.pathname.replace("/Chat/",'')}
       `);
 
   await axios({
        method: 'POST',
        url : `${SERVER_URL}/src/api/deleteUserChat.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }},
    })
    .then(function(response){
        //handle success
        console.log(response)
    
    })
    .catch(function(response){
        //handle error
        console.log(response)
 
    })
  }
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const[showPhone, setShowPhone] = React.useState(false)
// const handlePhone = () => {
//   setShowPhone(true)
// }
// ////////////////////////////////////////////check user seen the chat or not//////////////////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const fetchData = async () => {
     if(props.location.pathname.replace("/Chat/",'')){
        let formData = new FormData();
        formData.append('user', sessionStorage.getItem('user'));
        formData.append('token',  props.location.pathname.replace("/Chat/",''));
      
           console.log(`
           -- Submitting --
           user: ${sessionStorage.getItem('user')}
           token: ${props.location.pathname.replace("/Chat/",'')}
           `);
     
       await axios({
            method: 'POST',
            url : `${SERVER_URL}/src/api/userChatSeen.php`,
            data : formData,
            responseType: 'json',
            config : {headers : { 'Content-Type': 'multipart/form-data' }},
        })
        .then(function(response){
            //handle success
            console.log(response)
            
        })
        .catch(function(response){
            //handle error
            console.log(response)
     
        })
      }
  }
 fetchData();
  return () => {
    
  }
}, [props.location.pathname.replace("/Chat/",'')])
// ////////////////////////////////////////////check who writing//////////////////////////////////////////////////////////////////////////////////////
const[isTypingSender, setIsTypingSender] = React.useState(false);
const[isTypingReciever, setIsTypingReciever] = React.useState(false);
const handleFocus = (e) => {
  var conn = new WebSocket('ws://localhost:5007');
  conn.onopen = function(e){
  console.log("Connection established! port 5007");
  const item = {sender: sessionStorage.getItem('user'), reciever: user.reciever, token: props.location.pathname.replace("/Chat/",'')}
  conn.send(JSON.stringify(item))
  };
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
const[userSender, setUserSender] = React.useState()
React.useEffect(() => {
  var conn = new WebSocket('ws://localhost:5007');
  conn.onopen = function(e) {
    console.log("Connection established!");
  };
  conn.onmessage = (e) => {
    const ws = JSON.parse(e.data) 
    setUserSender(ws.sender)
        if(ws.sender === sessionStorage.getItem('user') ){
          setIsTypingSender(true)
        }
        if(ws.reciever === sessionStorage.getItem('user')){
            setIsTypingReciever(true)
        }

  }
    return () => {
      //
    }
  }, [props.location.pathname.replace("/Chat/",'')])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
const handleBlur = () => {
  var conn = new WebSocket('ws://localhost:5008');
  conn.onopen = function(e){
  console.log("Connection established! port 5008");
  const item = {sender: sessionStorage.getItem('user'), reciever: user.reciever, token: props.location.pathname.replace("/Chat/",'')}
  conn.send(JSON.stringify(item))
  };

}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
  var conn = new WebSocket('ws://localhost:5008');
  conn.onopen = function(e) {
    console.log("Connection established!");
  };
  conn.onmessage = (e) => {
    const ws = JSON.parse(e.data) 
      if(ws.sender === sessionStorage.getItem('user')){
        setIsTypingSender(false)
      } 
      if(ws.reciever === sessionStorage.getItem('user')){
        setIsTypingReciever(false)
      }
   
  }
    return () => {
      //
    }
  }, [props.location.pathname.replace("/Chat/",'')])
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"
       edge="start"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        aria-label="open drawer"
        style={{backgroundColor:'#4d4d4d'}}
        >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Advert Profile
          </Typography>
          <Typography className={classes.menuText} variant="h8" noWrap onClick={()=> props.history.push('../Advert')}>
            All Business Advert 
          </Typography>
          <Typography className={classes.menuText} variant="h8" noWrap onClick={()=> props.history.push('../FreeAdvert')}>
            Free Advert 
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=> props.history.push('./') }
              color="inherit"
            >
              <HomeIcon fontSize="large"/>
            </IconButton>

            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
                <MailIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              {/* <Badge badgeContent={1} color="secondary"> */}
                <NotificationsIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={AllAdvert} >
                <ListItemIcon>
                     <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary = "All Adverts"/>
            </ListItem>
            <ListItem button onClick={AllData}>
                <ListItemIcon>
                     <StorageIcon />
                </ListItemIcon>
                <ListItemText primary = "Data"/>
            </ListItem>
            <ListItem button onClick={location}>
                <ListItemIcon>
                     <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary = "Location"/>
            </ListItem>
            <ListItem button onClick={profile}>
                <ListItemIcon>
                     <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary = "Profile"/>
            </ListItem>
            <ListItem button onClick={chat} style={{background:'silver'}}>
                <ListItemIcon>
                     <ChatIcon />
                </ListItemIcon>
                <ListItemText primary = "Chat"/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={image}>
                <ListItemIcon>
                     <PhotoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary = "All Images"/>
            </ListItem>
            <ListItem button onClick={video}>
                <ListItemIcon>
                     <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary = "All Videos"/>
            </ListItem>
            <ListItem button onClick={save}>
                <ListItemIcon>
                     <SaveAltIcon />
                </ListItemIcon>
                <ListItemText primary = "Saved"/>
            </ListItem>
            <ListItem button onClick={discount}>
                <ListItemIcon>
                     <LocalOfferTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary = "Discount"/>
            </ListItem>
            <ListItem button onClick={discountSave}>
                <ListItemIcon>
                     <BookmarkBorderIcon />
                </ListItemIcon>
                <ListItemText primary = "Discount Save"/>
            </ListItem>
            <ListItem button onClick={notification}>
                <ListItemIcon>
                     <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText primary = "notification"/>
            </ListItem>
            <ListItem button onClick={signOut}>
                <ListItemIcon>
                     <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary = "Sign out"/>
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <Box component="span" m={1} > 
           <Grid container spacing={3}>
             <Grid item xs={10} className={classes.chatBoard}>
                <Grid  item xs={4} className={classes.chatBoardUser}>
                  <Grid item xs className={classes.chatBoardUserPart1}><p style={{ textAlign:'center',lineHeight:'5',fontWeight:'bold'}}>{sessionStorage.getItem('user')}</p></Grid>
                  <Grid item xs className={classes.chatBoardUserPart2}>
                      <List style={{padding:'0'}}>
                        {chatUser.length === 0 || chatUser === sessionStorage.getItem('user') ? 
                          <ListItem>
                            <ListItemText>
                              No user for chat!
                            </ListItemText>                      
                           </ListItem>                                   
                          :
                      <React.Fragment>  
                        {chatUser && chatUser.map((info,i) => 
                          <ListItem style={{padding:'0', marginTop:'12px'}} key={i}>
                              <Link to={'/Chat/'+info.chat_token} className={classes.listUsers} id ="listusers" style={{width:'100%'}}>
                                    <div className="grid-item" style={{marginLeft:'25%'}}>
                                    {userStatus && userStatus.includes(info.reciever) ?
                                        <StyledBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        variant="dot"
                                      >
                                        <Avatar alt={info.reciever} src={info.urlProfile ? info.urlProfile.replace('../public','') : a} className={classes.large} />
                                    </StyledBadge>
                                  :
                                      <StyledBadge2
                                            overlap="circle"
                                            anchorOrigin={{
                                              vertical: 'bottom',
                                              horizontal: 'right',
                                            }}
                                            variant="dot"
                                          >
                                            <Avatar alt={info.reciever} src={info.urlProfile ? info.urlProfile.replace('../public','') : a} className={classes.large} />
                                        </StyledBadge2>
                                     }
                                    </div>
                                    <div className="grid-item" style={{textAlign: 'left',marginLeft:'11%'}}>
                                      <ListItemText primary={<Typography style={{fontSize:'14px'}}>{info.reciever}</Typography>} secondary={info.time} />
                                    </div>
                               </Link>
                               {/* delete chat user and chat history */}
                                        <Rodal visible={showOption} animation={"slide"} height ={200} onClose={()=> setShowOption(false)} customStyles={{borderRadius:'20px',marginTop:'20%'}}>
                                          <List style={{display:'flex', flexDirection:'column',padding:'20px', color:'red'}}>
                                          <ListItem>
                                            <ListItemText primary="Delete Chat History" style={{cursor:'pointer', textAlign:'center'}} onClick={deleteChatHistory}/>
                                          </ListItem>
                                          <ListItem>
                                            <ListItemText primary="Delete User Chat" style={{cursor:'pointer', textAlign:'center',marginTop:'12%'}} onClick={() => deleteUserChat(info.chat_token)}/>
                                          </ListItem>
                                        </List>
                                      </Rodal>
                                      {/* ////////////////////////////// */}
                          </ListItem>
                        )}
                    </React.Fragment>
                        }
                      </List>
                  </Grid>
                </Grid>
                <Grid  item xs={8} className={classes.chatBoardText}>
                      <Grid item xs className={classes.chatBoardTextPart1}>
                          <div className="grid-item" style={{marginTop: '8%',marginLeft: '66%'}}><Avatar alt={user ? user.reciever : 'no user selected'} src={user.urlProfile ? user.urlProfile.replace('../public','') : a}/></div>
                          <div className="grid-item" style={{textAlign: 'left'}}><p style={{textAlign: 'left',marginTop:'6%',fontSize: '1rem',fontWeight: 'bold'}}>{user.reciever ? user.reciever : "someone"}</p></div>
                          <div className="grid-item">
                            {user.reciever ?
                            <MoreVertIcon style={{fontSize:'1.5rem',float:'right',marginTop:'11%', marginRight:'13%',cursor:'pointer'}} onClick={()=> setShowOption(true)}/>
                            :
                            ''
                            }
                          </div>
                      </Grid>
                  <Grid item xs className={classes.chatBoardTextPart2}>
                      <Grid item xs className={classes.chatBoardTextPart21} id='chatBoard2' ref={messagesEndRef}>
      {/* chat board code */}
                          <div id="chatBox" >
                                {msg && msg === 'no chat' ? '' 
                                :
                              <React.Fragment>
                                  {msg && msg.map((info, i) => 
                                  <React.Fragment key={i} >
                                    {info.sender === sessionStorage.getItem('user') ?
                                     <React.Fragment>
                                      {info.msg && info.msg === 'no msg' ? 
                                       <React.Fragment>
                                          <div style={{width:'30%', float:'right', marginTop: '48%'}}><img onClick={() => showImage(info.id)} style={{display: 'flex', verticalAlign: 'middle', borderStyle: 'none', borderRadius: '20px'}} width='100%' alt= {info.sender} src= {info.url.replace('../public','')} /></div> 
                                          <span className="chatTime1">{moment(info.time, 'YYYY-MM-DD hh:mm:ss').fromNow()}</span> 
                                       </React.Fragment>
                                       :
                                       <React.Fragment>
                                         <span className="senderMsg">{info.msg}</span>
                                         <span className="chatTime1">{moment(info.time, 'YYYY-MM-DD hh:mm:ss').fromNow()}</span>
                                      </React.Fragment>
                                       }
                                    
                                     </React.Fragment>
                                     :
                                     <React.Fragment>
                                      {info.msg && info.msg === 'no msg' ?
                                      <React.Fragment>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <div style={{width:'6%', borderRadius:'50%',marginTop: '30%'}}><img style={{display: 'flex', verticalAlign: 'middle', borderStyle: 'none', borderRadius: '20px'}} width='100%' alt= {info.reciever} src= {user.urlProfile ? user.urlProfile.replace('../public','') : a} /></div> 
                                            <div style={{width:'30%', float:'left', marginTop: '0'}} ><img onClick={() => showImage(info.id)} style={{display: 'flex', verticalAlign: 'middle', borderStyle: 'none', borderRadius: '20px'}} width='100%' alt= {info.reciever} src={info.url.replace('../public','')}/></div> 
                                            <span className='chatTime2'>{moment(info.time, 'YYYY-MM-DD hh:mm:ss').fromNow()}</span> 
                                        </div>
                                      </React.Fragment>
                                      :
                                      <React.Fragment>
                                         <div style={{display:'flex', flexDirection:'column'}}>
                                           <div style={{width:'6%',borderRadius:'50%'}}><img style={{display: 'flex', verticalAlign: 'middle',borderStyle: 'none',borderRadius: '20px'}} width='100%' alt={info.reciever} src= {user.urlProfile ? user.urlProfile.replace('../public','') : a} /></div>
                                           <span className="recieverMsg">{info.msg}</span>
                                           <span className="chatTime2">{moment(info.time, 'YYYY-MM-DD hh:mm:ss').fromNow()}</span>
                                        </div>
                                      </React.Fragment>
                                      }
                                    
                                     </React.Fragment>
                                   }  
                                 </React.Fragment>
                                  )}
                              </React.Fragment>
                              }
                          </div>
                      </Grid>
                      <Grid item xs className={classes.chatBoardTextPart22} style={{background:'#f9f2ec'}}>   
                              <InputBase
                                className={classes.input}
                                placeholder="Message..."
                                inputProps={{ 'aria-label': 'Message...' }}
                                name="message"
                                id="message"
                                onChange={handleMessage('message')}
                                autoComplete='off'
                                onFocus={handleFocus}
                                onBlur = {handleBlur}
                              />
                              <IconButton color="primary" type="submit" name="send" className={classes.iconButton} aria-label="send" onClick={(e) => {handleSend(e)}}  disabled={disabled && message !== " " ? '' : true} >
                                <SendIcon />
                              </IconButton>
                              <Divider className={classes.divider} orientation="vertical" />
                              <input accept="image/*" className={classes.inputImage} id="icon-button-file" type="file" name="sendImage" onChange={handleSendImage}/>
                              <label htmlFor="icon-button-file" style={{marginTop:'1%'}}>
                              <IconButton  color="primary" className={classes.iconButton} aria-label="upload picture" component="span" >
                                <CropOriginalIcon />
                              </IconButton>  
                              </label> 
                              {/* <Divider className={classes.divider} orientation="vertical" />
                              <label htmlFor="icon-video-phone" style={{marginTop:'1%'}}>
                              <IconButton  color="primary" className={classes.iconButton} aria-label="video phone" component="span" >
                                <PhoneInTalkIcon onClick={handlePhone}/>
                              </IconButton>  
                              </label>  */}
                      </Grid>            
                  </Grid>
                </Grid>
             </Grid>
          </Grid> 
        </Box>
        <div style={{display:'flex', flexDirection:'row'}} id="isTyping">
        {isTypingSender ?  <Grid style={{marginLeft:'8%', color:'red'}}><i>you are writing...</i></Grid> : '' } 
        {isTypingReciever ? <Grid style={{marginLeft:'62%', color:'blue'}}><i>{ userSender } is writting... </i></Grid> : '' }
        </div>
      </main>
      <Rodal visible={showImg} animation={"door"} height ={600} onClose={()=> setShowImg(false)} customStyles={{borderRadius:'20px',marginTop:'5%'}}>
            <img src = {chatImage && chatImage.replace('../public','') } width="100%" height="100%" alt='chat image' style={{}}/>
      </Rodal>

      {/* <Rodal visible={showPhone} animation={"door"} height ={600} width={1000} onClose={()=> setShowPhone(false)} customStyles={{borderRadius:'20px',marginTop:'4.5%'}}>
            <VideoPhone sender={sessionStorage.getItem('user')} reciever={user.reciever} token={ props.location.pathname.replace("/Chat/",'')}/>
      </Rodal> */}

    </div> 
  );
}
export default withRouter(Chat)

