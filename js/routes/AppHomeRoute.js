import Relay from 'react-relay';


export default class extends Relay.Route {
    static queries = {
      viewer: () => Relay.QL`query { viewer }`,
    };

    static routeName = 'MainRoute';
}


// multi: variables => (Relay.QL`query { multi(name: $name) }`),
// movie: variables => (Relay.QL`query { movie(id: $id) }`),
// tv: variables => (Relay.QL`query { show(id: $id) }`)
