import React from 'react';

export class JumboTron extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`jumbotron ${this.props.extraClasses.join(' ')}`} style={this.props.style}>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="/">
                      <img className="logo" alt="Brand" src={this.props.url} />
                    </a>
                  </div>
                </div>
              </nav>
                {this.props.children}
            </div>
        )
    }
}
