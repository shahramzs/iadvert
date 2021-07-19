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
import AdvertCard from './AdvertCard'

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


function UserDiscount(){
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (id) => {
    setExpanded(!expanded);
  };

  let { token } = useParams();

  const [advert, setAdvert] = React.useState([]);
  React.useEffect(() => {
    const SERVER_URL = "http://127.0.0.1:8000";
    const url = `${SERVER_URL}/src/api/fetchDiscount.php`;
    const fetchData = async () => {
    const {data} = await axios.get(url+'?token='+token)
    setAdvert(data);
      }

    fetchData();
      return () => {
          //
      }
  }, []);



    return (
       <Container>
         <Row>
           <Col><LocalOfferTwoToneIcon fontSize="large" style={{marginLeft:'-4%'}}/><h3 style={{marginTop:'-3.5%'}}>Discount</h3></Col>
         </Row>
         <Row style={{marginTop:'3%', marginBottom:'3%'}}>
          <Grid container spacing={3}>
          {advert && advert.length === 0 || advert === 'noAdvert' ? <Alert severity="error" style={{width:'50%',margin:'0 auto'}}>
                                                                         <AlertTitle>discount not exist for this advert.!</AlertTitle>
                                                                            There is not any discount for this advert.
                                                                   </Alert> : 
        <React.Fragment>
         {advert && advert.map((info, i) => 
            <Grid item xs={4} key={i}>
              <AdvertCard info={info}/>
            </Grid>
              )}
            </React.Fragment>
         }
            </Grid>
         </Row>
         <div className="line" style={{width:"111%",marginLeft:"-6%"}}></div>
       </Container>
    );
  
}

export default UserDiscount;
