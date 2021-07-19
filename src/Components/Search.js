import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Rodal from 'rodal';
import { Popover, OverlayTrigger } from 'react-bootstrap'

import 'rodal/lib/rodal.css';

let SERVER_URL = "http://127.0.0.1:8000";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: "lineGap1",
      line2: "lineGap1",
      line3: "lineGap1",
      cancel: false,
      cancel2: false,
      cancel3: false,
      searchCity: "",
      searchBusiness: "",
      searchName: "",
      businessText: false,
      nameText: false,
      job: [],
      business: ['Small Business', 'Industrial Business', 'Internet Business', 'Home Business', 'Non-Internet service businesses', 'Medical Business'],
      dataCity: [],
      dataName:[]
    }
  }

  componentDidMount() {
    this.fetchCity()
    this.fetchName()
  }

  fetchCity = async () => {
    const url = `${SERVER_URL}/src/api/city.php`;
    const response = await fetch(url);
    const data = await response.json()
    this.setState({ dataCity: data })
  }

  fetchName = async () => {
    const url = `${SERVER_URL}/src/api/name.php`;
    const response = await fetch(url);
    const data = await response.json()
    this.setState({ dataName: data })
  }

  mouseOver = () => {
    this.setState({
      line: "lineGap"
    })
  }
  mouseOver2 = () => {
    this.setState({
      line: "lineGap",
      line2: "lineGap"
    })
  }
  mouseOver3 = () => {
    this.setState({
      line2: "lineGap",
      line3: "lineGap"
    })
  }

  mouseLeave = () => {
    this.setState({
      line: "lineGap1"
    })
  }
  mouseLeave2 = () => {
    this.setState({
      line: "lineGap1",
      line2: "lineGap1"
    })
  }
  mouseLeave3 = () => {
    this.setState({
      line2: "lineGap1",
      line3: "lineGap1"
    })
  }

  changeText = (e) => {
    this.setState({
      cancel: true
    })
    if (e.target.value === "") {
      this.setState({ cancel: false })
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  changeText2 = (e) => {
    this.setState({
      cancel2: true
    })
    if (e.target.value === "") {
      this.setState({ cancel2: false })
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }

  changeText3 = (e) => {
    this.setState({
      cancel3: true
    })
    if (e.target.value === "") {
      this.setState({ cancel3: false })
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }

  clear = () => {
    this.setState({
      searchCity: ""
    })
    if (this.state.searchCity === "") {
      this.setState({ cancel: false })
    }
  }

  clear2 = () => {
    this.setState({
      searchBusiness: ""
    })
    if (this.state.searchBusiness === "") {
      this.setState({ cancel2: false })
    }
  }

  clear3 = () => {
    this.setState({
      searchName: ""
    })
    if (this.state.searchName === "") {
      this.setState({ cancel3: false })
    }
  }

  clickBusiness = () => {
    this.setState({ businessText: true })
  }
  hide = () => {
    this.setState({ businessText: false })
  }
  clickLink(id) {
    // this.setState({searchBusiness:this.job.id , businessText:false})
    this.setState(prevState => ({
      searchBusiness: prevState.business.filter(el => el === id),
      businessText: false
    }));
    console.log('job', this.state.searchBusiness)
  }

  dot = (url) => {
    var str = url.toString();
    str = str.split(" ").join("-");
    return str;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/advertSearch?name=' + this.dot(this.state.searchName) + '&city=' + this.dot(this.state.searchCity) + '&business=' + this.dot(this.state.searchBusiness));
  }

  handleCityClick = (e) => {
    console.log('citySelect', e)
    this.setState({ searchCity: e })
  }

  handleNameClick = (e) => {
    console.log('nameSelect', e)
    this.setState({ searchName: e })
  }

  render() {

////////////////remove duplicate json of city///////////////////////////////////////////////////
    var grades = new Map();
    this.state.dataCity && this.state.dataCity.forEach(function (item) {
      grades.set(JSON.stringify(item), item);
    });
    const filter = [...grades.values()] && [...grades.values()].filter((x) => {
      let name = (x.city.toLowerCase().includes(this.state.searchCity.toLowerCase()))
      return name
    })
////////////////remove duplicate json of name///////////////////////////////////////////////////
var grades2 = new Map();
this.state.dataName && this.state.dataName.forEach(function (item) {
  grades2.set(JSON.stringify(item), item);
});
const filterName = [...grades2.values()] && [...grades2.values()].filter((x) => {
  let name = (x.name.toLowerCase().includes(this.state.searchName.toLowerCase()))
  return name
})
// /////////////////////////////////////////////////////////////////////////////////////////////
    const listItems = this.state.business.map((job) =>
      <li key={job.toString()} onClick={this.clickLink.bind(this, job)} value={job}>{job}</li>
    );

    const popover = (
      <Popover id="popover-basic" style={{ height: '300px', width: '300px', overflow: 'auto', zIndex:2000, boxShadow: '0 2px 6px 0 rgba(0,0,0,0.3)'}}>
        <Popover.Title as="h3">Name of Business</Popover.Title>
        <Popover.Content>
          {filterName && filterName.map(x => (
            <div>
            <ul>
              <li style={{ textAlign: 'left', fontSize: '14px',cursor:'pointer' }} onClick={(e) => this.handleNameClick(x.name)}>
                {x.title} - {x.name}
              </li>
            </ul>
          </div>
          ))}
        </Popover.Content>
      </Popover>
    );

    const popover2 = (
      <Popover id="popover-basic" style={{ height: '300px', width: '300px', overflow: 'auto', zIndex:2000, boxShadow: '0 2px 6px 0 rgba(0,0,0,0.3)' }}>
        <Popover.Title as="h3">Location</Popover.Title>
        <Popover.Content >
          {filter && filter.map(x => (
            <div>
              <ul>
                <li style={{ textAlign: 'left', fontSize: '14px',cursor:'pointer' }} onClick={(e) => this.handleCityClick(x.city)}>
                  {x.country} - {x.city}
                </li>
              </ul>
            </div>
          ))}
        </Popover.Content>
      </Popover>
    );

    return (
      <form className="erttty" onSubmit={this.handleSubmit}>
        <div className="search-advert">
          <div className="search-country" onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
            {this.state.cancel ? <div className="searchCancel"><MdCancel onClick={this.clear} /></div> : ' '}
            <label htmlFor="search-city">Location</label>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover2}>
              <input type="text" placeholder="advert location" name="searchCity" onChange={this.changeText} value={this.state.searchCity} required autoComplete="off" />
            </OverlayTrigger>
          </div>
          <span className={this.state.line}></span>

          <div className="search-business" onMouseOver={this.mouseOver2} onMouseLeave={this.mouseLeave2}>
            {this.state.cancel2 ? <div className="searchCancel2"><MdCancel onClick={this.clear2} /></div> : ' '}
            <label htmlFor="search-business">Business</label>
            <input type="text" placeholder="business" name="searchBusiness" onChange={this.changeText2} value={this.state.searchBusiness} onClick={this.clickBusiness} required autoComplete="off" />
          </div>
          <span className={this.state.line2} style={{ borderRight: "0.5px solid grey", height: "50%", marginTop: "1.8%" }}></span>

          <div className="search-name" onMouseOver={this.mouseOver3} onMouseLeave={this.mouseLeave3}>
            {this.state.cancel3 ? <div className="searchCancel3"><MdCancel onClick={this.clear3} /></div> : ' '}
            <label htmlFor="search-name">Name</label>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
              <input type="text" placeholder="name" name="searchName" onChange={this.changeText3} value={this.state.searchName} required autoComplete="off" />
            </OverlayTrigger>
          </div>
          <span className={this.state.line3} style={{ borderRight: "0.5px solid grey", height: "50%", marginTop: "1.8%" }}></span>

          <div className="search-btn">
            <button type="submit" className="rtyxbr"><AiOutlineSearch size="1.5rem" /><p>Search</p></button>
          </div>
        </div>

        <Rodal visible={this.state.businessText} onClose={this.hide.bind(this)}>
          <div className="business-popup">
            <ul>{listItems}</ul>
          </div>
        </Rodal>
      </form>
    );
  }
}

export default withRouter(Search);