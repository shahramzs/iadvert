import React from 'react';
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Search from '../Search';
import Cookies from 'js-cookie'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'


const SERVER_URL = "http://127.0.0.1:8000";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  register:{
    marginRight: theme.spacing(5) ,
    paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
    transition: theme.transitions.create('width'),
    
},
  free:{
    marginRight: theme.spacing(5) ,
},
  help:{
    marginRight: theme.spacing(2) ,
},
search: {
    marginLeft: theme.spacing(20),
    position: 'absolute',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
},
 icon:{
    marginRight: theme.spacing(5) ,
 }
}));

function ElevationScroll(props) {
    const { children, window } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  

function Navbar3(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [show, setShow] = React.useState(false);

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleShowClose = () => {
    setShow(false);
  };

  const signout = (e) => {
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
    sessionStorage.clear();
    Cookies.remove('info');
    Cookies.remove('code');
    props.history.push('/');
  }

  const [icon, setIcon] = React.useState('');
  React.useEffect(() => {
    const url = `${SERVER_URL}/src/api/profileImage.php`;
    const fetchData = async () => {
    const data = await fetch(url+'?user='+sessionStorage.getItem('user'));
    const img = await data.json();
    setIcon(img && img.map(x => x.urlProfile.replace("../public", '')));
    }
    fetchData();
    
    return () => {
      //
    }
  }, [])

 
  return (
    <div className={classes.root}>
    <CssBaseline />
    {sessionStorage.getItem('user') ? 
    
    <ElevationScroll {...props}>
      <AppBar position="fixed" style={{backgroundColor:"#343A40"}}>
        <Toolbar>
          <Typography style={{fontFamily:"cassanda" ,cursor:'pointer', textDecoration:'none'}} variant="h6" className={classes.title} onClick={(e) => props.history.push("/")}>
            iAdvert
          </Typography>
          <Typography style={{cursor:'pointer'}} variant="h9" className={classes.search} onClick={handleClickOpen}>
            Search
          </Typography>
            <div> 
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.icon}
              >
              <Avatar alt={sessionStorage.getItem('user')} src={icon ? icon :  <AccountCircle /> } />
              </IconButton> 
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disabled Style={{textAlign:'center'}}>{sessionStorage.getItem('user')}</MenuItem>
                <MenuItem  style={{textAlign:'center'}} onClick={(e) => props.history.push("/Account")}>Account</MenuItem>
                <MenuItem  style={{textAlign:'center'}} onClick={(e) => props.history.push("/Saved")}>Saved</MenuItem>
                <MenuItem  style={{textAlign:'center'}} onClick={signout}>Sign out</MenuItem>
              </Menu>
            </div>
            <Typography style={{cursor:'pointer'}} variant="h9" className={classes.free} onClick={(e) => props.history.push("/FreeAdvert")}>
               Free Advert
            </Typography>
            <Typography style={{cursor:'pointer'}} variant="h9" className={classes.help} onClick={(e) => props.history.push("/AdvertStory")}>
               Help
            </Typography>
        </Toolbar>
      </AppBar>
       </ElevationScroll>

      :
     
     <ElevationScroll {...props}>
      <AppBar position="fixed" style={{backgroundColor:"#343A40"}}>
        <Toolbar>
          <Typography style={{fontFamily:"cassanda" ,cursor:'pointer'}} variant="h6" className={classes.title} onClick={(e) => props.history.push("/")}>
            iAdvert
          </Typography>
          <Typography style={{cursor:'pointer'}} variant="h9" className={classes.search} onClick={handleClickOpen}>
            Search
          </Typography>
            <div> 
            <Typography style={{cursor:'pointer'}} className={classes.register} variant="h9"  aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu}>
               Register
            </Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem  onClick={(e) => props.history.push("/Signup")}>Sign up</MenuItem>
                <MenuItem  onClick={(e) => props.history.push("/Signin")}>Sign in</MenuItem>
              </Menu>
            </div>
            <Typography style={{cursor:'pointer'}} variant="h9" className={classes.free} onClick={(e) => props.history.push("/signin")}>
               Free Advert
            </Typography>
            <Typography style={{cursor:'pointer'}} variant="h9" className={classes.help} onClick={(e) => props.history.push("/AdvertStory")}>
               Help
            </Typography>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
    }
      <Dialog
      fullWidth="Full width"
      maxWidth="md"
        open={show}
        onClose={handleShowClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{textAlign:"center"}} id="alert-dialog-title">{"Advert Search"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{marginTop:'-8%'}}>
           <Search/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

    </div>
  );
}
export default withRouter(Navbar3)