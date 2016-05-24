import 'babel-polyfill';
import * as React from 'react';
import * as Relay from 'relay';
import ReactDOM from 'react-dom';
import RelayLocalSchema from 'relay-local-schema';
import schema from '../server/data/schema.json'


class MainRoute extends Relay.Route {
    static queries = {
      multi: () => (Relay.QL`query { multi(name: $name) }`),
      movie: () => (Relay.QL`query { movie(id: $id) }`),
      tv: () => (Relay.QL`query { show(id: $id) }`)
    };

    MainRoute.routeName = 'MainRoute';
}




class App extends React.Component {
    handleSearch(event) {
        this.setState({query: event.target.value})
    }

    render() {
        return ("hello") ;
    }
}

ReactDOM.render(
    <Relay.RootContainer Component={App} route={MainRoute}/>,
    document.getElementById('app'));
