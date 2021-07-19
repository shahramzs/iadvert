import React from 'react';
import {withRouter} from 'react-router-dom'
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
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import a from '../../img/a.jpg'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StorageIcon from '@material-ui/icons/Storage';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
import { green } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'js-cookie'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
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

 function AdminData(props) {
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
    e.preventDefault();
    sessionStorage.setItem('admin','');
    Cookies.remove('admin');
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

  const [expanded2, setExpanded2] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

 
  const [advert, setAdvert] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/admin/adminData.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url);
  setAdvert(data);
  
  }
  fetchData();
  return () => {
    //
  }
}, [])

const [visible, setVisible] = React.useState(false);
const [advertComment, setAdvertComment] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/admin/commentDataAdmin.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url);
  setAdvertComment(data);
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


const [visible3,setVisible3] = React.useState(false)

const[moreInfo, setMoreInfo] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/admin/fetchMoreInfoAdmin.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url);
  setMoreInfo(data);
  }
  fetchData();
  return () => {
    //
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
        <ListItem button onClick={AllAdvert} >
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
    </div> 
  );
}
export default withRouter(AdminData)