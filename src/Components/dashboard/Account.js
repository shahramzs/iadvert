import React from 'react';
import { withRouter, Link } from 'react-router-dom'
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
import ChatIcon from '@material-ui/icons/Chat';
var numeral = require('numeral');
const drawerWidth = 240;
const SERVER_URL = "http://127.0.0.1:8000";

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

}));


 function Account(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
  const save = (e) => {
    e.preventDefault();
    props.history.push('./saved'); 
  }
  const discount = (e) => {
    e.preventDefault();
    props.history.push('./discount'); 
  }
  const discountSave = (e) => {
    e.preventDefault();
    props.history.push('./discountSave'); 
  }
  const notification = (e) => {
    e.preventDefault();
    props.history.push('./notification'); 
  }
  const signOut = (e) => {
     // check users are online or not.
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


const [advert, setAdvert] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/account.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setAdvert(data);

  }
  fetchData();
  return () => {
    //
  }
}, [])


const [visible, setVisible] = React.useState(false);

const freeAdvert = (e)=> {
  e.preventDefault();
 props.history.push('./FreeAdvert'); 
}

//delete advert
const [openSnack, setOpenSnack] = React.useState(false);
const [openSnackErr, setOpenSnackErr] = React.useState(false);
const deleteAdvert = (token) => {

  const newToken = advert && advert.filter((info) => info.token !== token);
  setAdvert(newToken);

  const SERVER_URL = "http://127.0.0.1:8000";
  
  console.log(`
            -- Submitting --
            user: ${token}
            `);

            let formData = new FormData();
            formData.append('token', token);

            axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/deleteAdvert.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                if(response.data === 'delete'){
                  //delete
                    setOpenSnack(true);
                }else{
                  //not delete
                  setOpenSnackErr(true);
                }
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })

}

React.useEffect(() => {
  if(!sessionStorage.getItem('user')){
    props.history.push('/');
   }
  return () => {
    //
  }
}, [])

const [seen, setSeen] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/notificationSeen.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setSeen(data);
  if(data == 0){
    setSeen(null)
  }
  }
  fetchData();
  return () => {
    //
  }
}, [])


const [seenUpdate, setSeenUpdate] = React.useState([]);
const notificationIcon = async (e) => {
  e.preventDefault();
  props.history.push('./Notification');
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/notificationSeenUpdate.php`;
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  setSeenUpdate(data);
}

React.useEffect(() => {
  document.title  = `${sessionStorage.getItem('user')} / Advert`;
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

            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
                <MailIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={seen} color="secondary">
                <NotificationsIcon onClick={notificationIcon}/>
              </Badge>
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
            <ListItem button onClick={AllAdvert} style={{background:'silver'}}>
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
        {/* your code */}
        <Box component="span" m={1} > 
           <Grid container spacing={3}>
        {advert && advert.length === 0 || advert === 'noAdvert' ? <Alert severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                                <AlertTitle>Advert Business Does'nt Exist!</AlertTitle>
                                                                You Don't Have Advert Business Yet. — <strong>Create Advert Business Here <Link to ='#' onClick={freeAdvert}>Free Advert</Link></strong>
                                                              </Alert> : 
        <React.Fragment>
        {advert && advert.map((info, i) => 
              <Grid item xs={4} key={i}>
                <Card className={classes.root1}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} alt={info.user} src={info.urlProfile ? info.urlProfile.replace('../public','') : info.user}/>
                          
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={info.title}
                      subheader={moment(info.time).format('LLL')}
                    />
                    <CardMedia
                      className={classes.media}
                      image={info.url ? info.url.replace('../public','') : img}
                      title={info.name}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {info.country} - {info.city}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {info.name} - {info.cat}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                       Like :  {info.like_num ? numeral(info.like_num).format('0,0') : 0}   
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                       View :  {info.view ? numeral(info.view).format('0,0') : 0}   
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                       number of picture :  {info.numPic ? info.numPic : 0}   
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                       token :  {info.token}   
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" onClick={() => deleteAdvert(info.token)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="share" onClick={()=>setVisible(true)}>
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Details:</Typography>
                        <Typography paragraph>
                         details: {info.details}
                        </Typography>
                        <Typography paragraph>
                         start: {info.start}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
            </Grid>
          )}
    </React.Fragment>
}
          </Grid> 
        </Box>
      </main>

      <Rodal visible={visible} onClose={()=> setVisible(false)} animation='rotate' width={500} height={500}>
               <div className="share-part-user">
                 <h3>Share This Advert Business To Your Family Or Your Friends</h3>
                 <ul>
                   <li><Link to={{pathname : "https://www.facebook.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaFacebookF size='1.5rem'/> {' '} Facebook</Link></li>
                   <li><Link to={{pathname : "https://www.twitter.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaTwitter size='1.5rem' /> {' '} Twitter</Link></li>
                   <li><Link to={{pathname : "https://www.instagram.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaInstagram size='1.5rem'/> {' '} Instagarm</Link></li>
                   <li><Link to="#" style={{fontSize:'1.5rem'}}><FaEnvelope size='1.5rem'/> {' '} Email</Link></li>
                   <li><Link to={{pathname : "https://web.whatsapp.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaWhatsapp size='1.5rem'/> {' '} WhatsApp</Link></li>
                 </ul>
               </div>
            </Rodal>

      <Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>setOpenSnack(false)}>
        <Alert onClose={()=>setOpenSnack(false)} severity="success">
          Your Business Advert Deleted successfully.
        </Alert>
      </Snackbar>

      <Snackbar open={openSnackErr} autoHideDuration={6000} onClose={()=>setOpenSnackErr(false)}>
        <Alert onClose={()=>setOpenSnackErr(false)} severity="error">
          Your Business Advert do not Deleted successfully.
        </Alert>
      </Snackbar>

    </div> 
  );
}
export default withRouter(Account)