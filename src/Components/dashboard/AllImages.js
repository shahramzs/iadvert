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
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StorageIcon from '@material-ui/icons/Storage';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import axios from'axios'
import Rodal from 'rodal'
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Alert, AlertTitle } from '@material-ui/lab';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'js-cookie'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import moment from 'moment'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Snackbar from '@material-ui/core/Snackbar';
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
  form:{
    display:'flex',
    flexDirection:"column",
    padding:'2rem'
  },
  textToken:{
    marginBottom: '2rem'
  },
  addImage:{
    marginBottom: '1rem'
  },
  input: {
    display: 'none',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    top:'35rem'
  },
  menuText: {
    marginLeft: '5%',
    color: 'silver',
    cursor: 'pointer',
  },
}));

 function AllImages(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

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

  const [advert, setAdvert] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/allImages.php`;
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

const[token, setToken] = React.useState('');
const[moreImage, setMoreImage] = React.useState('')
const [error, setError] = React.useState(false);
const [dialog, setDialog] = React.useState(false);
const [dialog2, setDialog2] = React.useState(false);
const [percent, setPercent] = React.useState(0);
const [progress, setProgress] = React.useState(false);

const handleTokenChange = (e) => {
 setToken(e.target.value);

 if(e.target.value !== ''){
  setError({token:false})
 }
};

const handleImageChange = (e) => {
  setMoreImage(e.target.files[0]);

  if(e.target.files[0] !== ''){
    setError({token:false})
   }
   
 };

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if(token === ''){
    setError({token:true})
    return false;
  }else{
    setError({token:false})
  }
  if(moreImage === ''){
    setError({moreImage:true})
    return false;
  }else{
    setError({moreImage:false})
  }

  setProgress(true);
  const SERVER_URL = "http://127.0.0.1:8000";

  console.log(`
            -- Submitting --
            user: ${sessionStorage.getItem('user')}
            token: ${token}
            image : ${moreImage}
            `);
  let formData = new FormData();
   formData.append('user', sessionStorage.getItem('user'));
   formData.append('token', token);
   formData.append('image', moreImage);

  await axios({
       method: 'POST',
       url : `${SERVER_URL}/src/api/insertMoreImage.php`,
       data : formData,
       responseType: 'json',
       config : {headers : { 'Content-Type': 'multipart/form-data' }},
       onUploadProgress: ProgressEvent => {
        console.log('upload progress :'+ Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%")
        setPercent(Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%")
    }
   })
   .then(function(response){
       //handle success
       if(response.data !== 'not ok'){
         setVisible2(false);
         setDialog(true);
         setToken('');
         setMoreImage('');
         setProgress(false);
         //update memory to add new image natively
         let url = response.data;
         let user = sessionStorage.getItem('user');
         const newList = advert.concat({ user , url , token});
         setAdvert(newList);
       
        //  console.log('newList', newList);

       }else{
        setVisible2(false);
        setDialog2(true);
       }
       console.log(response)
      
   })
   .catch(function(response){
       //handle error
       console.log(response)

   })

}

const [openSnack, setOpenSnack] = React.useState(false);
const handleDelete = async (id) => {

  // const newId = advert.image.filter((item) => item.id !== id);
  // setAdvert(newId);

  let newId = advert && advert.filter(info => {
    return id !== info.id;
  });
setAdvert(newId);
// console.log('may deleted',newId);
  
  const SERVER_URL = "http://127.0.0.1:8000";
  console.log(`
            -- Submitting --
            id: ${id}
            `);
  let formData = new FormData();
   formData.append('id', id);
   await axios({
    method: 'POST',
    url : `${SERVER_URL}/src/api/deleteImage.php`,
    data : formData,
    responseType: 'json',
    config : {headers : { 'Content-Type': 'multipart/form-data' }},
})
.then(function(response){
    //handle success
    if(response.data == 'delete'){
      setOpenSnack(true);
    }
})
.catch(function(response){
    //handle error
    console.log(response)

})

}

const uploadImage = () => {
    setDialog2(false);
    window.location.reload();
}

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
  setToken(token)
  setHandleToken(false)
}

React.useEffect(() => {
  document.title  = `${sessionStorage.getItem('user')} / Images`;
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
              aria-label="add new image"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=>setVisible2(true)}
              color="inherit"
            >
              <AddAPhotoIcon />
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
            <ListItem button onClick={image} style={{background:'silver'}}>
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
        <Box component="span" m={1}> 
          <Grid container spacing={3}>
        {advert && advert === 'noImage' ? <Alert severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                        <AlertTitle>No picture Found!</AlertTitle>
                                                        Pictures Don't found! — <strong>check it out!</strong>
                                                      </Alert> : 
           <React.Fragment>
     {advert && advert.map((info, i) =>
          <React.Fragment >
              <Grid item xs={3} key={i} >
                <Card className={classes.root1} >
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} alt={info.user} src={info.urlProfile ? info.urlProfile.replace('../public','') : info.user}/>
                      }
                      subheader={moment(info.time).format('LLL')}
                    />
                    <CardMedia
                      className={classes.media}
                      image={info.url.replace('../public','')}
                      title={info.user}
                      id={info.id}
                    />
                    <CardContent>
                    <Typography style={{fontSize:'0.8rem'}}>Token = {info.token}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" onClick={()=> handleDelete(info.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="share" onClick={()=>setVisible(true)}>
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
            </Grid>
        </React.Fragment>
      )}  
      
      </React.Fragment>
    }
          </Grid> 
        </Box>
        <Zoom
          key={classes.fab}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
        <Fab color="primary" aria-label="add photo" className={classes.fab} onClick={()=>setVisible2(true)}>
           <PhotoCamera />
        </Fab>
      </Zoom>
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

            <Rodal visible={visible2} onClose={()=> setVisible2(false)} animation='door' width={800} height={400}>
              <Box>
                <h5 style={{textAlign:'center'}}>Add More Image To your Business Advert</h5>
                <form className={classes.form} onSubmit={(e) => {handleFormSubmit(e)}}>
                    <TextField 
                    disabled
                    error = {error.token ? true : false}
                    id="outlined-token" 
                    label="add your advert token" 
                    type="text" 
                    variant="outlined" 
                    name="token"
                    onChange={handleTokenChange}
                    onClick={()=>setHandleToken(true)}
                    autoComplete="off"
                    value={chooseTokenUser}
                    />
                    <Typography variant="caption" display="block" gutterBottom  className={classes.textToken}>
                      Add your advert token. every business advert has a specific token.
                    </Typography>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      name="moreImage"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Upload Image {' '}<PhotoCamera />
                      </Button> 
                      <Typography>{moreImage.name} {' '} {moreImage.size}</Typography>
                      {error.moreImage ? <p style={{color:'red'}}>Please select an image</p> : ''}
                    </label>
                    <Typography variant="caption" display="block" gutterBottom className={classes.addImage}>
                      You can add more image to your advert here.
                    </Typography>
                    <div style={{display:'flex',flexDirection:"row",margin:'2rem auto'}}>
                        <Button size="large" color="primary" style={{marginRight:'5rem'}} type="submit" >Add Image</Button>
                        <Button size="large" color="secondary" onClick={()=>setVisible2(false)} style={{marginLeft:'5rem'}}>Cancel</Button>
                    </div>
                </form>  
              </Box>                  
            </Rodal>

              <Dialog
                  open={dialog}
                  onClose={()=>setDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Upload Image"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You upload more image successfully. <strong>you can add more image here.</strong>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={()=>setDialog(false)} color="primary">
                      OK
                    </Button>
                  </DialogActions>
             </Dialog>

             <Dialog
              open={dialog2}
              onClose={()=>setDialog2(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              style={{background:'orange'}}
            >
              <DialogTitle id="alert-dialog-title">{"Upload Image Failed"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You upload more image unsuccessfully. <strong>you can add more image here.</strong>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={uploadImage} color="primary">
                  OK
                </Button>
              </DialogActions>
        </Dialog>

        <Rodal visible={progress} onClose={()=> setProgress(false)} animation='door'>
        <div id="loader">
            <div className="loading-dots">
                <div className="bounce"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
              </div>
            </div> 
            <div className="progressBar">
                <div className="filler" style={{width:`${percent}`, textAlign:"center",lineHeight:"1.5"}}> 
                    {percent}
                  </div>
            </div>
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

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>setOpenSnack(false)}>
                <Alert onClose={()=>setOpenSnack(false)} severity="success">
                image delete successfully.
                </Alert>
           </Snackbar>
    </div> 
  );
}
export default AllImages