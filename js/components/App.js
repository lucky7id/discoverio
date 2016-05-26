import React from 'react';
import Relay from 'react-relay';


class App extends React.Component {
    handleSearch(event) {
        this.setState({query: event.target.value})
    }

    render() {
        return (<div>"hello"</div>) ;
    }
}


export default Relay.createContainer(App, {
    fragments: {
        viewer: variables => Relay.QL`
            fragment on Root {
                viewer
            }
        `
    },
});
