import React, { Component } from 'react';
import Navbar3 from '../inc/Navbar3';




class Header extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){

    return (
      <div className="header">
        <Navbar3/>
      </div>
    );

  }
  
}

export default Header;
