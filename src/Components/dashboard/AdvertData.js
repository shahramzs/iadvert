import React from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
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
import a from '../../img/a.jpg'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StorageIcon from '@material-ui/icons/Storage';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios'
import { Button } from '@material-ui/core';
import Rodal from 'rodal'
import { Row } from 'react-bootstrap';
import { Alert, AlertTitle } from '@material-ui/lab';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'js-cookie'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ChatIcon from '@material-ui/icons/Chat';
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  form:{
    display:'flex',
    flexDirection:"column",
    padding:'2rem'
  },
  textToken:{
    marginBottom: '1rem'
  },
  textExplain:{
    marginBottom: '1rem'
  },
  fabGreen: {
    position: 'fixed',
    color: theme.palette.common.white,
    backgroundColor: green[500],
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    top:'35rem',
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  infoIcon:{
    color:'red',
    fontSize:30,
    cursor:'pointer'
  },
  menuText: {
    marginLeft: '5%',
    color: 'silver',
    cursor: 'pointer',
  },
}));

 function AdvertData(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

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
          {/* <Badge badgeContent={11} color="secondary"> */}
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

  const AllAdvert = (e) => {
    e.preventDefault();
    props.history.push('./account'); 
  }
  const AllData = (e) => {
    e.preventDefault();
    props.history.push('./advertData'); 
  }
  const location = (e) => {
    e.preventDefault();
    props.history.push('./advertLocation'); 
  }
  const profile = (e) => {
    e.preventDefault();
    props.history.push('./profileAdvert'); 
  }
  const chat = (e) => {
    e.preventDefault();
    props.history.push('./Chat'); 
  }
  const image = (e) => {
    e.preventDefault();
    props.history.push('./allImages'); 
  }
  const video = (e) => {
    e.preventDefault();
    props.history.push('./allVideos'); 
  }
  const discount = (e) => {
    e.preventDefault();
    props.history.push('./discount'); 
  }
  const notification = (e) => {
    e.preventDefault();
    props.history.push('./notification'); 
  }
  const save = (e) => {
    e.preventDefault();
    props.history.push('./saved'); 
  }
  const discountSave = (e) => {
    e.preventDefault();
    props.history.push('./discountSave'); 
  }

  const [expanded2, setExpanded2] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

 
  const [advert, setAdvert] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/advertData.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setAdvert(data);
  
  }
  fetchData();
  return () => {
    //
  }
}, [])

// console.log('advert',advert);

const [visible, setVisible] = React.useState(false);
const [advertComment, setAdvertComment] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/commentData.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setAdvertComment(data);
  }
  fetchData();
  return () => {
    //
  }
}, [])
// console.log('advertComment',advertComment);

React.useEffect(() => {
  if(!sessionStorage.getItem('user')){
    props.history.push('/');
   }
  return () => {
    //
  }
}, [])

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
};

const [visible3,setVisible3] = React.useState(false)
const [error, setError] = React.useState(false);
const [openDialog, setOpenDialog] = React.useState(false);
const [form, setForm] = React.useState({
  token:'',
  extraText:''
});
const handleFormChange = (prop) => (event) => {
  setForm({ ...form, [prop]: event.target.value });
  if(form.token !== ''){
    setError({token:false})
  }
  if(form.extraText !== ''){
    setError({extraText:false})
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const SERVER_URL = "http://127.0.0.1:8000";

  if(form.token === ''){
    setError({token:true})
    return false;
  }
  if(form.extraText === ''){
    setError({extraText:true})
    return false;

  }
  
  console.log(`
            -- Submitting --
            user: ${sessionStorage.getItem('user')}
            token: ${form.token}
            text: ${form.extraText}
            `);

            let formData = new FormData();
            formData.append('user', sessionStorage.getItem('user'));
            formData.append('token', form.token);
            formData.append('extraText', form.extraText);

            var self = this;
            axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/insertExtraText.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                if(response.data == 'insert'){
                  setVisible2(false)
                  setOpenDialog(true)
                }
                
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })

}

const[moreInfo, setMoreInfo] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/fetchMoreInfo.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setMoreInfo(data);
  }
  fetchData();
  return () => {
    //
  }
}, [])


const [handleToken, setHandleToken] = React.useState(false);
const [chooseToken, setChooseToken] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/chooseToken.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setChooseToken(data);
  
  }
  fetchData();
  return () => {
    //
  }
}, [])

const [chooseTokenUser, setChooseTokenUser] = React.useState('');
const chooseTokenFromUser = (token) => {
  setChooseTokenUser(token);
  setForm({token:token})
  setHandleToken(false)
}

React.useEffect(() => {
  document.title  = `${sessionStorage.getItem('user')} / Advert Data`;
  return () => {
  
  }
}, [])

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
          <Typography className={classes.menuText} variant="h8" noWrap onClick={()=> props.history.push('./Advert')}>
            All Business Advert 
          </Typography>
          <Typography className={classes.menuText} variant="h8" noWrap onClick={()=> props.history.push('./FreeAdvert')}>
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
          <IconButton
              edge="second"
              aria-label="add more explanation"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=>setVisible2(true)}
              color="inherit"
            >
              <LibraryAddIcon />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
                <MailIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              {/* <Badge badgeContent={17} color="secondary"> */}
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
            <ListItem button onClick={AllAdvert}>
                <ListItemIcon>
                     <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary = "All Adverts"/>
            </ListItem>
            <ListItem button onClick={AllData} style={{background:'silver'}}>
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
            <ListItem button onClick={chat}>
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
                <ListItemText primary = "Discount Save"/>
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
        {/* your code */}
        <Box component="span" m={1}> 
           <h3 style={{textAlign:'center',marginBottom:'2%'}}>
              Your Information
           </h3>
           <Divider />
     {advert.advertUser && advert.advertUser.length === 0 || advert.advertUser === 'noData' ? <Alert severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                              <AlertTitle>No DATA Exist</AlertTitle>
                                                              There is'nt any data — <strong>check it out!</strong>
                                                            </Alert> : 
        <React.Fragment>
  {advert.advertUser && advert.advertUser.map((info, i) =>   
        <React.Fragment> 
          <h6 key={i} style={{textAlign:'center',marginTop:'2%', marginBottom:'2%'}}> token : {info.token}</h6>
          
           <Accordion expanded={expanded2 === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>Details About Your Advert</Typography>
                <Typography className={classes.secondaryHeading}>details of your advert</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row',marginBottom:'2%'}}>
                <h5>name :&nbsp;&nbsp;</h5>
                <Typography>{info.name}</Typography> 
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>title :&nbsp;&nbsp;</h5>
                <Typography>{info.title}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5 style={{width:"70%"}}> details :</h5>
                <Typography>{info.details}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>category :&nbsp; </h5>
                <Typography>{info.cat}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>start :&nbsp;</h5>
                <Typography>{info.start}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <Tooltip title="Time That You Create Your Adver." arrow interactive>
                <h5>time : &nbsp;</h5>
                </Tooltip>
                <Typography>{info.time}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <Tooltip title="there are more extra information about your business." arrow interactive>
                <InfoIcon className={classes.infoIcon} onClick={()=>setVisible3(true)}/>
                </Tooltip>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded2 === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>Your Location</Typography>
                <Typography className={classes.secondaryHeading}>
                  You are currently set your business location there.
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row',marginBottom:'2%'}}>
                <h5>Region :&nbsp;</h5>
                <Typography>{info.region}</Typography> 
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>country :&nbsp;</h5>
                <Typography>{info.country}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>state :&nbsp;</h5>
                <Typography>{info.state}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>city :&nbsp;</h5>
                <Typography>{info.city}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>street address :&nbsp; </h5>
                <Typography>{info.streetAddress}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>street address optional:&nbsp;</h5>
                <Typography>{info.optional}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>zip code: &nbsp;</h5>
                <Typography>{info.zipCode}</Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded2 === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>Your Contact</Typography>
                <Typography className={classes.secondaryHeading}>
                You are currently set your business contact there.
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row',marginBottom:'2%'}}>
                <h5>phone :&nbsp;&nbsp;</h5>
                <Typography>{info.phone}</Typography> 
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>email :&nbsp;&nbsp;</h5>
                <Typography>{info.email}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>instagram :&nbsp;</h5>
                <Typography>{info.instagram}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>twitter :&nbsp;</h5>
                <Typography>{info.twitter}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>facebook :&nbsp;</h5>
                <Typography>{info.facebook}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>linkedin :&nbsp;</h5>
                <Typography>{info.linkedin}</Typography>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginBottom:'2%'}}>
                <h5>web :&nbsp; </h5>
                <Typography>{info.web}</Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded2 === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>Comment</Typography>
                <Typography className={classes.secondaryHeading}>
                You can see here all comment that people send to your business.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <div style={{display:'flex', flexDirection:'row',marginBottom:'2%'}}>
              <h5 style={{width:'50%',fontSize:'1rem'}}>{info.commentName} :</h5>
              <span style={{color:'silver', marginLeft:'2%',marginTop:'0.5%',width:'20%'}}>{info.commentTime}</span>
                <Typography style={{marginRight:'9%'}}>{info.commentText}</Typography> 
                </div>
                <div>
                <Button variant="contained" color="primary" onClick={()=>setVisible(true)} style={{position:'absolute',right:'1%',width:'20%',bottom:'1%'}}>
                    Show All Comments
                </Button>
                </div>
              </AccordionDetails>
      </Accordion>
  </React.Fragment>
)}
</React.Fragment>
      }
        </Box>

        <Zoom
          key={classes.fabGreen}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
        <Fab color="secondary" aria-label="add text" className={classes.fabGreen} onClick={()=>setVisible2(true)}>
           <LibraryAddIcon />
        </Fab>
     </Zoom>
      </main>
            <Rodal customStyles={{overflow:'auto'}} visible={visible} onClose={()=> setVisible(false)} animation='rotate' width={1000} height={500} >
                    <Row className="review-part" >
                      {advertComment.advertUserComment && advertComment.advertUserComment.length === 0 ? <div style={{fontSize:'2rem',color:'red',margin:'0 auto'}}>No comment submit for this business advert yet.</div> :
                        <React.Fragment >
                                {advertComment.advertUserComment  && advertComment.advertUserComment.map((info, i) =>
                                    <div className="reviewPart" key={i}>
                                      <Alert severity="info" style={{marginBottom:'5%'}}>token : {info.token}</Alert>
                                      <Divider style={{marginBottom:'5%'}}/>
                                      <ul>
                                        <li>
                                          <img src={a} alt={info.name}/>
                                          <div style={{width:"30%",marginLeft: "19%",marginTop: "-12%"}}>
                                              <p style={{fontWeight:"bold"}}>{info.name}</p>
                                              <p style={{color:"silver",marginTop: "-5%"}}>{info.time}</p>
                                          </div>
                                        </li>
                                        <li>
                                          <p>
                                            {info.text}
                                          </p>
                                        </li>
                                      </ul>  
                                  </div>
                              )} 
                          </React.Fragment>
                              }
                          </Row>
            </Rodal>

            <Rodal visible={visible2} onClose={()=> setVisible2(false)} animation='door' width={1000} height={500}>
              <Box>
                <h5 style={{textAlign:'center'}}>Add More Explanation About your Business Advert</h5>
                <form className={classes.form} onSubmit={handleFormSubmit}>
                    <TextField 
                    disabled
                    error = {error.token ? true : false}
                    id="outlined-token" 
                    label="add your advert token" 
                    type="text" 
                    variant="outlined" 
                    onChange={handleFormChange('token')}
                    onClick={()=>setHandleToken(true)}
                    autoComplete="off"
                    value={chooseTokenUser}
                    name="token"
                    />
                    <Typography variant="caption" display="block" gutterBottom  className={classes.textToken}>
                      Add your advert token. every business advert has a specific token.
                    </Typography>
                    <TextField
                    error = {error.extraText ? true : false}
                      id="outlined-multiline-static"
                      label="more explanation"
                      multiline
                      rows={9}
                      variant="outlined"
                      onChange={handleFormChange('extraText')}
                      name="extraText"
                    />
                    <Typography variant="caption" display="block" gutterBottom className={classes.textExplain}>
                      In this part you can add any explanation about your advert that you forgot to write it.
                    </Typography>
                    <div style={{display:'flex',flexDirection:"row",margin:'0 auto'}}>
                        <Button size="large" color="primary" style={{marginRight:'5rem'}} type="submit" >Add Explanation</Button>
                        <Button size="large" color="secondary" onClick={()=>setVisible2(false)} style={{marginLeft:'5rem'}}>Cancel</Button>
                    </div>
                </form>  
              </Box>                  
            </Rodal>

            <Dialog
              open={openDialog}
              onClose={()=>setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Your Extra Explaination Add"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You Added your extra explaination to your business advert. every time you want to add some data to your
                  advert you can do it here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOpenDialog(false)} color="primary">
                  OK
                </Button>
              </DialogActions>
       </Dialog>

       <Rodal visible={visible3} onClose={()=> setVisible3(false)} animation='fade' width={1000} height={500}>
            <h5 style={{textAlign:'center',margin:'2rem'}}>More Information</h5>
            {moreInfo.moreInfoAdvert && moreInfo.moreInfoAdvert.length === 0 ? <Alert variant="outlined" severity="error" style={{marginTop:"5rem"}}>There is not any more information!<strong>you can add more information about your business from your profile.</strong></Alert> : 
            <React.Fragment>
            {moreInfo.moreInfoAdvert && moreInfo.moreInfoAdvert.map((info , i) => 
            <React.Fragment>
               <Typography key={i}>{info.text} <i style={{color:' #ff9999', fontSize:'13px'}}>token: {' '} {info.token}</i></Typography> <br/>
            </React.Fragment>
            )}
            </React.Fragment>
          }
       </Rodal>

       <Rodal visible={handleToken} onClose={()=> setHandleToken(false)} animation='door' customStyles	={{overflow:'auto'}}>
            <div style={{textAlign:'center'}}>
              <h5 style={{marginBottom:'5%'}}>Please choose of the your token below:</h5>
              {chooseToken && chooseToken.length === 0 || chooseToken === 'noToken' ? <Alert severity="error"><AlertTitle>No token found!</AlertTitle><Link to="../FreeAdvert">Add Free Business Advert</Link></Alert> :
               <React.Fragment>
              {chooseToken && chooseToken.map((info, i) => 
              <React.Fragment >
              <ul>
                <li key={i}  style={{marginTop:"7%",fontSize:'1rem',textAlign:"left"}} >
                <strong>{i+1}</strong> - <Link to="#" style={{textDecoration:'none',color:'red'}} onClick={() => chooseTokenFromUser(info.token)}>{info.token}</Link><br/><br/>
                </li>
              </ul>
              </React.Fragment>
              )}
              </React.Fragment>
              }
              </div> 
        </Rodal>

    </div> 
  );
}
export default AdvertData