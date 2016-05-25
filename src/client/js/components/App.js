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
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Widget list</h1>
//         <ul>
//           {this.props.viewer.widgets.edges.map(edge =>
//             <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
//           )}
//
//         </ul>
//       </div>
//     );
//   }
// }

export default Relay.createContainer(App, {
    fragments: {
        viewer: variables => Relay.QL`
            fragment on Root {
                viewer
            }
        `
    },
});
