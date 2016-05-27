import {getConfig} from '../domain/search';
import {JumboTron} from './components/jumbotron/jumbotron';
import JumboSearch from './search/search';
import MovieTile from './movie-tile/movie-tile';
import MainNav from './main-nav/main-nav'
import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div>
                <JumboTron extraClasses={[]} url="http://i.imgur.com/g65f3jk.png">
                    <div className="row margin-top-md">
                        <div className="col-md-6 col-md-offset-2">
                            <JumboSearch/>
                        </div>
                    </div>
                    <MainNav />
                </JumboTron>
                <div className="container-fluid main" >
                    <div className="row">
                        <MovieTile />
                    </div>
                </div>
            </div>
        )
    }
}


export default connect()(App);
