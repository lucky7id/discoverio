import React from 'react';
import {connect} from 'react-redux';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="nav nav-tabs main-page-nav">
                <li role="presentation" className="active"><a href="#">What's Popular</a></li>
            </ul>
        )
    }
}


//export default connect()(App);
