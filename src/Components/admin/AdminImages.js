import React from 'react';
import { withRouter } from 'react-router-dom'
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
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StorageIcon from '@material-ui/icons/Storage';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from'axios'
import { Alert, AlertTitle } from '@material-ui/lab';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'js-cookie'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import moment from 'moment'
import Snackbar from '@material-ui/core/Snackbar';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BlockIcon from '@material-ui/icons/Block';
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

 function AdminImages(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const AllAdvert = (e) => {
    e.preventDefault();
    props.history.push('./admin'); 
  }
  const AllData = (e) => {
    e.preventDefault();
    props.history.push('./adminData'); 
  }
  const location = (e) => {
    e.preventDefault();
    props.history.push('./adminLocation'); 
  }
  const profile = (e) => {
    e.preventDefault();
    props.history.push('./adminUsers'); 
  }
  const image = (e) => {
    e.preventDefault();
    props.history.push('./adminImages'); 
  }
  const video = (e) => {
    e.preventDefault();
    props.history.push('./adminVideos'); 
  }
  const Tracking = (e) => {
    e.preventDefault();
    props.history.push('./adminTracking'); 
  }
  const discount = (e) => {
    e.preventDefault();
    props.history.push('./adminDiscount'); 
  }
  const support = (e) => {
    e.preventDefault();
    props.history.push('./adminSupport'); 
  }
  const notification = (e) => {
    e.preventDefault();
    props.history.push('./adminNotification'); 
  }
  const email = (e) => {
    e.preventDefault();
    props.history.push('./adminEmail'); 
  }
  const block = (e) => {
    e.preventDefault();
    props.history.push('./adminBlock'); 
  }
  const signOut = (e) => {
    e.preventDefault();
    sessionStorage.setItem('admin','');
    Cookies.remove('admin');
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
      <MenuItem onClick={handleMenuClose}><AccountCircleIcon/>{''}{sessionStorage.getItem('admin')}</MenuItem>
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
  const url = `${SERVER_URL}/src/api/admin/allImages.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url);
  setAdvert(data);
  
  }
  fetchData();
  return () => {
    //
  }
}, [])


React.useEffect(() => {
  if(!sessionStorage.getItem('admin')){
    props.history.push('/');
   }
  return () => {
    //
  }
}, [])


const [openSnack, setOpenSnack] = React.useState(false);
const handleDelete = async (id) => {

  let newId = advert && advert.filter(info => {
    return id !== info.id;
  });
setAdvert(newId);
  
  const SERVER_URL = "http://127.0.0.1:8000";
  console.log(`
            -- Submitting --
            id: ${id}
            `);
  let formData = new FormData();
   formData.append('id', id);
   await axios({
    method: 'POST',
    url : `${SERVER_URL}/src/api/admin/deleteImageAdmin.php`,
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
            <ListItem button onClick={Tracking}>
                <ListItemIcon>
                     <GpsFixedIcon />
                </ListItemIcon>
                <ListItemText primary = "Tracking"/>
            </ListItem>
            <ListItem button onClick={discount}>
                <ListItemIcon>
                     <LocalOfferTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary = "Discount"/>
            </ListItem>
            <ListItem button onClick={support}>
                <ListItemIcon>
                     <LiveHelpIcon />
                </ListItemIcon>
                <ListItemText primary = "Support"/>
            </ListItem>
            <ListItem button onClick={notification}>
                <ListItemIcon>
                     <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText primary = "notification"/>
            </ListItem>
            <ListItem button onClick={email}>
                <ListItemIcon>
                     <MailOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary = "email"/>
            </ListItem>
            <ListItem button onClick={block}>
                <ListItemIcon>
                     <BlockIcon/>
                </ListItemIcon>
                <ListItemText primary = "Block"/>
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
                        <Avatar aria-label="recipe" className={classes.avatar}>
                         {info.user}
                        </Avatar>
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
                    <Typography style={{fontSize:'0.8rem',marginBottom:'2%'}}>Token = {info.token}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        User: {info.user}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" onClick={()=> handleDelete(info.id)}>
                        <DeleteIcon />
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
      </main>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>setOpenSnack(false)}>
                <Alert onClose={()=>setOpenSnack(false)} severity="success">
                image delete successfully.
                </Alert>
           </Snackbar>
    </div> 
  );
}
export default withRouter(AdminImages)