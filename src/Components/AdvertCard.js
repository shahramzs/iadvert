import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIconLike from '@material-ui/icons/Favorite';
import FavoriteIconDislike from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import moment from 'moment'
import {Alert, AlertTitle} from '@material-ui/lab';
import Rodal from 'rodal'
import TextField from '@material-ui/core/TextField';
import Buttonn from '@material-ui/core/Button';
import Cookies from 'js-cookie'
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
const preciseDiff = require('moment-precise-range-plugin');


let SERVER_URL = "http://127.0.0.1:8000";
const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
const nameRegex = /[0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
const mobileRegex = /[0-9](\d{10})$/;
const passRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
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
  }));


function AdvertCard({info}){
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (id) => {
    setExpanded(!expanded);
  };

let { token } = useParams();
const[likee, setLikee] = React.useState(false)

const like =  (code) => {
   if(!sessionStorage.getItem('user')){
       setSignIn(true)
   }else{
      // if user sign in and want to like some discounts.      
      console.log(`
              -- Submitting --
              user : ${sessionStorage.getItem('user')}
              token : ${token}
              discountCode : ${code}
              `);
  
              let formData = new FormData();
              formData.append('user', sessionStorage.getItem('user'));
              formData.append('token', token);
              formData.append('discountCode', code);
              
              axios({
                  method: 'post',
                  url : `${SERVER_URL}/src/api/likeDiscount.php`,
                  data : formData,
                  responseType: 'json',
                  config : {headers : { 'Content-Type': 'multipart/form-data' }}
              })
              .then(function(response){
                  //handle success
                  console.log(response)
                 if(response.data === 'insert'){
                  //like discount
                  setLikee(true)
                 }else if(response.data === 'delete'){
                   //dislike
                   setLikee(false)
                   setArrayLike(arrayLike.filter(id=>id!==code))
                 }
  
                  return response;
              })
              .catch(function(response){
                  //handle error
                  console.log(response)
  
              })
         }
}

const[share, setShare] = React.useState(false)
const shareDiscount = () => {
setShare(true)
}

const [discountLike, setDiscountLike] = React.useState([]);
const [arrayLike, setArrayLike] = React.useState([]);
React.useEffect(() => {
  const SERVER_URL = "http://127.0.0.1:8000";
  const url = `${SERVER_URL}/src/api/fetchDiscountLike.php`;
  const fetchData = async () => {
  const {data} = await axios.get(url+'?token='+token+'&user='+sessionStorage.getItem('user'))
    setDiscountLike(data)
if(data==='notFound'){
    return false;
}else{
    setArrayLike(data && data.map(info => info.discountCode))
}
    
    }

  fetchData();
    return () => {
        //
    }
}, []);
// console.log('discountLike', discountLike);
// console.log('arrayLike', arrayLike);

const[signIn, setSignIn] = React.useState(false)
const[signUp, setSignUp] = React.useState(false)

const[change, setChange] = React.useState({email: '', password: ''})
const[error, setError] = React.useState(false)
const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChange({...change, [name]: value });

    if(change.email === '' || change.password === ''){
      setError(true)
    }
}
const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`
            -- Submitting --
            email : ${change.email}
            password : ${change.password}
            `);

            let formData = new FormData();
            formData.append('email', change.email);
            formData.append('password', change.password);

            axios({
                method: 'post',
                url : `${SERVER_URL}/src/api/signin.php`,
                data : formData,
                responseType: 'json',
                config : {headers : { 'Content-Type': 'multipart/form-data' }}
            })
            .then(function(response){
                //handle success
                console.log(response)
               if(response.data === change.email){
                sessionStorage.setItem('user', response.data);
                Cookies.set('info', btoa(response.data));
                sessionStorage.setItem('code',btoa(new Date().getMilliseconds()))
                setSignIn(false)
                window.location.reload();
               }else{
                setError(true)
               }

                return response;
            })
            .catch(function(response){
                //handle error
                console.log(response)

            })
}
const[change2, setChange2 ] = React.useState({
    password_signup:'', cpassword_signup:'', fullname_signup:'', mobile_signup:'', email_signup:''
})
const[error2, setError2] = React.useState({
    errorSignupName:false, errorSignupEmail:false, errorSignupMobile:false, errorSignupPass:false, errorSignupCpass:false, errorSignupName2:false, errorSignupEmail2:false, errorSignupMobile2:false, errorSignupPass2:false, errorSignupCPass2:false,errorNotMatch:false
})
const changeSignup = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChange2({...change2,[name]: value });

  if(change2.fullname_signup !== '' ){
    setError2({errorSignupName:false})
  }
  if(change2.email_signup !== '' ){
    setError2({errorSignupEmail:false})
  }
  if(change2.mobile_signup !== '' ){
    setError2({errorSignupMobile:false})
  }
  if(change2.password_signup !== '' ){
    setError2({errorSignupPass:false})
  }
  if(change2.cpassword_signup !== '' ){
    setError2({errorSignupCpass:false})
  }

  if(change2.fullname_signup && change2.fullname_signup.length < 3 ){
    setError2({errorSignupName2:true, errorSignupName:true})
    return false;
  }else{
    setError2({errorSignupName:false, errorSignupName2:false})
  }
  if(nameRegex.test(change2.fullname_signup) === true){
    setError2({errorSignupName2:true, errorSignupName:true})
    return false;
  }else{
    setError2({errorSignupName:false, errorSignupName2:false})
  }

  if(emailRegex.test(change2.email_signup) === false){
    setError2({errorSignupEmail2:true, errorSignupEmail:true})
    return false;
  }else{
    setError2({errorSignupEmail2:false, errorSignupEmail:false})
  }

  if(mobileRegex.test(change2.mobile_signup) === false){
    setError2({errorSignupMobile2:true, errorSignupMobile:true})
    return false;
  }else{
    setError2({errorSignupMobile2:false, errorSignupMobile:false})
  }

  if(change2.password_signup.length < 7){
    setError2({errorSignupPass2:true, errorSignupPass:true})
    return false;
  }else{
    setError2({errorSignupPass2:false, errorSignupPass:false})
  }

  if(passRegex.test(change2.password_signup) === true){
    setError2({errorSignupPass2:true, errorSignupPass:true})
    return false;
  }else{
    setError2({errorSignupPass2:false, errorSignupPass:false})
  }

  if(change2.cpassword_signup.length < 7){
    setError2({errorSignupCPass2:true, errorSignupCPass:true})
    return false;
  }else{
    setError2({errorSignupCPass2:false, errorSignupCPass:false})
  }

  if(passRegex.test(change2.cpassword_signup) === true){
    setError2({errorSignupCPass2:true, errorSignupCPass:true})
    return false;
  }else{
    setError2({errorSignupCPass2:false, errorSignupCPass:false})
  }
}
const submitSignup = (e) => {
    e.preventDefault();

        if(change2.fullname_signup === '' ){
            setError2({errorSignupName:true})
            return false;
        }
        if(change2.email_signup === '' ){
            setError2({errorSignupEmail:true})
            return false;
        }
        if(change2.mobile_signup === '' ){
          setError2({errorSignupMobile:true})
          return false;
        }
        if(change2.password_signup === '' ){
          setError2({errorSignupPass:true})
          return false;
      }
      if(change2.cpassword_signup === '' ){
        setError2({errorSignupCpass:true})
        return false;
    }

    console.log(`
    -- Submitting --
    fullname : ${change2.fullname_signup}
    email : ${change2.email_signup}
    mobileNumber : ${change2.mobile_signup}
    password : ${change2.password_signup}
    `);
if(change2.password_signup === change2.cpassword_signup){
  setError2({errorSignupCpass:false})
  setError2({errorNotMatch:false})
    let formData = new FormData();
    formData.append('fullName', change2.fullname_signup);
    formData.append('email', change2.email_signup);
    formData.append('mobileNumber', change2.mobile_signup);
    formData.append('password', change2.password_signup);

    axios({
        method: 'post',
        url : `${SERVER_URL}/src/api/register.php`,
        data : formData,
        responseType: 'json',
        config : {headers : { 'Content-Type': 'multipart/form-data' }}
    })
    .then(function(response){
        //handle success
        console.log(response)
       if(response.data === "You Registered Successfully"){
        setSignIn(true);
        setSignUp(false);
       }else if(response.data === "You have an account, Please sign in."){
        setSignIn(true);
        setSignUp(false);
       }

        return response;
    })
    .catch(function(response){
        //handle error
        console.log(response)

    })
  }else{
    setError2({errorSignupCpass:true,errorNotMatch:true})
    return false;
  }
}
const closeSignIn = () => {
    setSignIn(false);
     setSignUp(true);
}
const closeSignUp = () => {
    setSignIn(true);
     setSignUp(false);
}
const[expire, setExpire] = React.useState(false)
const[expireTime, setExpireTime] = React.useState('')
React.useEffect(() => {
  var now = moment();
   if(now.isAfter(info.expire)){
     setExpire(true)
   }else{
    setExpire(false)
      //setExpireTime(now.to(moment(info.expire).format('MM/DD/YYYY, hh:mm:ss'), 'MM/DD/YYYY, hh:mm:ss'));
     setExpireTime(moment.preciseDiff(moment().format('YYYY-MM-DD HH:mm:ss'),  moment(info.expire).format('YYYY-MM-DD HH:mm:ss')));
   }
  return () => {
    //
  }
}, [])
console.log('expire',  expireTime)
    return (
        <React.Fragment>
              <Card className={classes.root} >
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} alt={info.user} src={info.urlProfile ? info.urlProfile.replace('../public','') : info.user}/>
                    }
                    title={info.title}
                    subheader={moment(info.time).format('LLLL')}
                />
                <CardMedia
                    className={classes.media}
                    image={info.url && info.url.replace('../public','')}
                    title={info.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Title: {info.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Price: <strong style={{color:'#ff8080'}}>{info.price}%</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Discount Code: <strong style={{color:'blue'}}>{info.discountCode}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Start: <strong style={{color:'#ff8080'}}>{moment(info.start).format('LLLL')}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Expire: <strong style={{color:'#ff8080'}}>{moment(info.expire).format('LLLL')}</strong>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites" onClick={() => like(info.discountCode)} >
                    {arrayLike && arrayLike.includes(info.discountCode) || likee ? <FavoriteIconLike /> : <FavoriteIconDislike />}
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => shareDiscount(info.discountCode)}>
                    <ShareIcon />
                    </IconButton>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={() => handleExpandClick(info.id)}
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
                         <i>{info.text}</i>
                    </Typography>
                    <Typography paragraph>
                         start: <strong style={{fontSize:'0.8rem',color:'red'}}>{moment(info.start).format('LLLL')}</strong><br/>
                         expire: <strong style={{fontSize:'0.8rem',color:'red'}}>{moment(info.expire).format('LLLL')}</strong>
                        </Typography>
                        <Typography paragraph>
                         Discount: <strong style={{color:'red'}}>{info.price}%</strong>
                        </Typography>
                        {expire ? <Typography style={{fontSize:'1rem',color:'red', textAlign:'center'}}>This discount Expired.</Typography> : <Typography style={{fontSize:'1rem',color:'blue', textAlign:'center'}}>you have <i>{expireTime}</i> to use this discount.</Typography>}
                        <Typography style={{fontSize:'1rem',color:'silver', textAlign:'center', marginTop:'5%'}}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </CardContent>
                </Collapse>
                </Card>

<Rodal visible={signIn} onClose={()=> setSignIn(false)} width={600} height={450} animation='flip' customStyles={{borderRadius:'0.5rem'}}>
<h3 style={{textAlign:'center'}}>Log In to your profile.</h3>
{error ? <Alert severity="error"> user name or password are incorrect. </Alert> : ''}
<Form style={{desplay:'flex', flexDirection:'column', marginTop:'2%'}} onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicEmail2">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" size='lg' name="email" onChange={handleChange}/>
      <Form.Text className="text-muted">
        Please Enter Your Email Correctly.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword2">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" size='lg' name="password" onChange={handleChange}/>
    </Form.Group>
    <Button variant="primary" type="submit" style={{marginTop:'2%'}}>
      Submit
    </Button>
    <small style={{marginTop:'2%'}}>Don't have an account? <span className="signin_link">  <Link to="#" style={{textDecoration:'none'}} onClick={closeSignIn}>  Sign up </Link> </span> </small>
</Form>
</Rodal>
<Rodal visible={signUp} onClose={()=> setSignUp(false)} animation='door' width={700} height={650} style={{overflow:'auto'}}>
<div className="slide-container">
<h3 style={{textAlign:'center', marginBottom:'2%'}}>Create an Advert Account</h3>
<form noValidate autoComplete="off" onSubmit={submitSignup} style={{display:'flex', flexDirection:'column', padding:'2rem'}}>
<TextField 
    error = {error2.errorSignupName ? true : false}
    helperText= {error2.errorSignupName2 ? "Your name is incorrect. you must enter name more than 2 character and don't enter any number or other characters." : ''}
    id="fullname" 
    name="fullname_signup" 
    label="Fullname" 
    variant="outlined" 
    style={{width:'100%', marginBottom:'4%'}} 
    onChange={changeSignup}
/>
<TextField 
error = {error2.errorSignupEmail ? true : false}
helperText= {error2.errorSignupEmail2 ? "The format of your email is not correct." : ''}
    id="emailSignup" 
    name="email_signup" 
    label="Email" 
    variant="outlined" 
    style={{width:'100%', marginBottom:'4%'}} 
    onChange={changeSignup}
/>
<TextField 
 error = {error2.errorSignupMobile ? true : false}
 helperText= {error2.errorSignupMobile2 ? "Please enter your mobile number correctly. you should enter 11 digit number!" : ''}
  id="mobileSignup" 
  name="mobile_signup" 
  label="Mobile Number" 
  variant="outlined" 
  style={{width:'100%', marginBottom:'4%'}} 
  onChange={changeSignup}
/>
<TextField 
  error = {error2.errorSignupPass ? true : false}
  helperText= {error2.errorSignupPass2 ? "Please enter your password! your password must be more than 6 characters" : ''}
  id="passwordSignup" 
  name="password_signup" 
  label="Password" 
  variant="outlined" 
  style={{width:'100%', marginBottom:'4%'}} 
  onChange={changeSignup}
/>
<TextField 
 error = {error2.errorSignupCpass ? true : false}
 helperText= {error2.errorSignupCPass2 ? "Please enter your password again!" : ''} 
 helperText= {error2.errorNotMatch ? "passwords not match!" : ''} 
  id="confirm_password_Signup" 
  name="cpassword_signup" 
  label="Confirm Password" 
  variant="outlined" 
  style={{width:'100%',marginBottom:'4%'}} 
  onChange={changeSignup}
/>
<Buttonn color="primary" type="submit" size="large" style={{marginBottom:'2%'}}>Sign up</Buttonn>
<p><small>Already Have An Account? <Link to="#" style={{textDecoration:'none'}} onClick={closeSignUp}>Sign in</Link></small></p>
</form>
</div>            
</Rodal>

<Rodal visible={share} onClose={()=> setShare(false)} animation='rotate' width={500} height={600}>
        <div className="share-part">
          <h3>Share This Advert Business To Your Family Or Your Friends</h3>
          <ul>
            <li><div data-href="https://developers.facebook.com/docs/plugins/" ><Link target="_blank" to={{pathname : "https://www.facebook.com/sharer/sharer.php?u=http://www.advert.com/AdvertDetails/"+token+"&amp;src=sdkpreparse"}} class="fb-xfbml-parse-ignore" style={{fontSize:'1.5rem'}}><FaFacebookF size='1.5rem'/> {' '} Facebook</Link></div></li>
            <li><Link class="twitter-share-button" to={{pathname : "https://twitter.com/intent/tweet?text=http://www.advert.com/AdvertDetails/"+token}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaTwitter size='1.5rem' /> {' '} Twitter</Link></li>
            <li><Link to={{pathname : "https://www.instagram.com/"}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaInstagram size='1.5rem'/> {' '} Instagarm</Link></li>
            <li><Link target="_blank" to={{pathname:"mailto:someone@something.com?subject=Business Advert&body=http://www.advert.com/AdvertDetails/"+ token}} style={{fontSize:'1.5rem'}}><FaEnvelope size='1.5rem'/> {' '} Email</Link></li>
            <li><Link to={{pathname : "https://api.whatsapp.com/send?text=http://www.advert.com/AdvertDetails/"+token}}  target= '_blank' style={{fontSize:'1.5rem'}}><FaWhatsapp size='1.5rem'/> {' '} WhatsApp</Link></li>
          </ul>
       </div>
</Rodal>

</React.Fragment>
    );
  
}

export default AdvertCard;
