import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div id="loader">
                <div className="loading-dots">
                    <div className="bounce"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div> 
        );
    }
}

export default Loading;