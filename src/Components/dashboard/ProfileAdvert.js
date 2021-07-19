import React from 'react';
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
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhonelinkLockIcon from '@material-ui/icons/PhonelinkLock';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
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
  root2: {
    alignContent:'center',
    display:'flex', 
    flexDirection:'column',
    marginTop:'2%',

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
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginTop:'-40%',
    marginLeft:'5%'
  },
  menuText: {
    marginLeft: '5%',
    color: 'silver',
    cursor: 'pointer',
  },
}));

const SERVER_URL = "http://127.0.0.1:8000";

 function ProfileAdvert(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    fullname: '',
    mobile: '',
  });

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

   const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [advert, setAdvert] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/userProfile.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  data.user.map(info =>
    setAdvert(info)
    )
  
  }
  fetchData();
  return () => {
    //
  }
}, [])

const [error, setError] = React.useState({
  password:false,
  fullname:false,
  mobile:false
})


const actionInput = React.useRef(null);
const[code, setCode] = React.useState('');
const submit = (e) => {
  e.preventDefault();

  if(values.fullname === ''){
    setError({fullname:true})
    return false;
  }
  if(values.mobile === ''){
    setError({mobile:true})
    return false;

  }
  if(values.password === ''){
    setError({password:true})
    return false;

  }
  
  console.log(`
            -- Submitting --
            user: ${sessionStorage.getItem('user')}
            fullname: ${values.fullname}
            mobile: ${values.mobile}
            password: ${values.password}
            hidden: ${actionInput.current.value}
            `);
if(sessionStorage.getItem('code') === actionInput.current.value){
            let formData = new FormData();
            formData.append('user', sessionStorage.getItem('user'));
            formData.append('fullname', values.fullname);
            formData.append('mobile', values.mobile);
            formData.append('password', values.password);

            axios({
                method: 'POST',
                url : `${SERVER_URL}/src/api/insertProfile.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
                if(response.data == 'insert'){
                  setOpenDialog(true)
                }
                
                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })
    }else{
      return false;
    }

}


const [img, setImg] = React.useState('');
const [uploadFile, setUploadFile] = React.useState('');
const [errorImg, setErrorImg] = React.useState(false);
const [progress, setProgress] = React.useState('');

const handleChangeImage = async (e) => {
  setImg(e.target.files[0])

  console.log(`
            -- Submitting --
            user: ${sessionStorage.getItem('user')}
            image : ${e.target.files[0]}
            `);
  let formData = new FormData();
   formData.append('user', sessionStorage.getItem('user'));
   formData.append('image', e.target.files[0]);

  await axios({
       method: 'POST',
       url : `${SERVER_URL}/src/api/imageProfile.php`,
       data : formData,
       responseType: 'json',
       config : {headers : { 'Content-Type': 'multipart/form-data' }},
       onUploadProgress: function (progressEvent) {
        setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
      },
   })
   .then(function(response){
       //handle success
       console.log(response)
       if(response.data.length !== 0){
            if(response.data === "error"){
              setErrorImg(true)
              return false;
          }
        setUploadFile(response.data.replace('../public',''));
        return response;
       }
        
      
   })
   .catch(function(response){
       //handle error
       console.log(response)

   })

}

const [openDialog, setOpenDialog] = React.useState(false);
// console.log('image',img);

const [userImg, setUserImg] = React.useState('')
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/imageUser.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?user='+sessionStorage.getItem('user'));
  data.map(info =>
    setUserImg(info.urlProfile.replace('../public','')) 
    )
  
  }
  fetchData();
  return () => {
    //
  }
}, [])

// console.log('userImg',userImg)

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" style={{marginTop:'2%',left:'13%'}}>
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary" >{`${Math.round(
          props.value,
        )}%`} </Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

React.useEffect(() => {
  if(!sessionStorage.getItem('user')){
    props.history.push('/');
   }
  return () => {
    //
  }
}, [])

React.useEffect(() => {
  document.title  = `${sessionStorage.getItem('user')} / Profile`;
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
            <ListItem button onClick={ProfileAdvert} style={{background:'silver'}}>
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
            <ListItem button>
                <ListItemIcon onClick={video}>
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
           <h2 style={{textAlign:'center'}}>Your Profile</h2>
              <form className={classes.root2} noValidate autoComplete="off" onSubmit={submit}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{marginTop:'2%', width:'40%'}}>
                      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput
                      disabled
                        id="outlined-disabled"
                        type='text'
                        value={advert.email}
                        startAdornment={
                          <InputAdornment position="start">
                              <AlternateEmailIcon/>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
               </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{marginTop:'2%', width:'40%'}} required>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                       error = {error.password ? true : false} 
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        placeholder={'your password :' +  advert.password }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        startAdornment={
                          <LockIcon/>
                        }
                        labelWidth={70}
                      />
               </FormControl>

               <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{marginTop:'2%', width:'40%'}} required>
                      <InputLabel htmlFor="outlined-adornment-fullname">Full Name</InputLabel>
                      <OutlinedInput
                      error = {error.fullname ? true : false}
                        id="outlined-adornment-fullname"
                        type='text'
                        onChange={handleChange('fullname')}
                        placeholder={'your fullname :' + advert.fullname }
                        startAdornment={
                          <InputAdornment position="start">
                              <AccountCircleIcon/>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
               </FormControl>
                
               <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{marginTop:'2%', width:'40%'}} required>
                      <InputLabel htmlFor="outlined-adornment-mobile">Mobile</InputLabel>
                      <OutlinedInput
                      error = {error.mobile ? true : false}
                        id="outlined-adornment-mobile"
                        type='text'
                        placeholder={'your mobile :' + advert.mobile }
                        onChange={handleChange('mobile')}
                        startAdornment={
                          <InputAdornment position="start">
                              <PhonelinkLockIcon/>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
               </FormControl>
               <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      name='img'
                      onChange={handleChangeImage}
                    />
              <input type="hidden" value= {sessionStorage.getItem('code')} name='hidden' onChange={(e) => setCode(e.currentTarget.value)} ref={actionInput}/>
                    <label htmlFor="contained-button-file">
                      <Button variant="outlined" color="default" component="span" style={{marginTop:'4%', width:'50%'}} >
                        Upload Your Avatar
                      </Button>
                    </label>
               <div style={{display:'block',marginLeft:'10%'}}>
                <Button variant="contained" color="primary" style={{marginRight:'20%'}} type="submit">
                    Submit
                  </Button>
                  <Button variant="contained" color="secondary">
                    Cancel
                  </Button>
               </div>
              </form>
              <Avatar alt="Remy Sharp" src={uploadFile ? uploadFile : userImg} className={classes.large} />
             {errorImg ?  <Alert severity="error" style={{width:'27%'}}>There is an error when you uploading your avatar please check your image!</Alert> : ''}
                      {progress ? <CircularProgressWithLabel value={progress} /> : '' }
        </Box>
      </main>

      <Dialog
        open={openDialog}
        onClose={()=>setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Advert Business Profile Update?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Your profile have been updated corrently. you can change your information here again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> window.location.reload()} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

    </div> 
  );
}
export default ProfileAdvert