import React , { Component }  from 'react'
import { withRouter } from 'react-router-dom'
import Header from './inc/Header'
class Error extends Component{

    home = (e) =>{
        e.preventDefault();
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="error404">
                <Header/>
                <div className="scene">
                    <div className="box-error">
                        <div className="box__face front">4</div>
                        <div className="box__face back">0</div>
                        <div className="box__face right">4</div>
                        <div className="box__face left">0</div>
                        <div className="box__face top">0</div>
                        <div className="box__face bottom">0</div>
                    </div>
                    <div className="shadow"></div>
                    </div>
                    <div className="desc">
                    <h2>Ooops page not found!</h2>
                    <button onClick={this.home}>BACK TO HOME PAGE</button>
                    </div>
            </div>
        )
    }
}

export default withRouter(Error)

