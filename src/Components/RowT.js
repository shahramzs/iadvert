import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import a from '../img/discount.svg'
import { AiOutlineSearch } from "react-icons/ai";
import { FaHome,FaUserPlus,FaUserCog,FaSignInAlt,FaPercent } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io";
import b from '../img/123.jpg'
import c from '../img/456.jpg'
import d from '../img/789.jpg'


class RowT extends Component {
    render() {
        return (
            <Row className="mb-lg-5 mt-lg-5">
                        <Col md={5} className="section-left">
                        <img src={a} alt="discount"/>
                        <h3 className="mb-4 text-black">Those who are looking for a discount</h3>
                         <p className="mb-4">Those who like to know the discounts of all kinds of business at certain times. Those who are looking for discounts for companies and institutions and would like to be able to easily buy the discount online and use it whenever they like.
                                          Those who like to compare the amount of discounts given by businesses and the best of them can easily buy and use online.</p>
                        </Col>

                        <Col md={7} className=" mt-md-5 section-right-wrap" data-aos="fade-left">
                        <div id="mobile2"><span></span><span></span></div>
                        
                                <div className="site-shadow"></div>
                                <div className="site-wrap-btn">
                                <p>Feedback about this page</p> 
                                </div>
                                <div className="site-search-wrap">
                                    <AiOutlineSearch/><p>Search</p>
                                </div>
                                <div className="site-btn"></div>

                                <div className="site-part1">
                                    <div className="site-title">Advert</div>
                                    <div className="site-titr">Every discount from every business</div>
                                    <div className="site-ads">
                                        <div className="site-ads1">
                                             <img src={b} alt="discount"/>
                                             <div className="site-price">price: <del>67.00$</del></div>
                                             <div className="site-discount">discount: 15%</div>
                                             <div className="site-total">total: 59.95$</div>
                                        </div>
                                        <div className="site-ads2">
                                            <img src={c} alt="discount"/> 
                                            <div className="site-price">price: <del>194.98$</del></div>
                                             <div className="site-discount">discount: 30%</div>
                                             <div className="site-total">total: 136.486$</div>
                                        </div>
                                        <div className="site-ads3">
                                             <img src={d} alt="discount"/>
                                             <div className="site-price">price: <del>112.00$</del></div>
                                             <div className="site-discount">discount: 22%</div>
                                             <div className="site-total">total: 87.36$</div>
                                        </div>
                                    </div>
                                </div>
                                <aside className="site-side">
                                    <ul>
                                        <li><FaHome/>{' '}Home</li>
                                        <li><MdPayment/>{' '}Payment</li>
                                        <li><IoLogoBuffer/>{' '}Free Advert</li>
                                        <li><FaUserPlus/>{' '}Register
                                            <ul>
                                                <li><FaUserCog/>{' '}Sign Up</li>
                                                <li><FaSignInAlt/>{' '}Sign In</li>
                                            </ul>
                                        </li>
                                        <li><FaPercent/>{' '}Discount</li>
                                    </ul>
                                </aside>
                            
                        </Col>
                    </Row>
        );
    }
}

export default withRouter(RowT);