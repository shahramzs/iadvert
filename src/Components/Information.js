import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import RowF from './RowF'
import RowS from './RowS' 
import RowT from './RowT' 


class Information extends Component {
    render() {
        return (
            <div className="information">
                <Container >
                    <Row className="info-title mb-5" data-aos="fade-up">
                        <Col>
                         <h1>Who Should Use Advert</h1>
                        </Col>
                    </Row>

                    <RowF/>
                    <RowS/>
                    <RowT/>

                </Container>
            </div>
        );
    }
}

export default withRouter(Information);